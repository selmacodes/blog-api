import { pool } from "./database.mjs"

export async function setupDatabase() {
    console.log("Setting up database...");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            );
    `);

    // Posts table (kopplat till users)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            likes INT DEFAULT 0,
            dislikes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            user_id INT NOT NULL REFERENCES users(id) 
                ON DELETE CASCADE
        );
    `)

    // Comments-tabell
    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        likes INT DEFAULT 0,
        dislikes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
    `)


    console.log("Database ready.");
}

// ON DELETE CASCADE -> om användaren tas bort raderas automatiskt alla deras inlägg