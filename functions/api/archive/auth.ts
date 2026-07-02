/**
 * POST /api/archive/auth — 관리자 비밀번호 검증
 */

import { corsHeaders, extractAdminToken, jsonResponse } from '../../lib/archive-helpers';

interface Env {
    ADMIN_PASSWORD?: string;
}

export const onRequestOptions = async () => {
    return new Response(null, { headers: corsHeaders });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    if (!env.ADMIN_PASSWORD) {
        return jsonResponse(
            { error: '서버에 ADMIN_PASSWORD가 설정되지 않았습니다. Cloudflare Pages 시크릿을 확인해주세요.' },
            503
        );
    }

    try {
        const body = await request.json() as { password?: string };
        const password = body.password?.trim();

        if (!password) {
            return jsonResponse({ error: '비밀번호를 입력해주세요.' }, 400);
        }

        if (password === env.ADMIN_PASSWORD) {
            return jsonResponse({ ok: true });
        }

        return jsonResponse({ error: '비밀번호가 올바르지 않습니다.' }, 401);
    } catch {
        return jsonResponse({ error: '요청 형식이 올바르지 않습니다.' }, 400);
    }
};

/** GET /api/archive/auth — 저장된 토큰 유효성 검사 */
export const onRequestGet = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    if (!env.ADMIN_PASSWORD) {
        return jsonResponse({ ok: false, error: 'ADMIN_PASSWORD not configured' }, 503);
    }

    const token = extractAdminToken(request);
    if (token && token === env.ADMIN_PASSWORD) {
        return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
};
