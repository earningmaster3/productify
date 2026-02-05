import express, { urlencoded } from "express";
import cors from "cors";
import { ENV } from "./config/env.ts";
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";
// ...existing code...

dotenv.config();

const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.FRONTEND_URL }));

app.get("/", (req, res) => {
    // res.send("Hello, its working on backend perfectly")
    res.json({
        message: "hello end point on productify is working fine",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }
    })
})

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
})