export class OrderResultPage {
  constructor(page) {
    this.page = page;
    this.backHomeButton = page.locator('#back-to-products');
    this.completeHeaderTitle = page.locator('.complete-header');
    this.finishButton = page.locator('#finish');
  }
}
