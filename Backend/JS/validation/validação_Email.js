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