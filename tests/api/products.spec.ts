import { test, expect } from '../fixtures/test-fixtures';
import {
    ProductItem,
    ProductsListResponse,
    ProductsListResponseSchema,
    ProductItemSchema
} from '../../src/schemas/product.schema';



test.describe('Products API CRUD Suite with Zod Validation', () => {

    //GET list of products with pagination
    test('GET /products - get list of products with limit and skip parameters', async ({ apiClient }) => {
        const res = await apiClient.get<ProductsListResponse>('/products', {
            limit: 5,
            skip: 10,
        });

        expect(res.status).toBe(200);
        //validating the response data structure with Zod
        const parsedData = ProductsListResponseSchema.parse(res.data);
        expect(parsedData.products.length).toBe(5);
        expect(parsedData.skip).toBe(10);
        expect(parsedData.limit).toBe(5);
    });

    //Search products
    test('GET /products/search - search products by keyword', async ({ apiClient }) => {
        const query = 'iPhone';
        const res = await apiClient.get<ProductsListResponse>('/products/search', {
            q: query,
        });
        expect(res.status).toBe(200);
        const parsedData = ProductsListResponseSchema.parse(res.data);
        expect(parsedData.products.length).toBeGreaterThan(0);
        expect(parsedData.products[0]?.title.toLowerCase()).toContain(query.toLowerCase());

    });

    //Create new product
    test('POST /products/add - create new product', async ({ apiClient }) => {
        const newProduct = {
            title: 'AQA Gaming Laptop',
            price: 1500,
            category: 'laptops',
        };

        const res = await apiClient.post<ProductItem>('/products/add', newProduct);

        expect(res.status).toBe(201); // or 200 depending on API version

        const parsedData = ProductItemSchema.parse(res.data);
        expect(parsedData.id).toBeDefined();
        expect(parsedData.title).toBe(newProduct.title);
        expect(parsedData.price).toBe(newProduct.price);
    });

    //Update product price
    test('PUT /products/1 - Update product price', async ({ apiClient }) => {
        const updatedData = {
            price: 999,
            title: 'Updated Product Title',
        };

        const res = await apiClient.put<ProductItem>('/products/1', updatedData);

        const parsedData = ProductItemSchema.parse(res.data);
        expect(parsedData.price).toBe(999);
        expect(parsedData.title).toBe('Updated Product Title');
    });

    //DELETE product
    test('DELETE /products/1 - delete product', async ({ apiClient }) => {
        const res = await apiClient.delete<ProductItem>('/products/1');

        const parsedData = ProductItemSchema.parse(res.data);
        expect(parsedData.isDeleted).toBe(true);
    });

});