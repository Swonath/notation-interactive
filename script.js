document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button_note");
    const sendButton = document.querySelector(".button_envoyer");
    let selectedValue = 0;

    function updateButtons(value) {
        buttons.forEach(btn => {
            const btnValue = parseInt(btn.getAttribute("data-value"));
            if (btnValue <= value) {
                btn.style.transition = "background-color 0.3s ease, color 0.3s ease";
                btn.style.backgroundColor = "#ff741e";
                btn.style.color = "white";
            } else {
                btn.style.transition = "background-color 0.3s ease, color 0.3s ease";
                btn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                btn.style.color = "rgba(255, 255, 255, 0.8)";
            }
        });
    }

    function resetButtons() {
        selectedValue = 0;
        updateButtons(0);
        sendButton.disabled = true;
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
                sendButton.disabled = false;
            }
        });
    });
    
    sendButton.addEventListener("click", function (event) {
        if (selectedValue === 0) {
            event.preventDefault();
            alert("Veuillez sélectionner une note avant d'envoyer.");
        } else {
            // Stocker la note sélectionnée dans sessionStorage
            sessionStorage.setItem("selectedRating", selectedValue);
            
            // Animation d'envoi
            sendButton.innerHTML = "Envoi en cours &nbsp <i class='fa-solid fa-circle-notch fa-spin'></i>";
            sendButton.style.backgroundColor = "#d35e19";
            
            // Redirection après un court délai
            setTimeout(function() {
                window.location.href = "remerciement.html";
            }, 800);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer la note depuis sessionStorage
    const rating = sessionStorage.getItem("selectedRating") || "5";
    
    // Mettre à jour le texte avec la note sélectionnée
    document.getElementById("note_affichee").textContent = "Vous avez sélectionné " + rating + "/5";
    
    // Optionnel : nettoyer sessionStorage après utilisation
    sessionStorage.removeItem("selectedRating");
});
