const baseUrl = "https://mundopet.onrender.com/";
const token = sessionStorage.getItem("tokenAdmin");
const nomeAdmin = sessionStorage.getItem("nome_admin");

// ─── PROTEÇÃO DE ROTA ──────────────────────────────────────────────────────
if (!token) {
    window.location.href = "../../Login/HTML/login.html";
}

// ─── NOME DO ADMIN NO TOPO ────────────────────────────────────────────────
const userProfileName = document.querySelector(".user-profile-name");
if (userProfileName && nomeAdmin) {
    userProfileName.textContent = nomeAdmin;
}

// ─── CARREGAR USUÁRIOS ────────────────────────────────────────────────────
async function carregarUsuarios() {
    try {
        const resposta = await fetch(`${baseUrl}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const usuarios = await resposta.json();
        const tbody = document.getElementById("lista-pets-body");
        tbody.innerHTML = "";

        if (usuarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center">Nenhum usuário cadastrado.</td></tr>`;
            return;
        }

        usuarios.forEach(u => {
            const especie = u.especie || "-";
            const badgeClass = especie.toLowerCase() === "gato" ? "cat" : "dog";
            const badgeLabel = especie.charAt(0).toUpperCase() + especie.slice(1);

            tbody.innerHTML += `
                <tr id="linha-${u.id_usuarios}">
                    <td>${u.nome_usuario}</td>
                    <td>${u.email}</td>
                    <td><strong>${u.nomePet}</strong></td>
                    <td><span class="type-badge ${badgeClass}">${badgeLabel}</span></td>
                    <td>${u.raca || "-"}</td>
                    <td class="text-center">
                        <button class="action-btn" title="Editar"
                            onclick="abrirModalEditar(${u.id_usuarios}, '${u.nome_usuario}', '${u.email}', '${u.nomePet}', '${u.especie}', '${u.raca}')">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="action-btn delete" title="Excluir"
                            onclick="deletarUsuario(${u.id_usuarios})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
    }
}

// ─── DELETAR ──────────────────────────────────────────────────────────────
async function deletarUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
        const resposta = await fetch(`${baseUrl}admin/excluir/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            document.getElementById(`linha-${id}`).remove();
            alert("Usuário excluído com sucesso!");
        } else {
            alert(dados.mensagem || "Erro ao excluir.");
        }

    } catch (erro) {
        console.error("Erro ao deletar:", erro);
        alert("Erro de conexão com o servidor.");
    }
}

// ─── MODAL EDITAR ─────────────────────────────────────────────────────────
function abrirModalEditar(id, nome, email, nomePet, especie, raca) {
    document.getElementById("editId").value = id;
    document.getElementById("editNome").value = nome;
    document.getElementById("editEmail").value = email;
    document.getElementById("editNomePet").value = nomePet;
    document.getElementById("editEspecie").value = especie !== "null" ? especie : "";
    document.getElementById("editRaca").value = raca !== "null" ? raca : "";
    document.getElementById("modalEditar").style.display = "flex";
}

function fecharModalEditar() {
    document.getElementById("modalEditar").style.display = "none";
}

// ─── EVENTOS ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();

    document.getElementById("fecharModalEditar").addEventListener("click", fecharModalEditar);

    document.getElementById("formEditar").addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("editId").value;
        const dados = {
            nome_usuario: document.getElementById("editNome").value,
            email: document.getElementById("editEmail").value,
            nomePet: document.getElementById("editNomePet").value,
            especie: document.getElementById("editEspecie").value,
            raca: document.getElementById("editRaca").value
        };

        try {
            const resposta = await fetch(`${baseUrl}admin/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert("Usuário atualizado com sucesso!");
                fecharModalEditar();
                carregarUsuarios();
            } else {
                alert(resultado.erro || "Erro ao editar.");
            }

        } catch (erro) {
            console.error("Erro ao editar:", erro);
            alert("Erro de conexão com o servidor.");
        }
    });
});