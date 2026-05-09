import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        host: 'https://wow3dsw.co.kr',
        sitemap: 'https://wow3dsw.co.kr/sitemap.xml',
    };
}
