import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutStepOnePage from '../pageobjects/checkout.step1.page.js';
import CheckoutStepTwoPage from '../pageobjects/checkout.step2.page.js';
import CheckoutCompletePage from '../pageobjects/checkout.complete.page.js';
import ProductPage from '../pageobjects/productPage.js';

describe('Swag Labs Test', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('Test Case 1: Valid Login', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });

    it('Test Case 2: Login with invalid password', async () => {
        await LoginPage.login('standard_user', '1234');
        await expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    it('Test Case 3: Login with locked out test login', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce');
        await expect(LoginPage.errorMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    it('Test Case 4: Logout', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.logout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    });

    it('Test Case 5: Saving the card after logout', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.addToCart('Sauce Labs Backpack');
        await expect(InventoryPage.cartBadge).toHaveText('1');

        await InventoryPage.logout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.cartBadge).toHaveText('1');

        await InventoryPage.cartLink.click();
        await expect(CartPage.cartItemName).toHaveText('Sauce Labs Backpack');
        
        await CartPage.removeFromCart('Sauce Labs Backpack');
    });

    it('Test Case 6: Sorting', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.sortProducts('lohi');
        await InventoryPage.sortProducts('hilo');
        await InventoryPage.sortProducts('az');
        await InventoryPage.sortProducts('za');
    });

    it('Test Case 7: Footer Links', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html');

        await InventoryPage.openAndCloseSocials(InventoryPage.socialTwitter, 'x.com');
        await InventoryPage.openAndCloseSocials(InventoryPage.socialFacebook, 'facebook.com');
        await InventoryPage.openAndCloseSocials(InventoryPage.socialLinkedIn, 'linkedin.com');
    });

    it('Test Case 8: Valid Checkout', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.addToCart('Sauce Labs Backpack');
        await expect(InventoryPage.cartBadge).toHaveText('1');
        await InventoryPage.goToCart();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartItemName).toHaveText('Sauce Labs Backpack');

        await CartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        await CheckoutStepOnePage.fillDetails('Kate', 'Blanch', '1Q3W5E');

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        await expect(CheckoutStepTwoPage.itemName).toHaveText('Sauce Labs Backpack');
        await expect(CheckoutStepTwoPage.subtotal).toHaveText('Item total: $29.99');
        
        await CheckoutStepTwoPage.finishBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        await expect(CheckoutCompletePage.header).toHaveText('Thank you for your order!');

        await CheckoutCompletePage.backHome();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(InventoryPage.cartBadge).not.toExist();
    });

    it('Test Case 9: Checkout without products', async () => {  //this test case must fail as the website doesn't work as it should
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.goToCart();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartItemName).not.toExist();
        
        await CartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.errorMessage).toHaveText('Cart is empty');
    });

    it('Test Case 10: Wrong links', async () => {
        await LoginPage.login('problem_user', 'secret_sauce');

        await InventoryPage.clickProduct('Sauce Labs Backpack');
        await expect(ProductPage.itemName).toHaveText('Sauce Labs Backpack');
    });

    it('Test Case 11: Invalid Checkout', async () => {
        await LoginPage.login('problem_user', 'secret_sauce');

        await InventoryPage.addToCart('Sauce Labs Backpack');
        await expect(InventoryPage.cartBadge).toHaveText('1');
        await InventoryPage.goToCart();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(CartPage.cartItemName).toHaveText('Sauce Labs Backpack');

        await CartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        await CheckoutStepOnePage.fillDetails('Kate', 'Blanch', '1Q3W5E');

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    });

    it('Test Case 12: Wrong visuals on the main page', async () => {
        await LoginPage.login('visual_user', 'secret_sauce');

        const mainImgLink = await InventoryPage.backpackImg.getAttribute('src');

        await InventoryPage.clickProduct('Sauce Labs Backpack');

        const insideImgLink = await ProductPage.itemImg.getAttribute('src');

        await expect(mainImgLink).toEqual(insideImgLink);
    });
});