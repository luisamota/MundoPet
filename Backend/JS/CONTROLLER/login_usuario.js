var btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", function (event) {
    event.preventDefault();
    var frmLogin = document.querySelector("#frmLogin")

    var usuario = {
        email: frmLogin.querySelector("#email").value,
        senha: frmLogin.querySelector("#password").value
    };

    if (!usuario.email || !usuario.senha){
        alert("Preencha todos os campos");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(async response => {
        if (!response.ok) {
            const dadosErro = await response.json();
            throw new Error(dadosErro.erro || "Erro ao realizar login");
        }
        return response.json();
    })
    .then(dados => {
        console.log("Login realizado:", dados);

        localStorage.setItem("token", dados.token);
        localStorage.setItem("tipo", dados.tipo);        
        localStorage.setItem("nomePet", dados.nomePet);  

        alert("Login realizado com sucesso!");            
        //window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Falha no login:", error.message); 
    });
});