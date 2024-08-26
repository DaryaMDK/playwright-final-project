export class CartPage {
  constructor(page) {
    this.page = page;
    this.quantity = page.locator('.cart_quantity');
    this.itemTitle = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.removeButton = page.locator('#remove-sauce-labs-backpack');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
  }
}
