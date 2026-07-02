/**
 * POST/GET /api/admin-auth — 관리자 인증 (최상위 라우트)
 */

import {
    adminAuthOptions,
    handleAdminAuthGet,
    handleAdminAuthPost,
    type AdminAuthEnv,
} from '../lib/admin-auth';

export const onRequestOptions = adminAuthOptions;
export const onRequestPost = (context: { request: Request; env: AdminAuthEnv }) => handleAdminAuthPost(context);
export const onRequestGet = (context: { request: Request; env: AdminAuthEnv }) => handleAdminAuthGet(context);
