document.getElementById("frmCadastro").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const nomePet = document.getElementById("petName").value;
    const raca = document.getElementById("breed").value;
    const senha = document.getElementById("password").value;
    const confirmSenha = document.getElementById("confirm-password").value;

    if (!email || email.trim() == ""){
        return alert("email invalaido")
    }

    if (!nomePet || petName.trim() == ""){
        return alert("Nome do pet invalido")
    }

    if(!raca){
        alert ("Selecione uma raça")
    }

    if (!senha || senha.trim() == ""){
        return alert ("Digite uma senha")
    }
    if (confirmSenha !== confirm-password){
        return alert ("As senhas estão diferentes")
    }
})