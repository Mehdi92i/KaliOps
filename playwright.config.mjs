import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: process.env.CI
        ? [
              ['github'],
              ['list', { printSteps: true }],
              ['html', { open: 'never', outputFolder: 'playwright-report' }],
              ['json', { outputFile: 'playwright-report/results.json' }],
          ]
        : [
              ['list', { printSteps: true }],
              ['html', { open: 'on-failure', outputFolder: 'playwright-report' }],
          ],

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10000,
        navigationTimeout: 30000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        ...(!process.env.CI ? [
            {
                name: 'Mobile Safari',
                use: { ...devices['iPhone 13'] },
            },
        ] : []),
    ],

    webServer: {
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
