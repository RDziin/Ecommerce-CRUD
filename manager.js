import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { User } from "./user.js";
import { Product } from "./product.js";
import { read } from "fs";
import { idCreator } from "./idCreator.js";

const userInstance = new User();
const productInstance = new Product();



export class Manager {
  constructor(id, name, password){
    this.id = id
    this.name = name;
    this.password = password
  }
  
  
  
  userManager() {
    userInstance.userList();
    let managerChooseUser = readline.question(
      "Deseja fazer alguma alteração? \n1 - Modificar Dados \n 2 - Deletar \n0 - Voltar \nEscolha: "
    );
    switch (managerChooseUser) {
      case Y:
      case y:
        let modUserChosse = readline.questionInt(
          "1 - Modificar Dados \n 2 - Deletar 0 - Voltar"
        );
        switch (modUserChosse) {
          case 1:
            userInstance.userUpdate();
            break;
          case 2:
            userInstance.userDelete();
            break;
          case 0:
            break;
          default:
            console.log("Opção Invàlida.");
            break;
        }
        break;
    }
    let deleteUserChoose = readline.question(
      "Deseja deletar algum usuário? ( Y / N )"
    );
    switch (deleteUserChoose) {
      case "y":
      case "Y":
        userInstance.userDelete();
        break;
      case "n":
      case "N":
        readline.question(
          "Voltando ao Menu Inicial \nPressione ENTER para continuar..."
        );
        break;
      default:
        readline.question("Opção Inválida \nPressione ENTER para continuar...");
        break;
    }
  }

  productManager() {
    productInstance.productList();
    let managerChooseProduct = readline.question(
      "Deseja fazer alguma alteração? \n1 - Modificar Dados \n 2 - Deletar \n0 - Voltar \nEscolha: "
    );
    switch (managerChooseProduct) {
      case Y:
      case y:
        let modproductChosse = readline.questionInt(
          "1 - Modificar Dados \n 2 - Deletar 0 - Voltar"
        );
        switch (modproductChosse) {
          case 1:
            productInstance.productUpdate();
            break;
          case 2:
            productInstance.productDelete();
            break;
          case 0:
            break;
          default:
            console.log("Opção Invàlida.");
            break;
        }
        break;
    }
    let deleteproductChoose = readline.question(
      "Deseja deletar algum usuário? ( Y / N )"
    );
    switch (deleteproductChoose) {
      case "y":
      case "Y":
        productInstance.productDelete();
        break;
      case "n":
      case "N":
        readline.question(
          "Voltando ao Menu Inicial \nPressione ENTER para continuar..."
        );
        break;
      default:
        readline.question("Opção Inválida \nPressione ENTER para continuar...");
        break;
    }
  }
}

const admin = new Manager(1, "Rhodrigo", "RD123")