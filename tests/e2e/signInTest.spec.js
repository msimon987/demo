import {test, expect} from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { HomePage } from './pages/HomePage';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all login page elements are visible', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.logInLink.click();
    await expect.soft(loginPage.loginPopupTitle).toBeVisible();
    await expect.soft(loginPage.topCloseBtn).toBeVisible();
    await expect.soft(loginPage.usernameInputFieldTitle).toBeVisible();
    await expect.soft(loginPage.usernameInputField).toBeVisible();
    await expect.soft(loginPage.passwordInputFieldTitle).toBeVisible();
    await expect.soft(loginPage.passwordInputField).toBeVisible();
    await expect.soft(loginPage.bottomCloseBtn).toBeVisible();
    await expect.soft(loginPage.loginBtn).toBeVisible();
    await expect(loginPage.loginPopup).toHaveScreenshot('loginPopup.png');

});

test('Verify empty input validation message is displayed', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.logInLink.click();
    await loginPage.loginBtn.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('Please fill out Username and Password.')
        await dialog.accept();
    });
});

test('Verify invalid input validation message is displayed', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.logInLink.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('User does not exist.')
        await dialog.accept();
    });
    await loginPage.usernameInputField.fill('invalidUsername');
    await loginPage.passwordInputField.fill('invalidPassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('networkidle');
    await expect.soft(loginPage.usernameInputField).toHaveValue('invalidUsername');
    await expect.soft(loginPage.passwordInputField).toHaveValue('invalidPassword');
    await expect(loginPage.loginPopup).toHaveScreenshot('invalidInputLoginPopup.png');
    
});

test('Verify invalid password input validation message is displayed', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.logInLink.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('Wrong password.')
        await dialog.accept();
    });
    await loginPage.usernameInputField.fill('validUser2');
    await loginPage.passwordInputField.fill('invalidPassword');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('networkidle');
    await expect.soft(loginPage.usernameInputField).toHaveValue('validUser2');
    await expect.soft(loginPage.passwordInputField).toHaveValue('invalidPassword');
    await expect(loginPage.loginPopup).toHaveScreenshot('invalidPasswordInputLoginPopup.png');
    
});

test('Verify close buttons close the login popup', async ({page}) => {

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.logInLink.click();
    await loginPage.topCloseBtn.click();
    await loginPage.loginPopup.waitFor({state:"hidden"});
    await expect.soft(homePage.pageHeader).toHaveScreenshot('homePageHeader.png', {mask: [homePage.productSlider]});
    await loginPage.logInLink.click();
    await loginPage.bottomCloseBtn.click();
    await loginPage.loginPopup.waitFor({state:"hidden"});
    await expect(homePage.pageHeader).toHaveScreenshot('homePageHeader.png', {mask: [homePage.productSlider]});
    
});

test('Verify user can log in with valid credentials', async ({page}) => {

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.logInLink.click();
    await loginPage.usernameInputField.fill('validUser2');
    await loginPage.passwordInputField.fill('validUser.123');
    await loginPage.loginBtn.click();
    await loginPage.loginPopup.waitFor({state:'hidden'});
    await homePage.welcomeUserLink.waitFor({state:'visible'});
    await expect(homePage.pageHeader).toHaveScreenshot('loggedInUserHomePageHeader.png', {mask: [homePage.productSlider]});
    
});

test('Verify user can log out', async ({page}) => {

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.logInLink.click();
    await loginPage.usernameInputField.fill('validUser2');
    await loginPage.passwordInputField.fill('validUser.123');
    await loginPage.loginBtn.click();
    await loginPage.loginPopup.waitFor({state:'hidden'});
    await homePage.welcomeUserLink.waitFor({state:'visible'});
    await loginPage.logOutLink.click();
    await homePage.welcomeUserLink.waitFor({state:'hidden'});
    await expect(homePage.pageHeader).toHaveScreenshot('loggedOutUserHomePageHeader.png', {mask: [homePage.productSlider]});
    
});

