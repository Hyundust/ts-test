import { z } from 'zod';

export const ProductItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number(),
    discountPercentage: z.number().optional(),
    rating: z.number().optional(),
    stock: z.number().optional(),
    brand: z.string().optional(),
    thumbnail: z.string().url().optional(),
    images: z.array(z.string().url()).optional(),
    isDeleted: z.boolean().optional(),
    deletedOn: z.string().optional(),
});

export const ProductsListResponseSchema = z.object({
    products: z.array(ProductItemSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});

export type ProductItem = z.infer<typeof ProductItemSchema>;
export type ProductsListResponse = z.infer<typeof ProductsListResponseSchema>;