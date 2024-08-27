export class CartPage {
  constructor(page) {
    this.page = page;
    this.quantity = page.locator('.cart_quantity');
    this.itemTitle = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.removeButton = page.locator('#remove-sauce-labs-backpack');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartItem = page.locator('.cart_item');
  }

  async deleteProduct() {
    await this.removeButton.click();
  }

  async goToContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty() {
    return (await this.cartItem.count()) === 0;
  }

  async isCartBadgeEmpty() {
    return (await this.cartBadge.count()) === 0;
  }
}
