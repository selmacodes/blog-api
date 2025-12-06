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