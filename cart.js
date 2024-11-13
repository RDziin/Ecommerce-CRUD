import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { stock } from "./product.js";
import { Product } from "./product.js";
import { codeGenerator } from "./codeGenerator.js";

let codeGenarate = codeGenerator(50)
let stockInstance = stock;
let cart = [];
let productInstance = new Product();

export class Item {
  constructor(name, price, quantify) {
    this.name = name;
    this.price = price;
    this.quantify = quantify;
  }

  addProduct() {
    const idProductBuy = readline.questionInt(
      "Digite o ID do produto que deseja comprar: "
    );

    let buyIndex = stockInstance.findIndex(
      (product) => product.id === idProductBuy
    );

    console.clear()
    if (buyIndex === -1) {
      console.log("Este produto não existe.");
      readline.question("\nPressione ENTER para continuar...");
    } else {
      const productToBuy = stock[buyIndex];

      console.log("O produto a ser adicionado ao carrinho:");
      console.log(`ID: ${productToBuy.id}`);
      console.log(`Nome: ${productToBuy.name}`);
      console.log(`Preço: ${productToBuy.price}`);
      console.log(`Estoque disponível: ${productToBuy.quantify}`);
      console.log("================================\n");

      let addConfirme = readline
        .question("Deseja adicionar ao carrinho? (S/N): ")
        .toUpperCase();

      if (addConfirme === "S") {
        let quantifyBuy = readline.questionInt("Quantos deseja comprar? ");

        if (quantifyBuy <= 0 || quantifyBuy > productToBuy.quantify) {
          console.log("Quantidade inválida ou insuficiente no estoque.");
          readline.question("\nPressione ENTER para continuar...");
          return;
        }

        const newItem = new Item(
          `${productToBuy.name}`,
          `${productToBuy.price}`,
          quantifyBuy
        );
        cart.push(newItem);

        console.log(
          `Adicionado ${quantifyBuy} unidades de ${productToBuy.name} ao carrinho.`
        );
        readline.question("\nPressione ENTER para continuar...");
      }
    }
  }

  list() {
    console.clear();
    if (cart.length === 0) {
      console.log("Carrinho Vazio!");
      return;
    }

    cart.forEach((item) => {
      console.log(`Nome: ${item.name}`);
      console.log(`Preco: ${item.price}`);
      console.log(`Quantidade: ${item.quantify}`);
      console.log("================================");
    });
  }

  viewCart() {
    this.list();
    readline.question("\nPressione ENTER para continuar...");
  }

  finalizeBuy() {
    if (cart.length === 0) {
      console.log("Não há produtos a serem comprados.");
      return;
    }

    this.list();
    const totalQuantify = cart.reduce(
      (total, item) => total + item.quantify,
      0
    );
    console.log(`Total de itens no carrinho: ${totalQuantify}`);
    this.getTotalValue()

    let confirmeFinalize = readline
      .question("Tem certeza que deseja finalizar a compra? (S/N): ")
      .toUpperCase();

    if (confirmeFinalize === "S") {
      console.clear();
      this.paymentForme();

      cart.forEach((item) => {
        const product = stock.find((p) => p.name === item.name);
        if (product) {
          productInstance.updateStock(product.id, item.quantify);
        }
      });

      cart = [];
      console.log("Compra finalizada com sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    } else if(productInstance.updateStock() === false) {
      console.log("Compra cancelada.");
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  paymentForme() {
    let paymentForme = readline.questionInt(
      "Qual forma de pagamento? \n1 - Pix \n2 - Boleto \n3 - Cartao \n0 - Cancelar Compra \nEscolha: "
    );

    switch (paymentForme) {
      case 1:
        console.log(`Copie e cole o codigo PIX: ${codeGenarate}`)
        readline.question("\nPressione ENTER para confirmar o pagamento...");
        break;
      case 2:
        let emailClient = readline.questionEMail("Insira seu Email: ");
        console.log(
          `O boleto foi gerado e enviado para o Email: ${emailClient}`
        );
        readline.question("\nPressione ENTER para confirmar o pagamento...");
        break;
      case 3:
        let numberCard = readline.questionInt("Numero do cartao: ");
        let nameCard = readline.question("Nome do titular: ");
        let cvvCard = readline.questionInt("CVV:");
        readline.question("\nPressione ENTER paraw confirmar o pagamento...");
        break;
      case 0:
        return false;
      default:
        console.log("Opção não existe.");
        break;
    }
  }

  getTotalValue() {
    if (cart.length === 0) {
      console.log("O carrinho está vazio.");
      return 0;
    }
  
    const totalValue = cart.reduce((total, item) => {
      return total + item.price * item.quantify;
    }, 0);
  
    console.log(`Valor total do carrinho: R$ ${totalValue.toFixed(2)}`);
    return totalValue;
  }
}
