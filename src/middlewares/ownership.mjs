export async function verifyOwnership(actionFn, { postId, title, content, userId }) {
    const success = await actionFn(postId, title, content, userId);
    if (!success) {
        const error = new Error("Cannot perform action on post you do not own");
        error.status = 403;
        throw error;
    }
    return success;
}