import { db } from "./index";
import { eq } from "drizzle-orm";
import {
    users, products, comments, usersRelations, productsRelations,
    commentsRelations, type NewUser, type NewProduct, type NewComment, type User, type Product, type Comments
} from "./schema";

//User queries

export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
}

export const updateuser = async (id: string, data: Partial<NewUser>) => {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
}

export const getUserById = async (id: string) => {
    return await db.select().from(users).where(eq(users.id, id))

}

export const upsertUser = async (data: NewUser) => {
    const existingUser = await getUserById(data.id);
    if (existingUser) {
        return await updateuser(data.id, data);
    }
    return await createUser(data);
}

//Product queries

export const createProduct = async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
}

export const getAllProducts = async () => {
    return await db.query.products.findMany({
        with: {
            user: true,
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)], //desc means it will show the latest products first
    })
}

export const getProductById = async (id: string) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
        },
    });
};

export const update
