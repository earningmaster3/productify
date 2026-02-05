import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import * as productControllers from '../controllers/productControllers';


const productRouter = Router();

//get api => get all products (public route)
productRouter.get("/", productControllers.getAllProducts);

//get api/products/user => get products by current user (protected route)
productRouter.get("/:id", productControllers.getProductById);

//get api/products/user/:id => get products by user id (public route)
productRouter.get("/user/current", requireAuth, productControllers.getProductsByCurrentUser);

//get api/products/user/current => get products by current user (protected route)
productRouter.get("/user/:id", productControllers.getProductByUserId);

//post api/products => create a new product (protected route)
productRouter.post("/", requireAuth, productControllers.createProduct);

//put api/products/:id => update a product (protected route)
productRouter.put("/:id", requireAuth, productControllers.updateProduct);

//delete api/products/:id => delete a product (protected route)
productRouter.delete("/:id", requireAuth, productControllers.deleteProduct);

// Define product-related routes here
export default productRouter;