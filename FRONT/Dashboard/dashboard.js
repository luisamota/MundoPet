// MENU

const menuItems=document.querySelectorAll(".menu-item");

menuItems.forEach(item=>{

item.addEventListener("click",()=>{

document
.querySelector(".active")
.classList.remove("active");

item.classList.add("active");

});

});


// CALENDÁRIO

const monthYear=
document.getElementById("monthYear");

const calendarDays=
document.getElementById("calendarDays");

const prev=
document.getElementById("prev");

const next=
document.getElementById("next");

let date=new Date();


function renderCalendar(){

calendarDays.innerHTML="";

const year=date.getFullYear();
const month=date.getMonth();

const firstDay=
new Date(year,month,1).getDay();

const lastDate=
new Date(year,month+1,0).getDate();

const months=[

"Janeiro",
"Fevereiro",
"Março",
"Abril",
"Maio",
"Junho",
"Julho",
"Agosto",
"Setembro",
"Outubro",
"Novembro",
"Dezembro"

];

monthYear.innerText=
`${months[month]} ${year}`;


for(let i=0;i<firstDay;i++){

calendarDays.innerHTML+="<div></div>";

}


for(let day=1;day<=lastDate;day++){

const div=
document.createElement("div");

div.innerText=day;

const today=new Date();

if(
day===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){

div.classList.add("today");

}

calendarDays.appendChild(div);

}

}


prev.onclick=()=>{

date.setMonth(
date.getMonth()-1
);

renderCalendar();

}


next.onclick=()=>{

date.setMonth(
date.getMonth()+1
);

renderCalendar();

}

renderCalendar();

const modal=
document.getElementById("petModal");

const newPetBtn=
document.getElementById("newPetBtn");

const closeModal=
document.getElementById("closeModal");


newPetBtn.addEventListener("click",()=>{

modal.style.display="flex";

});


closeModal.addEventListener("click",()=>{

modal.style.display="none";

});


window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

}

});