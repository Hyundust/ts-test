import { ApiClient } from './client/api-client';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

async function run() {
    console.log('--- Test run started ---\n');
    const client = new ApiClient('');

    // 1.GET
    console.log('1. Test GET /posts?userId=1:');
    const getRes = await client.get<Post[]>('/posts', { userId: 1 });
    console.log(`Status: ${getRes.status}`);
    console.log(`Posts count: ${getRes.data?.length}`);
    console.log(`First post: ${getRes.data?.[0]?.title}\n`);

    // POST
    console.log('2. Test POST /posts:');
    const postRes = await client.post<Post>('/posts', {
        title: 'AQA Lab 01',
        body: 'Custom TypeScript HTTP Client',
        userId: 1,
    });
    console.log(`Status: ${postRes.status}`);
    console.log(`Created ID: ${postRes.data?.id}\n`);

    //PUT
    console.log('3. Test PUT /posts/1:');
    const putRes = await client.put<Post>('/posts/1', {
        id: 1,
        title: 'Updated Title',
        body: 'Updated Body',
        userId: 1,
    });
    console.log(`Status: ${putRes.status}`);
    console.log(`Updated Title: ${putRes.data?.title}\n`);

    // DELETE
    console.log('4. Test DELETE /posts/1:');
    const deleteRes = await client.delete('/posts/1');
    console.log(`Status: ${deleteRes.status}\n`);

    // (404 Not Found)
    console.log('5. Test 404 Not Found /unknown-route:');
    const notFoundRes = await client.get('/unknown-route-12345');
    console.log(`Status: ${notFoundRes.status}`);
    console.log(`Error: ${notFoundRes.error ?? 'No error body'}`);
    console.log(`Data: ${notFoundRes.data === undefined ? 'undefined (correct)' : notFoundRes.data}\n`);

    console.log('--- Test completed successfully ---');
}

run();