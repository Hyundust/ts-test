import { test, expect } from '../fixtures/test-fixtures';
import { ProductsListResponseSchema } from '../../src/schemas/product.schema';

test.describe('Data-Driven API Tests: Пагінація та ліміти', () => {
    // Набір тест-кейсів для перевірки
    const testCases = [
        { limit: 1, skip: 0, description: 'Мінімальний ліміт (1 елемент)' },
        { limit: 10, skip: 5, description: 'Середній ліміт зі зміщенням (10 елементів, skip 5)' },
        { limit: 25, skip: 20, description: 'Великий ліміт (25 елементів, skip 20)' },
    ];

    for (const tc of testCases) {
        test(`GET /products: ${tc.description}`, async ({ apiClient }) => {
            const res = await apiClient.get('/products', {
                limit: tc.limit,
                skip: tc.skip,
            });

            expect(res.status).toBe(200);

            const parsedData = ProductsListResponseSchema.parse(res.data);
            expect(parsedData.products.length).toBe(tc.limit);
            expect(parsedData.limit).toBe(tc.limit);
            expect(parsedData.skip).toBe(tc.skip);
        });
    }
});