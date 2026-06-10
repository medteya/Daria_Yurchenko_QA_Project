import Page from './page.js';

class CheckoutCompletePage extends Page {
    get header() { return $('[data-test="complete-header"]'); }
    get backHomeBtn() { return $('#back-to-products'); }

    async backHome() {
        await this.backHomeBtn.click();
    }
}
export default new CheckoutCompletePage();