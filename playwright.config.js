const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
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
        // En CI : utilise le build prod déjà compilé par le step précédent
        // En local : réutilise le serveur dev s'il tourne déjà
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
