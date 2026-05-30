const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // En CI : annotations GitHub + liste détaillée + rapport HTML
    // En local : liste détaillée + rapport HTML interactif
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
        trace: 'retain-on-failure',       // trace complète sur chaque test en échec
        screenshot: 'only-on-failure',    // screenshot automatique en cas d'échec
        video: 'retain-on-failure',       // vidéo de la session en cas d'échec
        actionTimeout: 10000,             // timeout par action (click, fill…)
        navigationTimeout: 30000,         // timeout par navigation de page
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // Mobile Safari uniquement en local (WebKit non installé en CI)
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
