/**
 * Cloudflare Pages Function: /api/archive
 * - GET: D1에서 파일 목록 조회
 * - POST: 파일 R2 업로드 + D1 메타데이터 저장
 * - DELETE: R2 + D1에서 파일 삭제
 */

import {
    buildDisplayFilename,
    buildR2Key,
    checkAdminAuth,
    corsHeaders,
    extractAdminToken,
    guessContentType,
    jsonResponse,
    normalizeAdminSecret,
    sanitizeFilename,
    validateUploadFile,
} from '../lib/archive-helpers';

interface Env {
    DB: D1Database;
    BUCKET: R2Bucket;
    ADMIN_PASSWORD?: string;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;
    const method = request.method;

    if (method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (!env.DB || !env.BUCKET) {
            return jsonResponse(
                { error: '스토리지 바인딩(DB/BUCKET)이 연결되지 않았습니다.' },
                503
            );
        }

        const isAdmin = checkAdminAuth(request, env.ADMIN_PASSWORD);

        if (method === 'GET') {
            const { results } = await env.DB.prepare(
                'SELECT id, filename, content_type, size, created_at FROM files ORDER BY created_at DESC'
            ).all();
            return jsonResponse(results);
        }

        if (method === 'POST') {
            if (!normalizeAdminSecret(env.ADMIN_PASSWORD)) {
                return jsonResponse(
                    { error: 'ADMIN_PASSWORD 시크릿이 설정되지 않았습니다.' },
                    503
                );
            }

            const formData = await request.formData();

            if (!checkAdminAuth(request, env.ADMIN_PASSWORD, formData)) {
                return jsonResponse({ error: '인증에 실패했습니다. 다시 로그인해주세요.' }, 401);
            }

            const file = formData.get('file');

            if (!(file instanceof File)) {
                return jsonResponse({ error: '업로드할 파일이 없습니다.' }, 400);
            }

            const displayNameField = formData.get('display_name');
            const displayTitle = typeof displayNameField === 'string' ? displayNameField.trim() : '';
            if (!displayTitle) {
                return jsonResponse({ error: '자료명을 입력해주세요.' }, 400);
            }

            const validationError = validateUploadFile(file);
            if (validationError) {
                return jsonResponse({ error: validationError }, 400);
            }

            const id = crypto.randomUUID();
            const filename = buildDisplayFilename(displayTitle, file.name);
            const contentType = guessContentType(filename, file.type);
            const key = buildR2Key(id, filename);
            const buffer = await file.arrayBuffer();

            await env.BUCKET.put(key, buffer, {
                httpMetadata: { contentType },
                customMetadata: { originalName: filename, sourceFile: sanitizeFilename(file.name) },
            });

            await env.DB.prepare(
                'INSERT INTO files (id, filename, content_type, size, r2_key) VALUES (?, ?, ?, ?, ?)'
            ).bind(id, filename, contentType, file.size, key).run();

            return jsonResponse({
                id,
                filename,
                content_type: contentType,
                size: file.size,
            }, 201);
        }

        if (method === 'DELETE') {
            if (!isAdmin) {
                return jsonResponse({ error: '인증에 실패했습니다. 다시 로그인해주세요.' }, 401);
            }

            const url = new URL(request.url);
            const id = url.searchParams.get('id');
            if (!id) {
                return jsonResponse({ error: '삭제할 파일 ID가 필요합니다.' }, 400);
            }

            const fileRow = await env.DB.prepare('SELECT r2_key FROM files WHERE id = ?')
                .bind(id)
                .first<{ r2_key: string }>();

            if (!fileRow) {
                return jsonResponse({ error: '파일을 찾을 수 없습니다.' }, 404);
            }

            await env.BUCKET.delete(fileRow.r2_key);
            await env.DB.prepare('DELETE FROM files WHERE id = ?').bind(id).run();

            return jsonResponse({ success: true });
        }

        return jsonResponse({ error: 'Method not allowed' }, 405);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[archive]', message);
        return jsonResponse({ error: `서버 오류: ${message}` }, 500);
    }
};
