type Props = {
  categoria: string;
  price: string | number;
  dataLimite: string;
  quantidade?: number;
};

const CardPrice = ({ categoria, price, dataLimite, quantidade }: Props) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{categoria}</h2>
        <p>{formatarParaDinheiro(price.toString())}</p>
        <p>{converterDataParaFormatoBrasileiro(dataLimite)}</p>
        <p>Quantidade: {quantidade || "(aberto)"}</p>
      </div>
    </div>
  );
};
export default CardPrice;

function formatarParaDinheiro(numero: string) {
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

function converterDataParaFormatoBrasileiro(dataISO: string) {
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
