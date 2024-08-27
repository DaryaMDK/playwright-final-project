export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.oneItem = page.locator('.inventory_item');
    this.filters = page.locator('.product_sort_container');
    this.titleProduct = page.locator('.inventory_item_name');
    this.cart = page.locator('.shopping_cart_link');
    this.priceLocator = page.locator('.inventory_item_price');
    this.allAddButtons = page.locator('button:has-text("Add to Cart")');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart() {
    await this.addButton.click();
  }

  async addAllProductToCart() {
    await this.allAddButtons.evaluateAll((buttons) => buttons.forEach((button) => button.click()));
  }

  async goToCart() {
    await this.cart.click();
  }

  async getCartCount() {
    return await this.titleProduct.textContent();
  }

  async viewProduct(numberOfProduct) {
    await this.titleProduct.nth(numberOfProduct).click();
  }

  async switchSort(choiseSort) {
    await this.filters.selectOption(choiseSort);
  }

  async getPrices() {
    const priceTexts = await this.priceLocator.allTextContents();
    return priceTexts.map((priceText) => parseFloat(priceText.replace('$', '')));
  }

  async pricesSortedAsc() {
    const prices = await this.getPrices();

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[i - 1]) {
        return false;
      }
    }
    return true;
  }
}
