import express from "express";

const userRoutes = express.Router();

userRoutes.post("/register");

userRoutes.post("/login");

userRoutes.delete("/logout");

userRoutes.patch("./refresh-token");

export default userRoutes;
