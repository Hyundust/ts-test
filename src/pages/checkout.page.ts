import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    // Step 1: Customer info form
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    // Step 2: Checkout completion
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
    }

    /**
     * Filling customer info
     */
    public async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    /**
     * Finishing checkout
     */
    public async completeOrder(): Promise<void> {
        await this.finishButton.click();
    }

    /**
     * Getting success message
     */
    public async getSuccessMessage(): Promise<string> {
        return (await this.completeHeader.textContent()) ?? '';
    }
}