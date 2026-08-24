import { Page, Locator } from '@playwright/test';

// Base class for all Page Objects
export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigating to URL
     */
    public async navigateTo(path: string = ''): Promise<void> {
        await this.page.goto(path);
    }

    /**
     * Get the title of the current page
     */
    public async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    /**
     * Get the current URL
     */
    public getUrl(): string {
        return this.page.url();
    }
}