import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const employeeSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    position: yup.string().required('Position is required'),
    department: yup.string().required('Department is required'),
    startDate: yup.string().required('Start date is required'),
});

export const productSchema = yup.object({
    name: yup.string().required('Product name is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    stock: yup.number().integer('Stock must be an integer').min(0, 'Stock cannot be negative').required('Stock is required'),
    imageUrl: yup.string().url('Must be a valid URL').required('Image URL is required'),
});