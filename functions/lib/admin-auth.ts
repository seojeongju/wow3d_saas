import {
    corsHeaders,
    extractAdminToken,
    jsonResponse,
    matchesAdminSecret,
    normalizeAdminSecret,
} from './archive-helpers';

export interface AdminAuthEnv {
    ADMIN_PASSWORD?: string;
}

export async function handleAdminAuthPost(context: { request: Request; env: AdminAuthEnv }) {
    const { request, env } = context;

    if (!normalizeAdminSecret(env.ADMIN_PASSWORD)) {
        return jsonResponse(
            { error: '서버에 ADMIN_PASSWORD가 설정되지 않았습니다. Cloudflare Pages 시크릿을 확인해주세요.' },
            503
        );
    }

    try {
        const body = await request.json() as { password?: string };
        const password = normalizeAdminSecret(body.password);

        if (!password) {
            return jsonResponse({ error: '비밀번호를 입력해주세요.' }, 400);
        }

        if (matchesAdminSecret(password, env.ADMIN_PASSWORD)) {
            return jsonResponse({ ok: true });
        }

        return jsonResponse({ error: '비밀번호가 올바르지 않습니다.' }, 401);
    } catch {
        return jsonResponse({ error: '요청 형식이 올바르지 않습니다.' }, 400);
    }
}

export async function handleAdminAuthGet(context: { request: Request; env: AdminAuthEnv }) {
    const { request, env } = context;

    if (!normalizeAdminSecret(env.ADMIN_PASSWORD)) {
        return jsonResponse({ ok: false, error: 'ADMIN_PASSWORD not configured' }, 503);
    }

    const token = extractAdminToken(request);
    if (token && matchesAdminSecret(token, env.ADMIN_PASSWORD)) {
        return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
}

export const adminAuthOptions = () => new Response(null, { headers: corsHeaders });
