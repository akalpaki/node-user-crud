import { Router } from "express";

export const UserRoutes: Router = Router();
UserRoutes.get("/", (req, res) => {
    res.write("Hello, world!");
})