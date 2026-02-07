
import type { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

//get all products (public route)

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json({ products });

    } catch (err: any) {
        console.error("getAllProducts error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}

// get products by id (public route)

export const getProductById = async (req: Request, res: Response) => {
    try {
        const idRaw = req.params.id;
        const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
        if (!id || typeof id !== 'string') return res.status(400).json({ message: "Product id is required" });

        const product = await queries.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });

    } catch (err: any) {
        console.error("getProductById error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}
//get products by user id  (public route)

export const getProductByUserId = async (req: Request, res: Response) => {
    try {
        const idRaw = req.params.id;
        const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
        if (!id || typeof id !== 'string') return res.status(400).json({ message: "User id is required" });

        const products = await queries.getProductByUserId(id);
        res.status(200).json({ products });
    } catch (err: any) {
        console.error("getProductByUserId error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}

//get products by current user (proteceted route)

export const getProductsByCurrentUser = async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        const userIdRaw = auth.userId;
        const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;
        if (!userId || typeof userId !== 'string') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const products = await queries.getProductByUserId(userId);
        res.status(200).json({ products });
    } catch (err: any) {
        console.error("getProductsByCurrentUser error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}

//create a new product (protected route)

export const createProduct = async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        const userIdRaw = auth.userId;
        const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;
        if (!userId || typeof userId !== 'string') {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, description, imageUrl } = req.body as { title?: unknown; description?: unknown; imageUrl?: unknown };
        if (typeof title !== 'string' || typeof description !== 'string' || typeof imageUrl !== 'string') {
            return res.status(400).json({ message: "missing required fields or invalid types" });
        }

        const product = await queries.createProduct({ userId, title, description, imageUrl });
        res.status(201).json({ product });

    } catch (err: any) {
        console.error("createProduct error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}

//update a product (protected route)

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const idRaw = req.params.id;
        const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
        if (!id) return res.status(400).json({ message: "Product id is required" });
        const { title, description, imageUrl } = req.body;
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "You can only update your own product" });
        }
        const updatedProduct = await queries.updateProduct(id, { title, description, imageUrl });
        res.status(200).json({ product: updatedProduct });
    } catch (err: any) {
        console.error("updateProduct error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}

//delete a product (protected route)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "  Unauthorized" });
        };
        const idRaw = req.params.id;
        const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
        if (!id || typeof id !== 'string') return res.status(400).json({ message: "Product id is required" });
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: " Product not found" });
        }
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "You can only delete your own product" });
        }
        const deletedProduct = await queries.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (err: any) {
        console.error("deleteProduct error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
}