import Page from './page.js';

class CheckoutStepOnePage extends Page {
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get zipCode() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }

    async fillDetails(first, last, zip) {
        await this.firstName.setValue(first);
        await this.lastName.setValue(last);
        await this.zipCode.setValue(zip);
        await this.continueBtn.click();
    }
}
export default new CheckoutStepOnePage();