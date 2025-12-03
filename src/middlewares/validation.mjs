// Middleware för att validera att vissa fält finns och är strings
export function requireString(fields) {
    return (req, res, next) => {
        for (const field of fields) {
            // Kollar både body och query, beroende på vilket typ av request
            const value = req.body?.[field] ?? req.query?.[field];
            if (!value || typeof value !== "string") {
                return res.status(400).json({ error: `${field} must be included and be a string` });
            }
        }
        next();
    };
}

// Middleware för att validera att vissa fält finns och är numbers
export function requireNumber(fields) {
    return (req, res, next) => {
        for (const field of fields) {
            // Kollar body först, annars query
            const value = req.body?.[field] ?? req.query?.[field] ?? req.params?.[field];
            const num = Number(value);
            if (Number.isNaN(num)) {
                return res.status(400).json({ error: `${field} must be a number` });
            }
        }
        next();
    };
}
