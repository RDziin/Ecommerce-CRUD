import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { User } from "./user.js";
import { Product } from "./product.js";
import { Manager } from "./manager.js";
import { read } from "fs";

const userInstance = new User();
const productInstance = new Product();
const managerInstance = new Manager();

function main() {
  let rep = true;
  do {
    console.clear();
    const clientChoose = readline.questionInt(
      "Você é: \n1 - Cliente \n2 - Administrador \n0 - Sair \nEscolha: "
    );
    switch (clientChoose) {
      case 1:
        userScreen();
        break;
      case 2:
        managerScreen();
        break;
      case 0:
        console.log("Saindo...");
        readline.question("\nPressione ENTER para continuar...");
        rep = false;
        break;
      default:
        console.log("Opção inválida.");
        readline.question("\nPressione ENTER para continuar...");
        break;
    }
  } while (rep);
}

function userScreen() {
  let rep = true;
  do {
    console.clear();
    let userHaveAccount = readline.questionInt(
      "1 - Fazer Login \n2 - Criar conta \n0 - Voltar \nEscolha: "
    );
    switch (userHaveAccount) {
      case 1:
        const isLoggedIn = userInstance.userLogin();
        if (isLoggedIn === true) {
          userProductScreen();
        } else {
          console.clear();
          console.log("Não foi possível efetuar o login");
          readline.question("\nPressione ENTER para continuar...");
        }
        break;
      case 2:
        userInstance.userCreate();
        break;
      case 0:
        rep = false;
        break;
      default:
        console.log("Opção inválida.");
        readline.question("\nPressione ENTER para continuar...");
        break;
    }
  } while (rep);
}

function userProductScreen() {
  let rep = true;
  do {
    console.clear();
    const userProductChoice = readline.questionInt(
      "1 - Ver produtos \n0 - Voltar \nEscolha: "
    );
    switch (userProductChoice) {
      case 1:
        break;
      case 0:
        rep = false;
        break;
      default:
        console.log("Opção inválida.");
        readline.question("\nPressione ENTER para continuar...");
        break;
    }
  } while (rep);
}

function managerScreen() {
  console.clear();
  const isLoggedIn = managerInstance.managerLogin();

  if (!isLoggedIn) {
    console.log("Administrador não existente.");
    readline.question("\nPressione ENTER para continuar...");
    return;
  }

  let rep = true;
  do {
    console.clear();
    let managerChoose = readline.questionInt(
      "Você deseja alterar: \n1 - Usuários \n2 - Produtos \n0 - Sair \nEscolha: "
    );
    switch (managerChoose) {
      case 1:
        managerInstance.userManager();
        break;
      case 2:
        managerInstance.productManager();
        break;
      case 0:
        console.log("Saindo do menu administrador...");
        readline.question("\nPressione ENTER para continuar...");
        rep = false;
        break;
      default:
        console.log("Opção inválida.");
        readline.question("\nPressione ENTER para continuar...");
        break;
    }
  } while (rep);
}

main();
