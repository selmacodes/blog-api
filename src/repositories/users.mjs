import { pool } from "../config/database.mjs";

// Importerar bcrypt för säker lösenordshantering
import bcrypt from "bcrypt";

// Antal salt-rundor för bcrypt (högre = säkrare med långsammare)
const SALT_ROUNDS = 10;

// Registrera en ny användare
export async function registerUser(username, password) {
    try {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await pool.query(
            `INSERT INTO users (username, password_hash) 
            VALUES ($1, $2) 
            RETURNING id, username, created_at`,
            [username, passwordHash]
        );

        return result.rows[0];
    } catch (err) {
        // Hantera duplicate username
        if (err.code === "23505") { // PostgreSQL unique violation
            throw new Error("Username already exists");
        }
        throw err;
    }
}

// Logga in en användare (returnerar user-id om korrekt)
export async function loginUser(username, password) {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        // Om användaren inte finns, returnera null
        if (result.rowCount !== 1) return null;

        const user = result.rows[0];

        // Jämför lösenordet mot hash i databasen
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return null;

        // Returnerar användarinfo (utan lösenord) vid korrekt inloggning
        return { id: user.id, username: user.username };
    } catch (err) {
        throw err; // Skickar vidare felet till route
    }
}

// Hämta användare via id
export async function getUserById(userId) {
    try {
        const result = await pool.query(
            "SELECT id, username, created_at FROM users WHERE id = $1",
            [userId]
        );
        // Om ingen användare hittas returneras null
        return result.rows[0] || null;
    } catch (err) {
        throw err;
    }
}