import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
    private readonly cartButton: Locator;
    private readonly cartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly productItems: Locator;

    constructor(page: Page) {
        super(page);
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productItems = page.locator('.inventory_item');
    }

    /**
     * Adding product to cart by name
     */
    public async addProductToCartByName(productName: string): Promise<void> {
        const product = this.page.locator('.inventory_item', {
            has: this.page.locator('.inventory_item_name', { hasText: productName }),
        });
        await product.locator('button:has-text("Add to cart")').click();
    }

    /**
     * Getting the current number of items in the cart icon
     */
    public async getCartItemsCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const text = await this.cartBadge.textContent();
            return Number(text ?? '0');
        }
        return 0;
    }

    /**
     * Moving to the cart page
     */
    public async openCart(): Promise<void> {
        await this.cartButton.click();
    }
}