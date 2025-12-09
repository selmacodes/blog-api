document.addEventListener("DOMContentLoaded", () => {
    // Hämta formuläret från DOM
    const loginForm = document.getElementById("loginForm");

    // Lägg till submit-event på formuläret
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Hindrar sidan från att laddas om vid submit

        // Hämtar värden från input-fälten
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            // Skicka POST-förfrågan till backend för inloggning
            const res = await fetch("http://localhost:3030/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }) // Skicka användarnamn och lösenord som JSON
            });

            // Läs av svaret från servern
            const data = await res.json();

            if (res.ok) {
                // Om inloggning lyckas, spara token och användarnamn i localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username);

                // Visa alert eller redirecta till posts.html
                alert("Inloggad!");
                window.location.href = "posts.html"; // Skicka användaren till alla blogginlägg
            } else {
                // Om inloggning misslyckas, visa felmeddelande
                alert(data.error || "Fel användarnamn eller lösenord");
            }
        } catch (err) {
            // Hantera eventuella nätverksfel
            console.error(err);
            alert("Ett fel uppstod vid inloggning.")
        }
    });
});
