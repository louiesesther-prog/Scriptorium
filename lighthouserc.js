const PORT = 5199;
const BASE = `http://localhost:${PORT}`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node -e "process.env.JWT_SECRET='lhci-secret';process.env.NODE_ENV='test';const app=require('./scriptorium-api/app');app.listen(${PORT},()=>console.log('LH server on ${PORT}'))"`,
      url: [
        `${BASE}/scriptorium.html`,
        `${BASE}/ot-gallery.html`,
        `${BASE}/nt-gallery.html`,
        `${BASE}/map.html`,
        `${BASE}/register.html`,
        `${BASE}/login.html`,
        `${BASE}/genealogy.html`,
        `${BASE}/typology.html`,
        `${BASE}/settings.html`,
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.50 }],
        'categories:accessibility': ['warn', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.80 }],
        'categories:seo': ['warn', { minScore: 0.85 }],
        'categories:pwa': ['warn', { minScore: 0.50 }],
        'uses-http2': 'off',
        'unused-javascript': 'off',
        'unused-css-rules': 'off',
        'total-byte-weight': 'off',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports',
    },
  },
};
