// dashboard.js

// ─── PROTEÇÃO DE ROTA + NOME DO ADMIN ─────────────────────────────────────────
const nomeAdmin = sessionStorage.getItem("nome_admin");

if (!nomeAdmin) {
    window.location.href = "../../Login/HTML/login.html";
} else {
    const userProfileName = document.querySelector(".user-profile-name");
    const welcomeUserName = document.getElementById("welcomeUserName");

    if (userProfileName) userProfileName.textContent = nomeAdmin;
    if (welcomeUserName) welcomeUserName.textContent = nomeAdmin;
}

// ─── CALENDÁRIO ───────────────────────────────────────────────────────────────
const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let date = new Date();

function renderCalendar() {
    if (!calendarDays) return;

    calendarDays.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    if (monthYear) {
        monthYear.innerText = `${months[month]} ${year}`;
    }

    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= lastDate; day++) {
        const div = document.createElement("div");
        div.innerText = day;
        const today = new Date();

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            div.classList.add("today");
        }
        calendarDays.appendChild(div);
    }
}

if (prev && next) {
    prev.onclick = () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    };

    next.onclick = () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    };
}

renderCalendar();