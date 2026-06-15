document.getElementById("frmCadastro").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const nomePet = document.getElementById("nomePet").value;
    const raca = document.getElementById("raca").value;
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    if (!email || email.trim() == ""){
        return alert("email invalaido")
    }

    if (!nomePet || nomePet.trim() == ""){
        return alert("Nome do pet invalido")
    }

    if(!raca){
        alert ("Selecione uma raça")
    }

    if (!senha || senha.trim() == ""){
        return alert ("Digite uma senha")
    }
    if (senha !== confirmSenha){
        return alert ("As senhas estão diferentes")
    }
})