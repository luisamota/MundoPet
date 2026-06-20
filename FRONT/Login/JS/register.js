

const btnFechar = document.querySelector('.close-btn');
const linkLogin = document.getElementById('link-login');

linkLogin.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "../HTML/login.html";
});

if (btnFechar) {
    btnFechar.addEventListener("click", () => {
        window.location.href = "../HTML/registerCatDog.html";
    });
}