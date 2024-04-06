const {expect} = require('@playwright/test');

exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page;
        this.loginPopup = page.locator('div#logInModal  .modal-content');
        this.logInLink = page.locator('a#login2');
        this.logOutLink = page.locator('a#logout2');
        this.loginPopupTitle = page.locator('h5#logInModalLabel');
        this.usernameInputFieldTitle = page.getByLabel('Log in').getByText('Username:');
        this.usernameInputField = page.locator('input#loginusername');
        this.passwordInputFieldTitle = page.getByLabel('Log in').getByText('Password:');
        this.passwordInputField = page.locator('input#loginpassword');
        this.bottomCloseBtn = page.getByLabel('Log in').getByText('Close');
        this.topCloseBtn = page.getByLabel('Log in').getByLabel('Close');
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

    };

}; 