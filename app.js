import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public")); //acessa os arquivos da pasta public

function leituraDados() {
  const dadosBrutos = fs.readFileSync("data.json"); //pega-se todas as informações do json e coloca dentro de dadosBrutos
  const dados = JSON.parse(dadosBrutos); //transforma essas informações em array/objetos para poderem ser manipuladas e coloca dentro de dados
  return dados; // retorna as informações armazanadas em dados
}

function addItem(novoItem) {
  const item = leituraDados(); // item recebe as informações da const dados
  item.push(novoItem); // o novo item é adicionado como a ultima informação dentro de item
  fs.writeFileSync("data.json", JSON.stringify(item, null, 2)); //passa as informações da const item para o json
  console.log("Item registrado com Sucesso!!"); //avisa q foi registrado
}

app.post("/salvar", (req, res) => {
  const cafeData = req.body; //recebe as informações q o usuario adicionou na array cafeData
  console.log("Recebido:", cafeData); //avisa q recebeu
  addItem(cafeData); //essa nova informação do ususario é passada para a função add para envia-la ao json
  res.send("dados salvos no json");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
