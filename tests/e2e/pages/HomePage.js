const {expect} = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page) {

        this.page = page;
        this.pageHeader = page.locator('nav#narvbarx');
        this.productSlider = page.locator('div#carouselExampleIndicators > .carousel-inner');
        this.welcomeUserLink = page.locator('a#nameofuser');

    };

    async registeredUserWelcomeLinkVisibilityTest(userName) {
        await expect(this.page.getByRole('link', { name: userName })).toBeVisible();
    };

}; 