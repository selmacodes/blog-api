async function loadPosts() {
    const res = await fetch("http://localhost:3030/api/posts");
    const posts = await res.json();

    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>Likes: ${post.likes} Dislikes: ${post.dislikes}</small>
        `;
        container.appendChild(div);
    });
}
loadPosts();

document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch("http://localhost:3030/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        showLoggedIn();
    } else {
        alert("Fel användarnamn eller lösenord");
    }
});

function showLoggedIn() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("loggedInBox").style.display = "flex";
    document.getElementById("loggedInUser").textContent =
        "Inloggad som: " + localStorage.getItem("username");
}

function showLoggedOut() {
    document.getElementById("loginBox").style.display = "flex";
    document.getElementById("loggedInBox").style.display = "none";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    showLoggedOut();
});

if (localStorage.getItem("token")) {
    showLoggedIn();
} else {
    showLoggedOut();
}