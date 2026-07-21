const { defineConfig } = require('@playwright/test');

const PORT = 5199;
const BASE = `http://localhost:${PORT}`;
const ROOT = __dirname;

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: BASE,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: `node -e "process.env.JWT_SECRET='e2e-secret';process.env.NODE_ENV='test';const app=require('./scriptorium-api/app');app.listen(${PORT},()=>console.log('E2E server on ${PORT}'))"`,
    port: PORT,
    timeout: 15000,
    reuseExistingServer: true,
    cwd: ROOT,
  },
});
