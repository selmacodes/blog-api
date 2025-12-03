import express from "express";
import { registerUser } from "../repositories/users.mjs";
import { requireString } from "../middlewares/validation.mjs";

const router = express.Router();

// Registrera en ny användare
router.post("/users", requireString(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;

    // Kontrollera lösenordets längd
    if (password.length <= 6) {
        return res.status(400).json({ error: "Password must be at least 7 characters" });
    }

    try {
        const user = await registerUser(username, password);
        return res.status(201).json(user);
    } catch (error) {
        if (error.message === "Username already exists") {
            return res.status(409).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

export default router;