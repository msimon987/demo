import {test, expect} from '@playwright/test';

test('API GET request - 200 - Get a list of users', async({request}) => {

    const response = await request.get('https://reqres.in/api/users?page=2');

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Michael');

    console.log(await response.json());

});

test('API POST request - 201 - Register a user ', async({request}) => {

    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Mario",
            "job": "QA"
        }
    });

    expect(response.status()).toBe(201);

    const text = await response.text();
    expect(text).toContain('Mario');

    console.log(await response.json());


});

test('API POST request - 400 - Missing password ', async({request}) => {

    const response = await request.post('https://reqres.in/api/register', {
        data: {
            "email": "marioQa@gmail.com"
        }
    });

    expect(response.status()).toBe(400);

    const text = await response.text();
    expect(text).toContain('Missing password');

    console.log(await response.json());


});

test('API GET request - 404 - Nonexistent user ', async({request}) => {

    const response = await request.get('https://reqres.in/api/users/23', {
        
    });

    expect(response.status()).toBe(404);

    console.log(await response.json());


});

test('API DELETE request - 204 - Delete a user ', async({request}) => {

    const response = await request.delete('https://reqres.in/api/users/2', {
        
    });

    expect(response.status()).toBe(204);

});

test('API PUT request - 200 - User data update ', async({request}) => {

    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Mario",
            "job": "Software Developer"
        }
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Software Developer');

    console.log(await response.json());


});

test('API PATCH request - 200 - User data modification ', async({request}) => {

    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Mario",
            "job": "Project Manager"
        }
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Project Manager');

    console.log(await response.json());


});