import express from "express";
import { authenticate } from "../middlewares/auth.mjs";
import { requireString, requireNumber } from "../middlewares/validation.mjs";
import { createComment } from "../repositories/comments.mjs";

const router = express.Router();

// Alla routes i denna fil kräver autentisering
router.use(authenticate);

// Skapa en kommentar på ett inlägg
// Fält som krävs i body: content (string), postId (number)
router.post("/comments", requireString(["content"]), requireNumber(["postId"]), async (req, res) => {
    try {
        const user = req.user;
        const { content, postId } = req.body;
        const comment = await createComment(content, postId, user.id);
        return res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error.message || error);
        if (error.message === "No such post exists") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

export default router;