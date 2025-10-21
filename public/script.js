let cafeData = {}; //transforma cafeData em uma array vazia para armazenar os dados dps
let pedidoAtual = []; //
let valorPedido = 0; //é um let pq não é constante e sim variavel e esta em escopo global pq é usada em varias funções

function calcular() {
  //essas consts armazenam o valor inserido nos inputs no html
  const nome = document.getElementById("nome").value;
  const quantidade = parseFloat(document.getElementById("qtd").value);
  const preco = parseFloat(document.getElementById("preco").value);
  const valorTotal = parseFloat(preco * quantidade);

  // após calcular o total do item o nome, quantidade e o preço são enviados em forma de texto pro html
  document.getElementById("nome-quant").innerHTML =
    "- Item: " +
    nome +
    ". - Unidade: " +
    parseFloat(quantidade) +
    ". - Valor Total: R$" +
    parseFloat(valorTotal);

  //array que armazena as informações desejadas
  cafeData = {
    nome: nome,
    quant: quantidade,
    preco: preco.toFixed(2),
    valor: valorTotal,
  };
}

function mostrarLista() {
  const div = document.getElementById("mostrarLista");
  div.innerHTML = "<h5 id='tituloPedido'>Itens do Pedido</h5>";

 
      pedidoAtual.forEach((item, index) => { //para cada item do json/array fara o processo abaixo
        const p = document.createElement("p"); //cria uma tag html

        //cria uma tag <p> e escreve um texto dentro dela
        p.innerHTML = ` <strong>  ${index + 1}.  ${item.nome} </strong> <br> 
      unidade: ${item.quant} <br> 
      preço: ${item.preco} <br> 
      v.total: ${item.valor} <br>
      <b>--------------------</b>`;

        div.appendChild(p); //adiciona <p> no id do html escolhido toda vez q a função rodar
      });
 
}



function salvar() {
  calcular(); //está aqui pois a array q vai pro json foi feita dentro dessa função

  //quando a function rodar o valor do item a ser salvo vai ser somado ao valor do valorPedido
  valorPedido += parseFloat(cafeData.valor);
   document.getElementById("valorT").innerHTML ="Total do Pedido: R$ " + valorPedido.toFixed(2).replace(".", ",");

  //o total do pedido agora vai ser armazenado dentro da array tbm
  cafeData.totalPedido = valorPedido.toFixed(2);

  //envia (post) os dados da array cafeData para o json
  fetch('http://localhost:3000/salvar', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cafeData),
    },
  );

  // Limpa os inputs para adicionar o proximo item
  document.getElementById("nome").value = "";
  document.getElementById("qtd").value = "";
  document.getElementById("preco").value = "";

  pedidoAtual.push({...cafeData}); //
  mostrarLista()//dps de adicionar o item no pedido q mostra a lista com o novo item nela
}
