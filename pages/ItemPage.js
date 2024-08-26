export class ItemPage {
  constructor(page) {
    this.page = page;
    this.itemTitle = page.locator('.inventory_details_name');
    this.itemDescription = page.locator('.inventory_details_desc');
    this.itemPrice = page.locator('.inventory_details_price');
    this.addButton = page.locator('#add-to-cart');
    this.removeButton = page.locator('#remove');
    this.backToProductButton = page.locator('#back-to-products');
  }
}
