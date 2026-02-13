import { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth, clerkClient } from "@clerk/express";


export const syncUser = async (req: Request, res: Response) => {
    try {
        console.log("🔥 syncUser route called");

        const { userId } = getAuth(req);
        console.log("Extracted userId from auth:", userId);
        if (!userId) {
            console.log("Unauthorized access attempt to syncUser");
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Fetch user details from clerk


        const clerkUser = await clerkClient.users.getUser(userId);
        if (!clerkUser) {
            console.log(`User with ID ${userId} not found in Clerk`);
            return res.status(404).json({ message: "User not found" });
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const name = clerkUser.firstName || "Unknown";
        const imageurl = clerkUser.imageUrl || "";

        // const { email: bodyEmail, name: bodyName, imageurl: bodyImageurl } = req.body;
        // if (!bodyEmail || !bodyName || !bodyImageurl) {
        //     return res.status(400).json({ message: "missing required fields" });
        // }

        //upsert user in the database
        console.log("About to upsert:", {
            id: userId,
            name,
            email,
            imageurl,
        });

        const user = await queries.upsertUser({
            id: userId,
            name: name,
            email: email,
            imageUrl: imageurl,
        })
        console.log("About to upsert:", {
            id: userId,
            name,
            email,
            imageurl,
        });

        res.status(200).json({ user });

    } catch (err: any) {
        console.error("syncUser error:", err);
        return res.status(500).json({ message: err?.message || "Internal Server Error" });
    }
};