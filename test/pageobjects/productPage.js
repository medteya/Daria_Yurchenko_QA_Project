import Page from './page.js';

class ProductPage extends Page {
    get itemName() { return $('[data-test="inventory-item-name"]'); }
    get itemImg() { return $('[data-test="item-sauce-labs-backpack-img"]'); }
}
export default new ProductPage();