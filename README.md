# Node.js Blog API

Ett RESTful Blog API byggt med **Node.js**, **Express** och **PostgreSQL**, med användarautentisering,
ägarskapskontroller och CRUD-operationer för inlägg, kommentarer och likes/dislikes.

---

## Funktioner
- Registrering och inloggning av användare
- Skapa, läsa, uppdatera och ta bort blogginlägg
- Gilla och ogilla inlägg
- Kommentera på inlägg
- Input-validering för strängar och nummer
- Ägarskapskontroller (användare kan endast ändra sina egna inlägg)

---

## Installation

### 1. Kloning av repot
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Skapa `.env`-fil
Skapa en fil `.env` i root-mappen med PostgreSQL-konfiguration:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blogdb
DB_USER=your_username
DB_PASSWORD=your_password
APP_PORT=3000
```

### 4. Skapa databasen
```sql
CREATE DATABASE blogdb;
```

### 5. Start servern
Kör kommandot i terminalen från projektets rotmapp:

```bash
node src/app.mjs
```
Servern körs på porten som anges i `.env` (t.ex. http://localhost:3000)

---

## Struktur
- `routes/`       - alla endpoints
- `middlewares/`  - validering, autentisering, ägarskap
- `repositories/` - databaslogik
- `config/`       - databasanslutning och setup

---

## API Endpoints

### Users
- `POST /users`                      - Registrera ny användare

### Posts
- `POST /posts`                      - Skapa nytt inlägg (kräver inloggning)
- `GET /posts`                       - Hämta alla inlägg
- `GET /posts/search?title=<string>` - Hämta inlägg via titel
- `GET /posts/:id`                   - Hämta ett inlägg via ID
- `PATCH /posts/:id/like`            - Gilla ett inlägg
- `PATCH /posts/:id/dislike`         - Ogilla ett inlägg
- `PUT /posts/:id`                   - Uppdatera ett helt inlägg (kräver ägarskap)
- `PATCH /posts/:id/title`           - Uppdatera endast titel (kräver ägarskap)
- `DELETE /posts/:id`                - Ta bort ett inlägg (kräver ägarskap)

### Comments
- `POST /posts/:id/comments`         - Skapa en kommentar på ett inlägg (kräver inloggning)

---

## Tekniker
- Node.js
- Express
- PostgreSQL
- Middleware för validering, autentisering och ägarskap
- RESTful API-design

---

## Lärdomar

- Strukturera Node.js-projekt med `routes`, `middlewares` och `repositories`.
- Använd middleware för validering och ägarskapskontroll för återanvändarbar kod.
- Skydda endpoints med autentisering och kontrollera ägarskap.
- Skapa Postgres-tabeller med relationer och `ON DELETE CASCADE`.
- Validera `req.body`, `req.query` och `req.params` för robust API.
- Reflektera över kodförbättringar och minska repetition.