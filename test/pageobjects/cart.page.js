import Page from './page.js';

class CartPage extends Page {
    get cartItemName() { return $('[data-test="inventory-item-name"]'); }
    get checkoutBtn() { return $('#checkout'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async removeFromCart(productName) {
        const formattedName = productName.toLowerCase().replace(/ /g, '-');
        const selector = `[data-test="remove-${formattedName}"]`;
        await $(selector).click();
    }
}
export default new CartPage();