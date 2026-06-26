// modal.js - Responsável por abrir e fechar modais

const modalPet = document.getElementById("petModal");
const newPetBtn = document.getElementById("newPetBtn");
const closeModal = document.getElementById("closeModal");

// Abrir modal
if (newPetBtn && modalPet) {
    newPetBtn.addEventListener("click", () => {
        modalPet.style.display = "flex";
    });
}

// Fechar modal no X
if (closeModal && modalPet) {
    closeModal.addEventListener("click", () => {
        modalPet.style.display = "none";
    });
}

// Fechar modal clicando fora
window.addEventListener("click", (e) => {
    if (e.target === modalPet) {
        modalPet.style.display = "none";
    }
});