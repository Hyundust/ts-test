import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { CartPage } from '../../src/pages/cart.page';
import { CheckoutPage } from '../../src/pages/checkout.page';
import { DataGenerator } from '../../src/utils/data-generator';

test.describe('E2E Purchase Flow Suite', () => {
    test('User can login, add product to cart and complete the purchase', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Generate random user data
        const customerData = DataGenerator.generateCustomerData();

        const targetProduct = 'Sauce Labs Backpack';

        // 1. Login
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);

        // 2. Adding product to cart
        await inventoryPage.addProductToCartByName(targetProduct);
        const itemsCount = await inventoryPage.getCartItemsCount();
        expect(itemsCount).toBe(1);

        // 3. Opening cart and checking content
        await inventoryPage.openCart();
        await expect(page).toHaveURL(/.*cart.html/);
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toContain(targetProduct);

        // 4. Checkout (Step 1)
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await checkoutPage.fillCustomerInfo(customerData.firstName, customerData.lastName, customerData.zipCode);

        // 5. Checkout (Step 2)
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await checkoutPage.completeOrder();
        await expect(page).toHaveURL(/.*checkout-complete.html/);

        const successHeader = await checkoutPage.getSuccessMessage();
        expect(successHeader).toContain('Thank you for your order!');
    });
});