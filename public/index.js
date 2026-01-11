// Hämta alla blogginlägg från backend och rendera dem på sidan
async function loadPosts() {
    let posts = [];

    try {
        // Skicka GET-request till API:t
        const res = await fetch("http://localhost:3030/api/posts");
        if (res.ok) {
            posts = await res.json();
        }
    } catch (err) {
        console.warn("Kunde inte hämta riktiga inlägg, använder exempeldata.")
    }

    // Om det inte finns några inlägg, använd exempeldata
    if (!posts || posts.length === 0) {
        posts = [
            { title: "Exempelinlägg 1", content: "Detta är ett exempelinlägg.", likes: 0, dislikes: 0 },
            { title: "Exempelinlägg 2", content: "Här är ett annat inlägg.", likes: 3, dislikes: 0 },
            { title: "Exempelinlägg 3", content: "Såhär ser det ut.", likes: 0, dislikes: 1 }
        ];
    }

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
}

// Kör funktionen direkt när sidan laddas
loadPosts();

