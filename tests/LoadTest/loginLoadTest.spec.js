import {test,expect} from '@playwright/test';
import { testLogin } from './commands/LoadLoginPage';

test('Validate that user can login in with valid credentials', async({page}) => {

    await testLogin(page)

});