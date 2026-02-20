/**
 * Cloudflare Pages Function: /functions/api/archive.ts
 * - GET: D1에서 파일 목록 조회
 * - POST: 파일 R2 업로드 + D1 메타데이터 저장
 * - DELETE: R2 + D1에서 파일 삭제
 */

interface Env {
    DB: D1Database;
    BUCKET: R2Bucket;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;
    const method = request.method;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (method === 'GET') {
            const { results } = await env.DB.prepare(
                'SELECT id, filename, content_type, size, created_at FROM files ORDER BY created_at DESC'
            ).all();
            return Response.json(results, { headers: corsHeaders });
        }

        if (method === 'POST') {
            const formData = await request.formData();
            const file = formData.get('file') as File;
            if (!file) {
                return Response.json({ error: 'No file provided' }, { status: 400, headers: corsHeaders });
            }

            const id = crypto.randomUUID();
            const key = `archive/${id}-${file.name}`;
            const buffer = await file.arrayBuffer();

            await env.BUCKET.put(key, buffer, {
                httpMetadata: { contentType: file.type },
                customMetadata: { originalName: file.name }
            });

            await env.DB.prepare(
                'INSERT INTO files (id, filename, content_type, size, r2_key) VALUES (?, ?, ?, ?, ?)'
            ).bind(id, file.name, file.type, file.size, key).run();

            return Response.json({ id, filename: file.name }, { headers: corsHeaders });
        }

        if (method === 'DELETE') {
            const url = new URL(request.url);
            const id = url.searchParams.get('id');
            if (!id) {
                return Response.json({ error: 'ID required' }, { status: 400, headers: corsHeaders });
            }

            const fileRow = await env.DB.prepare('SELECT r2_key FROM files WHERE id = ?').bind(id).first<{ r2_key: string }>();
            if (fileRow) {
                await env.BUCKET.delete(fileRow.r2_key);
                await env.DB.prepare('DELETE FROM files WHERE id = ?').bind(id).run();
            }

            return Response.json({ success: true }, { headers: corsHeaders });
        }

        return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return Response.json({ error: message }, { status: 500, headers: corsHeaders });
    }
};
