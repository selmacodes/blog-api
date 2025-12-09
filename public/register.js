// Lyssnar på formuläret när det skickas in
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Stoppar sidladdning

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    // Skickar data till backend
    const res = await fetch("http://localhost:3030/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Konto skapat! Du kan nu logga in.");
        window.location.href = "login.html"; // Skickar till login-sidan
    } else {
        alert(data.error || "Något gick fel.");
    }
});