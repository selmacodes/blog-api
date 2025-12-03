import express from "express";
import { authenticate } from "../middlewares/auth.mjs";
import { requireString, requireNumber } from "../middlewares/validation.mjs"
import { verifyOwnership } from "../middlewares/ownership.mjs";
import { requireExistingPost } from "../middlewares/posts.mjs";

import {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    getBlogPostsByTitle,
    updateBlogPostById,
    updateBlogPostTitleById,
    deleteBlogPostById,
    likeBlogPostById,
    dislikeBlogPostById
} from "../repositories/posts.mjs";

const router = express.Router();

// Hämta alla blogginlägg
router.get("/posts", async (req, res) => {
    try {
        const posts = await getAllBlogPosts();
        return res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Hämta blogginlägg via titeln
router.get("/posts/search", requireString(["title"]), async (req, res) => {
    try {
        const { title } = req.query;
        const posts = await getBlogPostsByTitle(title);
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Hämta blogginlägg via ID
router.get("/posts/:id", requireNumber(["id"]), requireExistingPost(getBlogPostById), async (req, res) => {
    try {
        return res.json(req.post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Like:a ett inlägg
router.patch("/posts/:id/like", requireNumber(["id"]), requireExistingPost(getBlogPostById), async (req, res) => {
    try {
        const updated = await likeBlogPostById(req.post.id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Dislike:a ett inlägg
router.patch("/posts/:id/dislike", requireNumber(["id"]), requireExistingPost(getBlogPostById), async (req, res) => {
    try {
        const updated = await dislikeBlogPostById(req.post.id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Alla routes nedan kräver autentisering
router.use(authenticate); 

// Skapa nytt blogginlägg
router.post("/posts", requireString(["title", "content"]), async (req, res) => {
    try {
        const user = req.user;
        const { title, content } = req.body;
        const post = await createBlogPost(title, content, user.id);
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Uppdatera ett helt blogginlägg
router.put("/posts/:id", requireNumber(["id"]), requireString(["title", "content"]), async (req, res) => {
    try {
        const user = req.user;
        const postId = Number(req.params.id);
        const { title, content } = req.body;
        await verifyOwnership(updateBlogPostById, { postId, title, content, userId: user.id });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.status) return res.status(err.status).json({ error: err.message });
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Uppdatera endast titel på ett blogginlägg
router.patch("/posts/:id/title", requireNumber(["id"]), requireString(["title"]), async (req, res) => {
    try {
        const user = req.user;
        const postId = Number(req.params.id);
        const { title } = req.body;
        await verifyOwnership(updateBlogPostTitleById, { postId, title, userId: user.id });
        return res.status(204).send(); 
    } catch (err) {
        console.error(err);
        if (err.status) return res.status(err.status).json({ error: err.message });
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// Ta bort ett blogginlägg
router.delete("/posts/:id", requireNumber(["id"]), async (req, res) => {
    try {
        const user = req.user;
        const postId = Number(req.params.id);
        await verifyOwnership(deleteBlogPostById, { postId, userId: user.id });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.status) return res.status(err.status).json({ error: err.message });
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

export default router;

