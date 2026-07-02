export const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100MB

export const ALLOWED_EXTENSIONS = new Set([
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
    'txt', 'csv', 'zip', 'rar', '7z',
    'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
    'mp4', 'mov', 'avi', 'webm',
    'mp3', 'wav',
    'stl', 'obj', 'step', 'stp', 'dwg', 'dxf',
    'exe', 'msi', 'dmg', 'apk',
    'json', 'xml', 'html', 'htm',
]);

const MIME_BY_EXT: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    csv: 'text/csv',
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    '7z': 'application/x-7z-compressed',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    webm: 'video/webm',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    stl: 'model/stl',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    htm: 'text/html',
};

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
};

export function jsonResponse(data: unknown, status = 200) {
    return Response.json(data, { status, headers: corsHeaders });
}

export function extractAdminToken(request: Request, formData?: FormData): string | null {
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7).trim();
    }

    const xToken = request.headers.get('X-Admin-Token');
    if (xToken) {
        return xToken.trim();
    }

    if (formData) {
        const field = formData.get('admin_token');
        if (typeof field === 'string' && field.trim()) {
            return field.trim();
        }
    }

    return null;
}

export function checkAdminAuth(request: Request, adminPassword?: string, formData?: FormData): boolean {
    if (!adminPassword) return false;
    const token = extractAdminToken(request, formData);
    if (!token) return false;
    return token === adminPassword;
}

export function getExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length < 2) return '';
    return (parts.pop() || '').toLowerCase();
}

export function guessContentType(filename: string, provided?: string): string {
    if (provided && provided !== 'application/octet-stream') return provided;
    const ext = getExtension(filename);
    return MIME_BY_EXT[ext] || 'application/octet-stream';
}

export function sanitizeFilename(filename: string): string {
    const normalized = filename.normalize('NFC').replace(/[/\\?%*:|"<>]/g, '_').trim();
    return normalized.slice(0, 255) || 'unnamed-file';
}

export function buildR2Key(id: string, filename: string): string {
    const safe = sanitizeFilename(filename);
    return `archive/${id}/${safe}`;
}

/** 자료명 + 원본 확장자로 표시 파일명 생성 */
export function buildDisplayFilename(title: string, originalFilename: string): string {
    const trimmed = title.trim();
    if (!trimmed) {
        return sanitizeFilename(originalFilename);
    }

    const sanitizedTitle = sanitizeFilename(trimmed);
    const originalExt = getExtension(originalFilename);

    if (getExtension(sanitizedTitle)) {
        return sanitizedTitle;
    }

    return originalExt ? `${sanitizedTitle}.${originalExt}` : sanitizedTitle;
}

export function validateUploadFile(file: File): string | null {
    if (!file || file.size === 0) {
        return '빈 파일은 업로드할 수 없습니다.';
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        return `파일 크기는 ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)}MB 이하여야 합니다.`;
    }
    const ext = getExtension(file.name);
    if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
        return `허용되지 않는 파일 형식입니다. (.${ext})`;
    }
    return null;
}
