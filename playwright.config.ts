import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 0,
    workers: 2,
    use: {
        baseURL: 'https://dummyjson.com',
        trace: 'on-first-retry',
    },
    reporter: [
        ['line'],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ]
});