import Page from './page.js';

class InventoryPage extends Page {
    get menuBtn() { return $('#react-burger-menu-btn'); }
    get logoutLink() { return $('[data-test="logout-sidebar-link"]'); }
    
    get cartBadge() { return $('[data-test="shopping-cart-badge"]'); }
    get cartLink() { return $('[data-test="shopping-cart-link"]'); }
    
    get sortDropdown() { return $('[data-test="product-sort-container"]'); }
    
    get socialTwitter() { return $('[data-test="social-twitter"]'); }
    get socialFacebook() { return $('[data-test="social-facebook"]'); }
    get socialLinkedIn() { return $('[data-test="social-linkedin"]'); }

    get backpackImg() { return $('[data-test="inventory-item-sauce-labs-backpack-img"]'); }
    
    async logout() {
        await this.menuBtn.click();
        await this.logoutLink.waitForClickable({ timeout: 3000 });
        await this.logoutLink.click();
    }

    async addToCart(productName) {
        const formattedName = productName.toLowerCase().replace(/ /g, '-');
        const selector = `[data-test="add-to-cart-${formattedName}"]`;
        await $(selector).click();
    }
    
    async goToCart() {
        await this.cartLink.click();
    }

    async sortProducts(sortValue) {
        await this.sortDropdown.selectByAttribute('value', sortValue);
    }

    async openAndCloseSocials(element, urlPart) {
        await element.click();
        await browser.switchWindow(urlPart);
        await browser.closeWindow();
        await browser.switchWindow('inventory.html');
    }

    async clickProduct (productName) {
        const selector = `//div[@class="inventory_item_name" and text()="${productName}"]`;
        const productLink = await $(selector);
        await productLink.waitForDisplayed({ timeout: 5000 });
        await productLink.click();
    }
}

export default new InventoryPage();