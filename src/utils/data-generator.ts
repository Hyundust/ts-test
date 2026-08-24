import { faker } from "@faker-js/faker";


export interface CustomerData {
    firstName: string;
    lastName: string;
    zipCode: string;
}

export interface newProductData {
    title: string;
    price: number;
    category: string;
}

export class DataGenerator {
    // Generating data for checkout
    static generateCustomerData(): CustomerData {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            zipCode: faker.location.zipCode(),
        };
    }


}

export class ProductGenerator {
    // Generating data for new product
    static generateProductData(): newProductData {
        return {
            title: faker.commerce.productName(),
            price: Number(faker.commerce.price({ min: 10, max: 1000, dec: 0 })),
            category: faker.commerce.department(),
        };
    }
}