export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.oneItem = page.locator('.inventory_item');
    this.filters = page.locator('.product_sort_container');
    this.titleProduct = page.locator('.inventory_item_name');
    this.cart = page.locator('.shopping_cart_link');
    this.cartWithProduct = page.locator('.shopping_cart_badge');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
