import {test, expect} from '@playwright/test';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/loginPage';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all sign up page elements are visible', async ({page}) => {

    const signUpPage = new SignUpPage(page);

    await signUpPage.signUpLink.click();
    await expect.soft(signUpPage.signUpTitle).toBeVisible();
    await expect.soft(signUpPage.topCloseBtn).toBeVisible();
    await expect.soft(signUpPage.usernameInputFieldTitle).toBeVisible();
    await expect.soft(signUpPage.usernameInputField).toBeVisible();
    await expect.soft(signUpPage.passwordInputFieldTitle).toBeVisible();
    await expect.soft(signUpPage.passwordInputField).toBeVisible();
    await expect.soft(signUpPage.bottomCloseBtn).toBeVisible();
    await expect.soft(signUpPage.signUpBtn).toBeVisible();
    await expect(signUpPage.signUpPopup).toHaveScreenshot('signUpPopup.png');

});

test('Verify empty input validation message is displayed', async ({page}) => {

    const signUpPage = new SignUpPage(page);

    await signUpPage.signUpLink.click();
    await signUpPage.signUpBtn.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('Please fill out Username and Password.')
        await dialog.accept();
    });
    await expect(signUpPage.signUpPopup).toHaveScreenshot('emptyInputsignUpPopup.png');

});

test('Verify existing user validation message is displayed', async ({page}) => {

    const signUpPage = new SignUpPage(page);

    await signUpPage.signUpLink.click();
    await signUpPage.usernameInputField.fill('validUser2');
    await signUpPage.passwordInputField.fill('validUser.123');
    await signUpPage.signUpBtn.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('This user already exist.')
        await dialog.accept();
    });
    await expect(signUpPage.signUpPopup).toHaveScreenshot('existingUserSignUpPopup.png');

});

test('Verify close buttons close the sign up popup', async ({page}) => {

    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);

    await signUpPage.signUpLink.click();
    await signUpPage.topCloseBtn.click();
    await signUpPage.signUpPopup.waitFor({state:"hidden"});
    await expect.soft(homePage.pageHeader).toHaveScreenshot('homePageHeader.png', {mask: [homePage.productSlider]});
    await signUpPage.signUpLink.click();
    await signUpPage.bottomCloseBtn.click();
    await signUpPage.signUpPopup.waitFor({state:"hidden"});
    await expect(homePage.pageHeader).toHaveScreenshot('homePageHeader.png', {mask: [homePage.productSlider]});
    
});

test('Verify user can sign up and log in', async ({page}) => {

    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const logIn = new LoginPage(page);
    const generateRandomString = function() {
        return Math.random().toString(16).substring(2, 16);
    };
    const randomUser = `user${generateRandomString()}`;

    await signUpPage.signUpLink.click();
    page.on('dialog', async(dialog) => {
        expect(dialog.message()).toContain('Sign up successful.')
        await dialog.accept();
    });
    await signUpPage.usernameInputField.fill(randomUser);
    await signUpPage.passwordInputField.fill('randomPassword');
    await signUpPage.signUpBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(homePage.pageHeader).toHaveScreenshot('homePageHeader.png', {mask: [homePage.productSlider]});
    await logIn.logInLink.click();
    await logIn.usernameInputField.fill(randomUser);
    await logIn.passwordInputField.fill('randomPassword');
    await logIn.loginBtn.click();
    await homePage.registeredUserWelcomeLinkVisibilityTest(randomUser);
    
});