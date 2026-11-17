// @ts-check
const { defineConfig } = require('@playwright/test');

const fs = require('fs');

// Tarayıcı indirmemek için sistemdeki Chromium kullanılır (CHROMIUM_PATH ile ezilebilir).
// Yol yoksa (başka makine) veya CI'daysak Playwright kendi tarayıcısını kullanır (`npx playwright install chromium`).
const system = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const executablePath = !process.env.CI && fs.existsSync(system) ? system : undefined;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4001',
    launchOptions: { executablePath },
  },
  // Testler her seferinde taze build'e karşı koşar; livereload kapalı (testleri bozar).
  webServer: {
    command: 'bundle exec jekyll serve --port 4001 --host 127.0.0.1 --no-watch',
    url: 'http://127.0.0.1:4001/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
