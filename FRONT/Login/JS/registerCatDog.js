document.addEventListener("DOMContentLoaded", () => {
    const btnDog = document.querySelector(".btn-dog");
    const btnCat = document.querySelector(".btn-cat");
    const btnClose = document.querySelector(".close-btn");

    if (btnDog) {
        btnDog.addEventListener("click", () => {
            localStorage.setItem("especieSelecionada", "cachorro");
            window.location.href = "../HTML/register.html";
        });
    }

    if (btnCat) {
        btnCat.addEventListener("click", () => {
            localStorage.setItem("especieSelecionada", "gato");
            window.location.href = "../HTML/register.html";
        });
    }

    if (btnClose) {
        btnClose.addEventListener("click", () => {
            window.location.href = "../HTML/home.html"; 
        });
    }
});
