import { read } from "fs";
import { idCreator } from "./idCreator.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

let product = {};
let stock = [];

let productName = "";
let productPrice = "";
let productQuantify = "";

export function productCreate() {
  console.clear();
  productName = readline.question("Nome: ");
  productPrice = readline.questionFloat("Preço: ");
  productQuantify = readline.questionInt("Quantidade em estoque: ");

  const productExists = stock.some((product) => product.name === productName);
  if (productExists) {
    console.log("Este produto já existe!");
    return;
  }

  product = {
    id: idCreator(),
    name: productName,
    price: productPrice,
    quantify: productQuantify,
  };

  stock.push(product);
  console.log("Produto Criado com sucesso!!");
  let press = readline.question("Pressione ENTER para continuar...");
}

function list(){
    stock.forEach((product) => {
        console.log(`ID: ${product.id}`);
        console.log(`Nome: ${product.name}`);
        console.log(`Preço: ${product.price}`);
        console.log(`Estoque: ${product.quantify}`);
        console.log("================================");
      });
}     
export function productList() {
  console.clear();
  list()
  let press = readline.question("Presssione ENTER para cotninuar...");
}

export function productDelete(){
    console.clear()
    list()

    let idDelete = readline.questionInt("Digite o ID do produto a ser deletado: ")
    console.clear()
    const index = stock.findIndex(product => product.id === idDelete)

    if(index === -1){
        console.log("Produto não existe.")
    } else {
        console.log("O produto deleta será: ")
        const productToDelete = stock[index]
        console.log(`ID: ${productToDelete.id}`)
        console.log(`Nome: ${productToDelete.name}`)
        console.log(`Preço: ${productToDelete.price}`)
        console.log(`Estoque; ${productToDelete.quantify}`)

        stock.splice(index, 1)
        console.log("Produto Deletado Com Sucesso!")
        let press = readline.question("Presssione ENTER para cotninuar...")
    }
}