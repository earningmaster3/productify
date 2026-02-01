import dotenv from 'dotenv';
dotenv.config({quiet:true});

export const ENV = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL, //local host
    NODE_ENV: process.env.NODE_ENV,//postgres
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
}