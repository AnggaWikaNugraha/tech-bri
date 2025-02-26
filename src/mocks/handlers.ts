import { rest } from 'msw';

const BASE_URL = 'https://api.example.com';

// In-memory storage
let employees = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        position: 'Developer',
        department: 'Engineering',
        startDate: '2024-01-01'
    }
];

let products = [
    {
        id: '1',
        name: 'Laptop Pro X',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80'
    },
    {
        id: '2',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 49.99,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80'
    }
];

let purchases = [];

export const handlers = [
    // Auth handlers
    rest.post(`${BASE_URL}/auth/login`, async (req, res, ctx) => {
        const { email, password } = await req.json();

        if (email === 'bob@email.com' && password === 'password') {
            return res(
                ctx.status(200),
                ctx.json({
                    token: 'fake-jwt-token',
                    user: { email }
                })
            );
        }

        return res(
            ctx.status(401),
            ctx.json({ message: 'Invalid credentials' })
        );
    }),

    // Employee handlers
    rest.get(`${BASE_URL}/employees`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(employees)
        );
    }),

    rest.post(`${BASE_URL}/employees`, async (req, res, ctx) => {
        const employee = await req.json();
        const newEmployee = {
            id: Date.now().toString(),
            ...employee
        };

        employees.push(newEmployee);

        return res(
            ctx.status(201),
            ctx.json(newEmployee)
        );
    }),

    rest.delete(`${BASE_URL}/employees/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        employees = employees.filter(emp => emp.id !== id);

        return res(
            ctx.status(200),
            ctx.json({ message: 'Employee deleted successfully' })
        );
    }),

    // Product handlers
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(products)
        );
    }),

    rest.post(`${BASE_URL}/products`, async (req, res, ctx) => {
        const product = await req.json();
        const newProduct = {
            id: Date.now().toString(),
            ...product
        };

        products.push(newProduct);

        return res(
            ctx.status(201),
            ctx.json(newProduct)
        );
    }),

    rest.put(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        const updatedProduct = await req.json();

        products = products.map(p => p.id === id ? { ...updatedProduct, id } : p);

        return res(
            ctx.status(200),
            ctx.json({ ...updatedProduct, id })
        );
    }),

    rest.delete(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        products = products.filter(p => p.id !== id);

        return res(
            ctx.status(200),
            ctx.json({ message: 'Product deleted successfully' })
        );
    }),

    // Purchase handlers
    rest.post(`${BASE_URL}/purchases`, async (req, res, ctx) => {
        const purchase = await req.json();
        const product = products.find(p => p.id === purchase.productId);

        if (!product) {
            return res(
                ctx.status(404),
                ctx.json({ message: 'Product not found' })
            );
        }

        if (product.stock < purchase.quantity) {
            return res(
                ctx.status(400),
                ctx.json({ message: 'Insufficient stock' })
            );
        }

        // Update product stock
        product.stock -= purchase.quantity;

        const newPurchase = {
            id: Date.now().toString(),
            ...purchase
        };

        purchases.push(newPurchase);

        return res(
            ctx.status(201),
            ctx.json(newPurchase)
        );
    }),
];