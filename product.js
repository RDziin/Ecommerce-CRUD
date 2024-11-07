import { idCreator } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require ("readline-sync");




let stock = [];


export class Product {
  constructor(id, name, price, quantify){
    this.id = id
    this.name = name
    this.price = price
    this.quantify = quantify
  }

  productCreate() {
    console.clear();
    let productID = idCreator()
    let productName = readline.question("Nome: ");
    let productPrice = readline.questionFloat("Preço: ");
    let productQuantify = readline.questionInt("Quantidade em estoque: ");

    const productExists = stock.some((product) => product.name === productName);
    if (productExists) {
      console.log("Este produto já existe!");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    const newProduct = new Product(productID, productName, productPrice, productQuantify)

    stock.push(newProduct);
    console.log("Produto Criado com sucesso!");
    readline.question("Pressione ENTER para continuar...");
  }

  list() {
    stock.forEach(Product => {
      console.log(`ID: ${Product.id}`);
      console.log(`Nome: ${Product.name}`);
      console.log(`Preço: ${Product.price}`);
      console.log(`Estoque: ${Product.quantify}`);
      console.log("================================");
    });
  }

  productList() {
    if (stock.length < 1) {
      readline.question(
        "Nenhum Produt Cadastrado. \nPressione ENTER para continuar..."
      );
    } else {
      console.clear();
      this.list();
      readline.question("Pressione ENTER para continuar...");
    }
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
      console.log("O produto deletado será:");
      console.log(`ID: ${productToDelete.id}`);
      console.log(`Nome: ${productToDelete.name}`);
      console.log(`Preço: ${productToDelete.price}`);
      console.log(`Estoque: ${productToDelete.quantify}`);
      console.log("================================\n");

      const confirmDelete = readline.question("Confirmar exlusão? (S/N)").toUpperCase()

      if(confirmDelete === "s"){
        stock.splice(index, 1);
      console.log("Produto Deletado Com Sucesso!");
      } else {
        console.log("Exlusão cancelada.")
      }
      
    }
    readline.question("Pressione ENTER para continuar...");
  }

  productUpdate() {
    console.clear()
    this.list()
    const productUpdateID = readline.questionInt("Digite o ID do produto que quer modificar: ")
    console.clear()
    const index = stock.findIndex((product) => product.id === productUpdateID)

    if(index === -1){
      console.log("Este produto não existe.")
    } else {
      const productToUpdate = stock[index]
      console.log("O produto deletado será:");
      console.log(`ID: ${productToUpdate.id}`);
      console.log(`Nome: ${productToUpdate.name}`);
      console.log(`Preço: ${productToUpdate.price}`);
      console.log(`Estoque: ${productToUpdate.quantify}`);
      console.log("================================\n");

      const productChosseUpdate = readline.questionInt("O que será modificado? \n1 - Nome \n2 - Preço \n3 - Estoque \n0 - Voltar \nEscolha: ")

      switch(productChosseUpdate){
        case 1:
          const newName = readline.question("Digite o novo nome: ")
          if(newName.trim()){
            productToUpdate.name = newName
          }
          break
        case 2:
          const newPrice = readline.questionFloat("Digite o novo preço: ")
          if(newPrice.trim()){
            productToUpdate.price = newPrice
          }
          break
        case 3:
          const newQuatify = readline.questionInt("Digite a nova quantidade: ")
          if(newQuatify.trim()){
            productToUpdate.quantify = newQuatify
          }
          break
        case 0:
          break
        default:
          console.log("Opcao não existe.")
          readline.question("\nPressione ENTER para continuar...");
          break
      }

    }
  }
}
