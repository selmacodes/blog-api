import { pool } from "../config/database.mjs";

// Skapa nytt blogginlägg kopplat till en användare
export async function createBlogPost(title, content, userId) {
    try {
        const result = await pool.query(
            `INSERT INTO posts (title, content, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
            [title, content, userId]
        );

        // Returnerar själva inlägget som skapades
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}  

// Hämta alla blogginlägg
export async function getAllBlogPosts() {
    try {
        const result = await pool.query(
            `SELECT posts.*, users.username
            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC`
        );

        return result.rows;
    } catch (err) {
        throw err;
    }
}

// Hämta ett inlägg via id
export async function getBlogPostById(postId) {
    try {
        const result = await pool.query(
            `SELECT posts.*, users.username
            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
            WHERE posts.id = $1`,
            [postId]
        );

        return result.rows[0] || null;
    } catch (err) {
        throw err;
    }
}

// Hitta inlägg där titeln innehåller viss text
export async function getBlogPostsByTitle(title) {
    try {
        const result = await pool.query(
            `SELECT posts.*, users.username
            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
            WHERE LOWER(posts.title) LIKE $1`,
            ["%" + title.toLowerCase() + "%"]
        );

        return result.rows;
    } catch (err) {
        throw err;
    }
}

// Uppdatera ett helt inlägg
export async function updateBlogPostById(postId, title, content, userId) {
    try {
        const result = await pool.query(
            `UPDATE posts
            SET title = $1, content = $2, updated_at = NOW()
            WHERE id = $3 AND user_id = $4`,
            [title, content, postId, userId]
        );

        return result.rowCount > 0;
    } catch (err) {
        throw err;
    }
}

// Uppdatera bara titel på ett inlägg
export async function updateBlogPostTitleById(postId, title, userId) {
    try {
        const result = await pool.query(
            `UPDATE posts
            SET title = $1, updated_at = NOW()
            WHERE id = $2 AND user_id = $3`,
            [title, postId, userId]
        );

        return result.rowCount > 0;
    } catch (err) {
        throw err;
    }
}

// Ta bort ett blogginlägg
export async function deleteBlogPostById(postId, userId) {
    try {
        const result = await pool.query(
            `DELETE FROM posts
            WHERE id = $1 AND user_id = $2`,
            [postId, userId]
        );

        // rowCount > 0 betyder att något faktiskt raderades
        return result.rowCount > 0;
    } catch (err) {
        throw err;
    }
}

// Öka likes med 1
export async function likeBlogPostById(postId) {
    try {
        const result = await pool.query(
            `UPDATE posts
            SET likes = likes + 1
            WHERE id = $1`,
            [postId]
        );

        return result.rowCount > 0;
    } catch (err) {
        throw err;
    }
}

// Minska likes med 1
export async function dislikeBlogPostById(postId) {
    try {
        const result = await pool.query(
            `UPDATE posts
            SET likes = likes - 1
            WHERE id = $1`,
            [postId]
        );

        return result.rowCount > 0;
    } catch (err) {
        throw err;
    }
}