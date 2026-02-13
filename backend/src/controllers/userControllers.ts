import { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth, clerkClient } from "@clerk/express";


export const syncUser = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            console.log("Unauthorized access attempt to syncUser");
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Fetch user details from clerk

        const { email, name, imageurl } = req.body;
        if (!email || !name || !imageurl) {
            return res.status(400).json({ message: "missing required fields" });
        }

        //upsert user in the database

        const user = await queries.upsertUser({
            id: userId,
            name,
            email,
            imageUrl: imageurl,
        })

        res.status(200).json({ user });

    } catch (err: any) {
        console.error("syncUser error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
};