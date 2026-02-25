import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://wow3dsw.co.kr';

    const routes = [
        '',
        '/about',
        '/contact',
        '/pricing',
        '/privacy',
        '/terms',
        '/archive',
        '/hardware',
        '/hardware/3d-printer',
        '/hardware/hologram',
        '/services',
        '/services/retail',
        '/services/academy',
        '/services/academy/center',
        '/services/cbt',
        '/services/printing',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
