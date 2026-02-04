import { db } from "./index";
import { eq } from "drizzle-orm";
import {
    users, products, comments, usersRelations, productsRelations,
    commentsRelations, type NewUser, type NewProduct, type NewComment, type User, type product, type comment
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
            comments: true
        }
    })
}