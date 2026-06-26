// auth.js - Gerencia os dados do usuário logado

// 1. SIMULAÇÃO DE LOGIN PARA O SEU CRUD
// Se não tiver ninguém logado na memória, a gente cria um usuário falso para testes.
// Quando você fizer a tela de login real, é ela quem vai salvar isso no localStorage.
if (!localStorage.getItem("usuarioLogado")) {
    localStorage.setItem("usuarioLogado", "Admin Carlos");
}

// 2. RECUPERA O NOME DO BANCO (neste caso, do localStorage)
const nomeCompleto = localStorage.getItem("usuarioLogado");

// Pega apenas o primeiro nome para dar um "Bem-vindo" mais íntimo
const primeiroNome = nomeCompleto.split(" ")[0]; 

// 3. INJETA O NOME NA TELA
document.addEventListener("DOMContentLoaded", () => {
    
    // Atualiza a mensagem de boas-vindas (Apenas no Dashboard)
    const welcomeElement = document.getElementById("welcomeUserName");
    if (welcomeElement) {
        welcomeElement.innerText = primeiroNome;
    }

    // Atualiza o nome lá no cantinho superior direito (Em todas as páginas)
    const profileElements = document.querySelectorAll(".user-profile-name");
    profileElements.forEach(elemento => {
        elemento.innerText = nomeCompleto;
    });

});