import { idCreatorProduct } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");
import { Product } from "./product";

let stock = [];

export class Product {
  constructor(id, name, price, quantify) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantify = quantify;
  }

  productCreate() {
    console.clear();
    let productID = idCreatorProduct();
    let productName = readline.question("Nome: ");
    let productPrice = readline.questionFloat("Preço: ");
    let productQuantify = readline.questionInt("Quantidade em estoque: ");

    const productExists = stock.some((product) => product.name === productName);
    if (productExists) {
      console.log("Este produto já existe!");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    const newProduct = new Product(
      productID,
      productName,
      productPrice,
      productQuantify
    );
    stock.push(newProduct);
    console.log("Produto criado com sucesso!");
    readline.question("Pressione ENTER para continuar...");
  }

  list() {
    if (stock.length === 0) {
      console.log("Nenhum produto cadastrado.");
      return;
    }

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
    readline.question("\nPressione ENTER para continuar...");
  }

  productDelete() {
    console.clear();
    this.list();

    const idDelete = readline.questionInt(
      "Digite o ID do produto a ser deletado: "
    );
    console.clear();
    const index = stock.findIndex((product) => product.id === idDelete);

    if (index === -1) {
      console.log("Produto não existe.");
    } else {
      const productToDelete = stock[index];
      console.log("O produto a ser deletado:");
      console.log(`ID: ${productToDelete.id}`);
      console.log(`Nome: ${productToDelete.name}`);
      console.log(`Preço: ${productToDelete.price}`);
      console.log(`Estoque: ${productToDelete.quantify}`);
      console.log("================================\n");

      const confirmDelete = readline
        .question("Confirmar exclusão? (S/N): ")
        .toUpperCase();

      if (confirmDelete === "S") {
        stock.splice(index, 1);
        console.log("Produto deletado com sucesso!");
      } else {
        console.log("Exclusão cancelada.");
      }
    }

    readline.question("\nPressione ENTER para continuar...");
  }

  productUpdate() {
    console.clear();
    this.list();
    const productUpdateID = readline.questionInt(
      "Digite o ID do produto que deseja modificar: "
    );
    console.clear();
    const index = stock.findIndex((product) => product.id === productUpdateID);

    if (index === -1) {
      console.log("Este produto não existe.");
      readline.question("\nPressione ENTER para continuar...");
    } else {
      const productToUpdate = stock[index];
      console.log("O produto a ser atualizado:");
      console.log(`ID: ${productToUpdate.id}`);
      console.log(`Nome: ${productToUpdate.name}`);
      console.log(`Preço: ${productToUpdate.price}`);
      console.log(`Estoque: ${productToUpdate.quantify}`);
      console.log("================================\n");

      const productChooseUpdate = readline.questionInt(
        "O que será modificado? \n1 - Nome \n2 - Preço \n3 - Estoque \n0 - Voltar \nEscolha: "
      );

      switch (productChooseUpdate) {
        case 1:
          const newName = readline.question("Digite o novo nome: ");
          if (newName.trim()) {
            productToUpdate.name = newName;
            console.log("Nome atualizado com sucesso!");
          } else {
            console.log("Nome inválido.");
          }
          break;
        case 2:
          const newPrice = readline.questionFloat("Digite o novo preço: ");
          productToUpdate.price = newPrice;
          console.log("Preço atualizado com sucesso!");
          break;
        case 3:
          const newQuantity = readline.questionInt(
            "Digite a nova quantidade: "
          );
          productToUpdate.quantify = newQuantity;
          console.log("Estoque atualizado com sucesso!");
          break;
        case 0:
          console.log("Operação cancelada.");
          break;
        default:
          console.log("Opção não existe.");
          break;
      }
    }

    readline.question("\nPressione ENTER para continuar...");
  }

  productBuy() {
    this.list();
    let userBuy = readline
      .question("Você deseja comprar algum produto?")
      .toUpperCase();
    switch (userBuy) {
      case "S":
        console.clear();
        productInstance.productList();
        let idBuy = readline.question(
          "Digite o ID do produto que quer comprar: "
        );

        const buyIndex = stock.findIndex((product) => product.id === idBuy);

        if (buyIndex === -1) {
          console.log("Este produto não existe.");
          readline.question("\nPressione ENTER para continuar...");
        } else {
          const productToBuy = stock[index];
          console.log("O produto a ser comprado:");
          console.log(`ID: ${productToBuy.id}`);
          console.log(`Nome: ${productToBuy.name}`);
          console.log(`Preço: ${productToBuy.price}`);
          console.log(`Estoque: ${productToBuy.quantify}`);
          console.log("================================\n");
        }
    }
  }
}
