import { expect } from '@playwright/test';

export class ItemPage {
  constructor(page) {
    this.page = page;
    this.itemTitle = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('.inventory_details_desc');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.addButton = page.locator('#add-to-cart');
    this.removeButton = page.locator('#remove');
    this.backToProductButton = page.locator('#back-to-products');
    this.productImage = page.locator('.inventory_details_img');
  }

  async checkProduct(expectedTitle, expectedPrice) {
    const actualTitle = await this.itemTitle.textContent();
    const actualPrice = await this.itemPrice.textContent();
    expect(actualTitle).toContain(expectedTitle);
    expect(actualPrice).toContain(expectedPrice);
  }

  async isImageVisible() {
    return await this.productImage.isVisible();
  }

  async addItemToCart() {
    await this.addButton.click();
  }
}
