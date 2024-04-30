const relatorioDate = () => {
  const hoje = new Date(); // Obtém a data atual
  hoje.setDate(hoje.getDate() - 1); // Define a data do relatório

  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1; // Os meses no JavaScript são baseados em zero (janeiro é 0)
  const ano = hoje.getFullYear();

  // Formata a data no formato desejado (YYYY-MM-DD)
  const dataRelatorio = `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}/${ano}`;
  return dataRelatorio;
};

module.exports = relatorioDate;
