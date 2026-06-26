const baseUrl = "https://mundopet.onrender.com/"

function validarEmail(email) {
    const valor = email.trim();

    if (!valor.includes("@")) {
        return { valido: false, mensagem: "Falta o @ — ex: nome@gmail.com" };
    }

    const [usuario, ...resto] = valor.split("@");
    const dominio = resto.join("@");

    if (!usuario) {
        return { valido: false, mensagem: "Coloca um nome antes do @" };
    }

    if (!dominio) {
        return { valido: false, mensagem: "Coloca o domínio depois do @ — ex: gmail.com" };
    }

    if (!dominio.includes(".")) {
        return { valido: false, mensagem: "O domínio precisa ter um ponto — ex: @gmail.com" };
    }

    const extensao = dominio.slice(dominio.lastIndexOf(".") + 1);
    if (!extensao || extensao.length < 2) {
        return { valido: false, mensagem: "Extensão inválida — ex: .com, .br, .org" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(valor)) {
        return { valido: false, mensagem: "Formato inválido — ex: nome@gmail.com" };
    }

    return { valido: true, mensagem: "" };
}

// navegação
const btnFechar = document.querySelector('.close-btn');
const linkLogin = document.getElementById('link-login');

if (linkLogin) {
    linkLogin.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "../HTML/login.html";
    });
}

if (btnFechar) {
    btnFechar.addEventListener("click", () => {
        window.location.href = "../HTML/registerCatDog.html";
    });
}

// cadastro
var btnCadastrar = document.getElementById("btn-cadastrar");

btnCadastrar.addEventListener("click", function (event) {
    event.preventDefault();

    var frmCadastro = document.querySelector("#frmCadastro");
    const emailValor = frmCadastro.querySelector("#email").value;

    const resultadoEmail = validarEmail(emailValor);
    if (!resultadoEmail.valido) {
        alert(resultadoEmail.mensagem);
        return;
    }

    const especieSalva = localStorage.getItem("especieSelecionada");
    console.log(especieSalva)
    // if (!especieSalva) {
    //     alert("Por favor, selecione se o seu pet é um cachorro ou um gato antes de preencher o cadastro.");
    //     window.location.href = "../HTML/registerCatDog.html";
    //     return;
    // }

    var usuario = {
        email: emailValor,
        nome_usuario: frmCadastro.querySelector("#tutor-name").value,
        nomePet: frmCadastro.querySelector("#petName").value,
        especie: especieSalva,
        raca: frmCadastro.querySelector("#breed").value,
        senha: frmCadastro.querySelector("#confirm-password").value
    };

    fetch(`${baseUrl}cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
    })
    .then(async response => {
        if (!response.ok) {
            const dadosErro = await response.json();
            throw new Error(dadosErro.erro || "Erro ao cadastrar usuário");
        }
        return response.json();
    })
    .then(dados => {
        alert(dados.mensagem);
        frmCadastro.reset();
        localStorage.removeItem("especieSelecionada");
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
});