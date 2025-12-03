export function requireExistingPost(getFn) {
    return async (req, res, next) => {
        try {
            const postId = Number(req.params.id);
            const post = await getFn(postId);
            if (!post) {
                return res.status(404).json({ error: `Post with id ${postId} not found` });
            }
            req.post = post;
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    };
}