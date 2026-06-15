var btnCadastrar = document.getElementById("btnCadastro");

btnCadastrar.addEventListener("click", function (event) {
    event.preventDefault();

    var frmCadastro = document.querySelector("#frmCadastro");

    if (validacao_Usuario(frmCadastro) === false) {
        return;
    }

    var usuario = {
        email: frmCadastro.querySelector("#email").value,
        nomePet: frmCadastro.querySelector("#nomePet").value,
        senha: frmCadastro.querySelector("#confirmSenha").value 
    };

    fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(async response => {
        if (!response.ok) {
            const dadosErro = await response.json();
            // Lança o erro com a mensagem vinda lá do seu Service/Banco
            throw new Error(dadosErro.erro || "Erro ao cadastrar usuário");
        }
        return response.json();
    })
    .then(dados => {
        console.log("Usuário salvo no banco:", dados);
        
        alert(dados.mensagem); 
        
        frmCadastro.reset(); 
    })
    .catch(error => {
        console.error(error);
        alert(error.message); 
    });
});