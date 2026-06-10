import Page from './page.js';

class CheckoutStepTwoPage extends Page {
    get itemName() { return $('[data-test="inventory-item-name"]'); }
    get subtotal() { return $('[data-test="subtotal-label"]'); }
    get finishBtn() { return $('#finish'); }
}
export default new CheckoutStepTwoPage();