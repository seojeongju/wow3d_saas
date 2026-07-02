import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://wow3dsw.co.kr';
    const now = new Date().toISOString().split('T')[0];

    const pages: {
        url: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    }[] = [
        // ── 홈 ──
        { url: '/', priority: 1.0, changeFrequency: 'weekly' },

        // ── 무료 프로그램 (검색 유입 핵심 — 높은 우선순위) ──
        { url: '/services/free-tools', priority: 0.95, changeFrequency: 'weekly' },
        { url: '/services/free-tools/image-to-svg', priority: 0.9, changeFrequency: 'monthly' },
        { url: '/services/free-tools/3d-viewer', priority: 0.9, changeFrequency: 'monthly' },
        { url: '/services/free-tools/qr-builder', priority: 0.9, changeFrequency: 'monthly' },

        // ── 서비스 ──
        { url: '/services', priority: 0.85, changeFrequency: 'weekly' },
        { url: '/services/retail', priority: 0.85, changeFrequency: 'monthly' },
        { url: '/services/academy', priority: 0.85, changeFrequency: 'monthly' },
        { url: '/services/academy/center', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/services/cbt', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/services/printing', priority: 0.8, changeFrequency: 'monthly' },

        // ── 하드웨어 ──
        { url: '/hardware', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/hardware/3d-printer', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/hardware/hologram', priority: 0.75, changeFrequency: 'monthly' },

        // ── 비즈니스 가이드 ──
        { url: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/gov-support', priority: 0.75, changeFrequency: 'monthly' },

        // ── 고객지원 / 회사 ──
        { url: '/contact', priority: 0.75, changeFrequency: 'monthly' },
        { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
        { url: '/about/history', priority: 0.65, changeFrequency: 'monthly' },
        { url: '/about/technology', priority: 0.65, changeFrequency: 'monthly' },
        { url: '/about/certifications', priority: 0.6, changeFrequency: 'monthly' },
        { url: '/about/achievements', priority: 0.6, changeFrequency: 'monthly' },
        { url: '/about/locations', priority: 0.65, changeFrequency: 'monthly' },
        { url: '/archive', priority: 0.65, changeFrequency: 'weekly' },

        // ── 법적 문서 ──
        { url: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
        { url: '/terms', priority: 0.4, changeFrequency: 'yearly' },
    ];

    return pages.map(({ url, priority, changeFrequency }) => ({
        url: `${baseUrl}${url}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));
}
