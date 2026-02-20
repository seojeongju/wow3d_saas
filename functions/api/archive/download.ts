/**
 * Cloudflare Pages Function: /functions/api/archive/download.ts
 * - GET: R2에서 파일을 스트리밍으로 다운로드
 */

interface Env {
    DB: D1Database;
    BUCKET: R2Bucket;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return new Response('ID is required', { status: 400 });
    }

    try {
        const fileData = await env.DB.prepare(
            'SELECT filename, content_type, r2_key FROM files WHERE id = ?'
        ).bind(id).first<{ filename: string; content_type: string; r2_key: string }>();

        if (!fileData) {
            return new Response('File not found', { status: 404 });
        }

        const object = await env.BUCKET.get(fileData.r2_key);
        if (!object) {
            return new Response('Object not found in storage', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileData.filename)}"`);
        headers.set('Content-Type', fileData.content_type || 'application/octet-stream');

        return new Response(object.body as ReadableStream, { headers });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return new Response(message, { status: 500 });
    }
};
