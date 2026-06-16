var tableUusario = document.getElementById("table-usuario");

tableUusario.addEventListener("click", function (event){
    event.preventDefault();
    event.stopPropagation();

    if (event.target.classList.contains("btnExcluir")){

        var linha = event.target.closest("tr"); 
        var idUsuario = linha.dataset.id;

        if (confirm("Deseja excluir este usuario?")){
            fetch(`http://localhost:3000/admin/usuarios/${idUsuario}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(dados => {
                console.log("Resposta do servidor:", dados);
                if(dados.sucesso) {
                    linha.remove(); 
                }
            })
            .catch(erro => console.error("Erro na requisição:", erro));
        }
    }
});