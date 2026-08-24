import { test, expect } from '../fixtures/test-fixtures';

//interface of product
interface ProductItem {
    id: number;
    title: string;
    price: number;
    category: string;
    description?: string;
    stock?: number;
    isDeleted?: boolean;
}

// interface of products list response
interface ProductsListResponse {
    products: ProductItem[];
    total: number;
    skip: number;
    limit: number;
}

test.describe('Products API CRUD Suite', () => {

    //GET list of products with pagination
    test('GET /products - get list of products with limit and skip parameters', async ({ apiClient }) => {
        const res = await apiClient.get<ProductsListResponse>('/products', {
            limit: 5,
            skip: 10,
        });

        expect(res.status).toBe(200);
        expect(res.data).toBeDefined();
        expect(res.data?.products.length).toBe(5);
        expect(res.data?.skip).toBe(10);
        expect(res.data?.limit).toBe(5);
    });

    //Search products
    test('GET /products/search - search products by keyword', async ({ apiClient }) => {
        const query = 'phone';
        const res = await apiClient.get<ProductsListResponse>('/products/search', {
            q: query,
        });

        expect(res.status).toBe(200);
        expect(res.data).toBeDefined();
        expect(res.data?.products.length).toBeGreaterThan(0);

        // Check if the products contain the search query
        const hasMatchingProduct = res.data?.products.some(
            (item) =>
                item.title.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)
        );

        expect(hasMatchingProduct).toBe(true);
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
        expect(res.data).toBeDefined();
        expect(res.data?.id).toBeDefined();
        expect(res.data?.title).toBe(newProduct.title);
        expect(res.data?.price).toBe(newProduct.price);
    });

    //Update product price
    test('PUT /products/1 - Update product price', async ({ apiClient }) => {
        const updatedData = {
            price: 999,
            title: 'Updated Product Title',
        };

        const res = await apiClient.put<ProductItem>('/products/1', updatedData);

        expect(res.status).toBe(200);
        expect(res.data?.price).toBe(999);
        expect(res.data?.title).toBe('Updated Product Title');
    });

    //DELETE product
    test('DELETE /products/1 - delete product', async ({ apiClient }) => {
        const res = await apiClient.delete<ProductItem>('/products/1');

        expect(res.status).toBe(200);
        expect(res.data?.isDeleted).toBe(true);
    });

});