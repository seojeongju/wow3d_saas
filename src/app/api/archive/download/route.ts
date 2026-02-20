// This route is handled by Cloudflare Pages Functions (/functions/api/archive/download.ts)
// Kept as placeholder for local dev only
export const dynamic = 'force-static';

import { NextRequest, NextResponse } from 'next/server';

interface CloudflareEnv {
    DB: D1Database;
    BUCKET: R2Bucket;
}

const getEnv = (req: NextRequest): CloudflareEnv => {
    // @ts-ignore
    return req.getContext?.env || process.env;
};

export async function GET(req: NextRequest) {
    try {
        const env = getEnv(req);
        const { DB, BUCKET } = env;
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id || !DB || !BUCKET) {
            return new NextResponse('Missing parameters or bindings', { status: 400 });
        }

        // 1. D1에서 파일 정보 조회
        const fileData = await DB.prepare(
            'SELECT filename, content_type, r2_key FROM files WHERE id = ?'
        ).bind(id).first<{ filename: string, content_type: string, r2_key: string }>();

        if (!fileData) {
            return new NextResponse('File not found', { status: 404 });
        }

        // 2. R2에서 파일 스트림 가져오기
        const object = await BUCKET.get(fileData.r2_key);

        if (!object) {
            return new NextResponse('Object not found in storage', { status: 404 });
        }

        // 3. 브라우저에 파일 응답 스트림 전송
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileData.filename)}"`);
        headers.set('Content-Type', fileData.content_type);

        return new NextResponse(object.body as ReadableStream, {
            headers,
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
