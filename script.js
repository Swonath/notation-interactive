document.addEventListener("DOMContentLoaded", function () {
    // 🔁 Redirection automatique si la page est rechargée
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "index.html"; // à adapter selon ta page d'origine
        return;
    }

    const buttons = document.querySelectorAll(".button-note");
    const sendButton = document.querySelector(".button-envoyer");
    const noteAffichee = document.getElementById("note-affichee");
    let selectedValue = 0;

    function updateButtons(value) {
        buttons.forEach(btn => {
            const btnValue = parseInt(btn.getAttribute("data-value"));
            btn.style.transition = "background-color 0.3s ease, color 0.3s ease";
            if (btnValue <= value) {
                btn.style.backgroundColor = "#ff741e";
                btn.style.color = "white";
            } else {
                btn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                btn.style.color = "rgba(255, 255, 255, 0.8)";
            }
        });
    }

    function resetButtons() {
        selectedValue = 0;
        updateButtons(0);
    }

    buttons.forEach(button => {
        button.addEventListener("mouseover", function () {
            if (selectedValue === 0) {
                updateButtons(parseInt(this.getAttribute("data-value")));
            }
        });

        button.addEventListener("mouseleave", function () {
            if (selectedValue === 0) {
                updateButtons(0);
            }
        });

        button.addEventListener("click", function () {
            const value = parseInt(this.getAttribute("data-value"));
            if (selectedValue === value) {
                resetButtons();
            } else {
                selectedValue = value;
                updateButtons(selectedValue);
            }
        });
    });

    if (sendButton) {
        sendButton.addEventListener("click", function (event) {
            if (selectedValue === 0) {
                event.preventDefault();
                alert("Veuillez sélectionner une note avant d'envoyer.");
                return;
            }

            sessionStorage.setItem("selectedRating", selectedValue);
            sendButton.innerHTML = "Envoi en cours &nbsp;<i class='fa-solid fa-circle-notch fa-spin'></i>";
            sendButton.style.backgroundColor = "#d35e19";

            setTimeout(function () {
                window.location.href = "remerciement.html";
            }, 800);
        });
    }

    if (noteAffichee) {
        const rating = sessionStorage.getItem("selectedRating") || "5";
        noteAffichee.textContent = "Vous avez sélectionné " + rating + " sur 5";
        sessionStorage.removeItem("selectedRating");
    }
});