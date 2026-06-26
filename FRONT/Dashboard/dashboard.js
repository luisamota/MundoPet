// dashboard.js - Exclusivo do calendário da tela inicial

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let date = new Date();

function renderCalendar() {
    // Segurança: se não achar o calendário na tela, não faz nada
    if(!calendarDays) return; 

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

// Segurança: só adiciona o clique se os botões prev/next existirem
if(prev && next) {
    prev.onclick = () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    }
    
    next.onclick = () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    }
}

renderCalendar();