// Selecionando os elementos da tela
const btnFechar = document.querySelector('.close-btn');
const botaoCadastrar = document.getElementById('btn-cadastrar');
const linkLogin = document.getElementById('link-login');
const formulario = document.querySelector('form');

// 1. Ao clicar em "Clique aqui", vai para a página de login
linkLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que a página recarregue pelo comportamento padrão do link
    window.location.href = "../html/login.html"; // Substitua pelo nome real do seu arquivo de login
});

// 2. Ao clicar em "Cadastrar", exibe mensagem e volta para a home
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio real do formulário para processar o alerta primeiro
    
    alert("Cadastro efetuado com sucesso!");
    
    window.location.href = "index.html"; // Substitua pelo nome real da sua página home/inicial
});

// 3. Evento ao clicar no "X" (Redireciona para a página de seleção de cão/gato)
if (btnFechar) {
    btnFechar.addEventListener("click", () => {
        window.location.href = "../HTML/registerCatDog.html"; // Certifique-se de incluir o .html no final se o arquivo for assim
    });
}