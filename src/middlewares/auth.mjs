import { loginUser } from "../repositories/users.mjs";

// Middleware som kollar username + password i headers
export async function authenticate(req, res, next) {
    try {
        const { username, password } = req.headers;
        if (!username || !password) {
            return res.status(401).json({ error: "Missing username or password in headers" });
        }

        const user = await loginUser(username, password);
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Lägger till user i request, så routes kan använda det
        req.user = user;

        next(); // Gå vidare till route
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
}