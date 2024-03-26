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
    const day = String(formattedDate.getDate()).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const year = formattedDate.getFullYear();

    // Retorne a data no formato "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  } catch {
    return `01/01/0001`;
  }
}
