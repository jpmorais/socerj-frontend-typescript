export function dateToISO(dateString: string) {
  // Divida a string da data em dia, mês e ano
  const parts = dateString.split("/");

  // Crie uma nova data no formato "mm/dd/yyyy"
  const formattedDate = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);

  // Extraia o ano, mês e dia da data formatada
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
  const day = String(formattedDate.getDate()).padStart(2, "0"); // Adiciona zero à esquerda, se necessário

  // Retorne a data no formato "yyyy-mm-dd"
  return `${year}-${month}-${day}`;
}

export function ISOToDate(isoDateString: string) {
  // Divida a string da data em ano, mês e dia
  try {
    const parts = isoDateString.split("-");

    // Crie uma nova data no formato "yyyy-mm-dd"
    const formattedDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);

    // Extraia o dia, mês e ano da data formatada
    const day = String(formattedDate.getDate() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const year = formattedDate.getFullYear();

    // Retorne a data no formato "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  } catch {
    return `01/01/0001`;
  }
}

export function formatarParaDinheiro(numero: string) {
  // Arredonda o número para duas casas decimais
  const numeroFormatado = parseFloat(numero).toFixed(2);

  // Converte o número para uma string
  let valorMonetario = numeroFormatado.toString();

  // Divide o valor em parte inteira e decimal
  const partes = valorMonetario.split(".");

  // Adiciona separador de milhares à parte inteira
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Junta as partes com uma vírgula
  valorMonetario = partes.join(",");

  // Adiciona o símbolo da moeda
  valorMonetario = "R$ " + valorMonetario;

  return valorMonetario;
}

export function converterDataParaFormatoBrasileiro(dataISO: string) {
  const data = new Date(dataISO);

  // Verifica se a data é válida
  if (isNaN(data.getTime())) {
    return null; // Retorna null se a data for inválida
  }

  // Obtém o dia, mês e ano
  const dia = String(data.getDate() + 1).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa do zero, então adicionamos 1
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
