import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    /**
     * Getting the list of all product names in the cart
     */
    public async getCartItemNames(): Promise<string[]> {
        return this.page.locator('.inventory_item_name').allTextContents();
    }

    /**
     * Moving to checkout
     */
    public async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}