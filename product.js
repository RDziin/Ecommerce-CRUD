import { idCreator } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

let product = {};
let stock = [];

let productName = "";
let productPrice = "";
let productQuantify = "";

export class Product {
  productCreate() {
    console.clear();
    productName = readline.question("Nome: ");
    productPrice = readline.questionFloat("Preço: ");
    productQuantify = readline.questionInt("Quantidade em estoque: ");

    const productExists = stock.some((product) => product.name === productName);
    if (productExists) {
      console.log("Este produto já existe!");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    product = {
      id: idCreator(),
      name: productName,
      price: productPrice,
      quantify: productQuantify,
    };

    stock.push(product);
    console.log("Produto Criado com sucesso!");
    readline.question("Pressione ENTER para continuar...");
  }

  list() {
    stock.forEach((product) => {
      console.log(`ID: ${product.id}`);
      console.log(`Nome: ${product.name}`);
      console.log(`Preço: ${product.price}`);
      console.log(`Estoque: ${product.quantify}`);
      console.log("================================");
    });
  }

  productList() {
    console.clear();
    this.list(); 
    readline.question("Pressione ENTER para continuar...");
  }

  productDelete() {
    console.clear();
    this.list(); 

    const idDelete = readline.questionInt("Digite o ID do produto a ser deletado: ");
    console.clear();
    const index = stock.findIndex((product) => product.id === idDelete);

    if (index === -1) {
      console.log("Produto não existe.");
    } else {
      const productToDelete = stock[index];
      console.log("O produto deletado será:");
      console.log(`ID: ${productToDelete.id}`);
      console.log(`Nome: ${productToDelete.name}`);
      console.log(`Preço: ${productToDelete.price}`);
      console.log(`Estoque: ${productToDelete.quantify}`);
      console.log("================================\n");

      stock.splice(index, 1);
      console.log("Produto Deletado Com Sucesso!");
    }
    readline.question("Pressione ENTER para continuar...");
  }
}
