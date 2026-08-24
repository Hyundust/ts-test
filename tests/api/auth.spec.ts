import { test, expect } from '../fixtures/test-fixtures';

test.describe('Auth API Tests', () => {

    //Test 1: successful login
    test('POST /auth/login - Successful authorization', async ({ apiClient }) => {
        const res = await apiClient.post<{ token?: string; accessToken?: string; username: string }>('/auth/login', {
            username: 'emilys',
            password: 'emilyspass',
        });

        //check status
        expect(res.status).toBe(200);
        // check token
        expect(res.data?.token || res.data?.accessToken).toBeTruthy();
        // check correct user
        expect(res.data?.username).toBe('emilys');
    });

    // Test 2: error with wrong password
    test('POST /auth/login - Error with wrong password', async ({ apiClient }) => {
        const res = await apiClient.post('/auth/login', {
            username: 'emilys',
            password: 'wrong_password_123',
        });

        //check status
        expect(res.status).toBe(400);
        //check error message
        expect(res.data).toBeUndefined();
        expect(res.error).toBeDefined();
    });

    // Test 3: Getting the profile of a logged-in user using the ready-made authenticatedClient
    test('GET /auth/me - Getting profile of logged-in user', async ({ authClient }) => {
        const res = await authClient.get<{ id: number; username: string }>('/auth/me');

        expect(res.status).toBe(200);
        expect(res.data?.username).toBe('emilys');
    });

});