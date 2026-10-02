import { defineConfig, devices } from '@playwright/test';

// Runs against the production build (`next build` must have run first), never
// the dev server: the gates check what ships.
const PORT = Number(process.env.E2E_PORT ?? 3210);
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // A visual or a11y failure must be real; retries would hide flakiness.
  retries: 0,
  // Full-page captures of long pages on a 2-core runner need more than the
  // 30s default; settle() bounds its own waits so a real hang still fails.
  timeout: 60_000,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // Baselines carry the platform in their name (…-linux.png). Only Linux
  // baselines are committed; they are made by the "Update visual baselines"
  // workflow so they match the CI renderer.
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}-{platform}{ext}',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      // Same image, same Chromium build: diffs should be zero. The allowance
      // covers sub-pixel text antialiasing only, not layout or colour changes.
      threshold: 0.2,
      maxDiffPixelRatio: 0.001,
    },
  },
  use: {
    baseURL: BASE_URL,
    contextOptions: { reducedMotion: 'reduce' },
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: true,
      },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
