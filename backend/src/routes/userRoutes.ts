import { Router } from "express";
import { syncUser } from "../controllers/userControllers";
// import * as userControllers from "../controllers/userControllers.ts";
import { requireAuth, UnauthorizedError } from "@clerk/express";

const router = Router();
// Define user-related routes here

router.post("/sync", requireAuth, syncUser);



export default router;