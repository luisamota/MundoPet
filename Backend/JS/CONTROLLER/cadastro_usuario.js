var btnCadastrar = document.getElementById("btn-cadastrar");

btnCadastrar.addEventListener("click", function (event) {
    event.preventDefault();

    var frmCadastro = document.querySelector("#frmCadastro");

    //if (validacao_Usuario(frmCadastro) === false) {
        //return;
    //}
    const especieSalva = localStorage.getItem("especieSelecionada");

    if (!especieSalva) {
        alert("Por favor, selecione se o seu pet é um cachorro ou um gato antes de preencher o cadastro.");
        window.location.href = "../HTML/registerCatDog.html";
        return;
    }

    var usuario = {
        email: frmCadastro.querySelector("#email").value,
        nomePet: frmCadastro.querySelector("#petName").value,
        especie: especieSalva,
        raca: frmCadastro.querySelector("#breed").value,
        senha: frmCadastro.querySelector("#confirm-password").value 
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
            throw new Error(dadosErro.erro || "Erro ao cadastrar usuário");
        }
        return response.json();
    })
    .then(dados => {
        console.log("Usuário salvo no banco:", dados);
        
        alert(dados.mensagem); 
        
        frmCadastro.reset(); 
        
        // 3. LIMPEZA: Remove da gaveta para ficar limpo para os próximos cadastros no site
        localStorage.removeItem("especieSelecionada");
    })
    .catch(error => {
        console.error(error);
        alert(error.message); 
    });
});