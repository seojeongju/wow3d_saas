export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Runtime 환경에서 제공되는 바인딩 타입 정의
interface CloudflareEnv {
    DB: D1Database;
    BUCKET: R2Bucket;
}

// @ts-ignore - Cloudflare Pages 환경에서 getRequestContext를 통해 바인딩에 접근
const getEnv = (req: NextRequest): CloudflareEnv => {
    // @ts-ignore
    return req.getContext?.env || process.env;
};

// GET: 파일 목록 조회
export async function GET(req: NextRequest) {
    try {
        const env = getEnv(req);
        const { DB } = env;

        if (!DB) throw new Error('D1 Database binding not found');

        const { results } = await DB.prepare(
            'SELECT id, filename, content_type, size, created_at FROM files ORDER BY created_at DESC'
        ).all();

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: 파일 업로드
export async function POST(req: NextRequest) {
    try {
        const env = getEnv(req);
        const { DB, BUCKET } = env;

        if (!DB || !BUCKET) throw new Error('Cloudflare bindings not found');

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const id = crypto.randomUUID();
        const key = `archive/${id}-${file.name}`;
        const buffer = await file.arrayBuffer();

        // 1. R2 업로드
        await BUCKET.put(key, buffer, {
            httpMetadata: { contentType: file.type },
            customMetadata: { originalName: file.name }
        });

        // 2. D1 기록
        await DB.prepare(
            'INSERT INTO files (id, filename, content_type, size, r2_key) VALUES (?, ?, ?, ?, ?)'
        ).bind(id, file.name, file.type, file.size, key).run();

        return NextResponse.json({ id, filename: file.name });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: 파일 삭제
export async function DELETE(req: NextRequest) {
    try {
        const env = getEnv(req);
        const { DB, BUCKET } = env;
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        // 1. D1에서 메타데이터 가져오기
        const file = await DB.prepare('SELECT r2_key FROM files WHERE id = ?').bind(id).first<{ r2_key: string }>();

        if (file) {
            // 2. R2에서 삭제
            if (BUCKET) await BUCKET.delete(file.r2_key);

            // 3. D1에서 삭제
            await DB.prepare('SELECT 1 FROM files WHERE id = ?').run(); // Dummy to test existence if needed
            await DB.prepare('DELETE FROM files WHERE id = ?').bind(id).run();
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
