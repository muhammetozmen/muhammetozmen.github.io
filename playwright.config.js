// @ts-check
const { defineConfig } = require('@playwright/test');

const fs = require('fs');

// Tarayıcı indirmemek için sistemdeki Chromium kullanılır (CHROMIUM_PATH ile ezilebilir).
// Yol yoksa (başka makine) veya CI'daysak Playwright kendi tarayıcısını kullanır (`npx playwright install chromium`).
const system = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const executablePath = !process.env.CI && fs.existsSync(system) ? system : undefined;

// Bu makinedeki Ruby gem'leri kullanıcı klasöründe: GEM_HOME verilmemişse oraya bakılır (CI'da setup-ruby kendisi ayarlar).
const gemHome = process.env.GEM_HOME || `${process.env.HOME}/.local/share/gem/ruby/3.4.0`;
const gemEnv = fs.existsSync(gemHome) ? { GEM_HOME: gemHome, PATH: `${gemHome}/bin:${process.env.PATH}` } : {};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4001',
    launchOptions: { executablePath },
  },
  // Testler her seferinde taze build'e karşı koşar; livereload kapalı (testleri bozar).
  webServer: {
    env: { ...process.env, ...gemEnv },
    command: 'bundle exec jekyll serve --port 4001 --host 127.0.0.1 --no-watch',
    url: 'http://127.0.0.1:4001/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
