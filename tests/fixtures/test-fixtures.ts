import { test as baseTest, expect } from '@playwright/test';
import { ApiClient } from '../../src/client/api-client';


//interface for Auth response mock data
interface AuthResponse {

    id: number;
    username: string;
    email: string;
    accessToken?: string;
    token?: string;

}
//extend default playwright test with custom fixtures
type MyFixtures = {
    //API client instance
    apiClient: ApiClient;
    authClient: ApiClient;
}
export const test = baseTest.extend<MyFixtures>({
    // 1.Default client without login
    apiClient: async ({ baseURL }, use: (r: ApiClient) => Promise<void>) => {
        const client = new ApiClient(baseURL ?? 'https://dummyjson.com');
        await use(client);
    },

    // 2. Client login before test
    authClient: async ({ baseURL }, use: (r: ApiClient) => Promise<void>) => {
        const client = new ApiClient(baseURL ?? 'https://dummyjson.com');

        //making a test login
        const res = await client.post<AuthResponse>('/auth/login', {
            username: 'emilys',
            password: 'emilyspass',
        });
        // If login is successful — send the token
        const token = res.data?.accessToken ?? res.data?.token;
        if (token) {
            client.setAuthToken(token);
        }
        // Send the ready authorized client to the test
        await use(client);


        // After the test is completed, clear the token
        client.clearAuthToken();
    },
});
//Export expect and test from playwright to use in tests
export { expect };