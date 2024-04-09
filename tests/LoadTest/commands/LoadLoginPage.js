const {expect} = require('@playwright/test');

async function testLogin(page) {
    
    await page.goto('https://test.k6.io/my_messages.php');
    await page.locator("input[name='login']").fill('test_user');
    await page.locator("input[name='password']").fill('1234');
    await page.locator("form[method='post'] > input[value='Go!']").click();

}

module.exports = {
    testLogin
};
