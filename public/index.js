// Hämta alla blogginlägg från backend och rendera dem på sidan
async function loadPosts() {
    try {
        // Skicka GET-request till API:t
        const res = await fetch("http://localhost:3030/api/posts");
        const posts = await res.json();

        // Hämta container-diven där inläggen ska visas
        const container = document.getElementById("posts");
        container.innerHTML = ""; // Rensa tidigare innehåll

        // Loopa igenom alla inlägg och skapa HTML för varje
        posts.forEach(post => {
            const div = document.createElement("div");
            div.className = "post"; // Klass för styling

            // Lägg till titel, innehåll och likes/dislikes
            div.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <small>Likes: ${post.likes} Dislikes: ${post.dislikes}</small>
            `;

            // Lägg till div:en i container
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Failed to load posts:", err);
        alert("Kunde inte hämta blogginlägg. Försök igen senare.");
    }
}

// Kör funktionen direkt när sidan laddas
loadPosts();

