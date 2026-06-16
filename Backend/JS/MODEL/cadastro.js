function obterUsuario(){
    return fetch("http://localhost:3000/usuario")
        .then(res => res.json());
}