import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Importerar routrar
import postRoutes from "./routes/posts.mjs"
import userRoutes from "./routes/users.mjs"
import commentRoutes from "./routes/comments.mjs"

// Importera DB-setup
import { setupDatabase } from "./config/setupDatabase.mjs";

// Hämtar porten från miljövariablerna
const appPort = Number(process.env.APP_PORT);

const app = express();
app.use(express.json());
app.use(cors());

// Koppla routrar
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

setupDatabase()
    .then(() => {
        app.listen(appPort, () => {
            console.log(`Server running on port ${appPort}`);
        });
    })
    .catch((err) => {
        console.error("DB setup failed:", err);
        process.exit(1); // Stoppar servern vid fel
    });