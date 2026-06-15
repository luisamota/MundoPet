/*async function validarEmail(email){
    const apiKey = "1ba52e34b818412b9b57984e94bdad17";
    const url = `https://ip-intelligence.abstractapi.com/v1/?api_key=1ba52e34b818412b9b57984e94bdad17&ip_address=200.205.135.186`;

    try {
        console.log("✈️ Testando o e-mail:", email);
        
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // 🔍 ALERTA 1: Mostra o que a API respondeu de verdade
        console.log("👉 RESPOSTA DA ABSTRACT API:", dados);

        return dados.deliverability === "DELIVERABLE";
    }
    catch (error) {
        // 🔍 ALERTA 2: Se o seu Node falhar antes de falar com a API, vai aparecer aqui
        console.error("❌ ERRO INTERNO NO CATCH:", error.message);
        return false;
    }
}

module.exports = { validarEmail };*/