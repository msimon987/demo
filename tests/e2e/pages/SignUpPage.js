const {expect} = require('@playwright/test');

exports.SignUpPage = class SignUpPage {

    constructor(page) {

        this.page = page;
        this.signUpPopup = page.locator('div#signInModal  .modal-content');
        this.signUpLink = page.locator('a#signin2');
        this.signUpTitle = page.locator('h5#signInModalLabel');
        this.usernameInputFieldTitle = page.getByLabel('Sign up').getByText('Username:');
        this.usernameInputField = page.locator('input#sign-username');
        this.passwordInputFieldTitle = page.getByLabel('Sign up').getByText('Password:');
        this.passwordInputField = page.locator('input#sign-password');
        this.bottomCloseBtn = page.getByLabel('Sign up').getByLabel('Close');
        this.topCloseBtn = page.getByLabel('Sign up').getByText('Close');
        this.signUpBtn = page.locator("div#signInModal > div[role='document'] .btn.btn-primary");

    };

}; 