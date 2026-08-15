function showSurprise() {
    const message = document.getElementById("surprise-message");
    message.style.display = "block";
    createConfetti();
    message.scrollIntoView({ behavior: "smooth", block: "center" });
}

function createConfetti() {
    const emojis = ["🎉", "🎊", "✨", "💖", "❤️", "⭐", "🎈"];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize = Math.random() * 20 + 10 + "px";
        confetti.style.zIndex = "9999";
        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 1000;

        confetti.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                { transform: `translateY(110vh) rotate(${rotation}deg)`, opacity: 0.8 }
            ],
            { duration: duration * 1000, easing: "linear" }
        );

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Change this date to the birthday.
// Format: YYYY-MM-DDTHH:MM:SS
const birthdayDate = new Date("2027-05-14T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = birthdayDate - now;

    if (difference <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).innerText = "00";
        });
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
