import fs from 'fs';

const Sitemap = () => {
  return;
};

export const getServerSideProps = async (context) => {
  const { res } = context;

  const baseUrl = {
    development: 'http://localhost:3000',
    production: 'https://nicholasgriffin.dev',
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync(process.env.NODE_ENV === 'production' ? '' : 'src/pages')
    .filter((staticPage) => {
      return !['_app.js', '_document.js', '_error.js', 'sitemap.xml.js'].includes(staticPage);
    })
    .map((staticPagePath) => {
      if (staticPagePath === 'index.js') {
        return baseUrl;
      }

      return `${baseUrl}/${staticPagePath.replace('.js', '')}`;
    });

  // TODO: Add blog posts
  const posts = [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
      ${posts
        .map(({ id, updatedAt }) => {
          return `
            <url>
              <loc>${baseUrl}/blog/${id}</loc>
              <lastmod>${updatedAt}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
