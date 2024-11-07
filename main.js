import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { User } from "./user.js";
import { Product } from "./product.js";
import { Manager } from "./manager.js";

const userInstance = new User();
const productInstance = new Product();
const managerInstance = new Manager();

function main() {
  let rep = true;
  do {
    const clientChoose = readline.questionInt(
      "Você é: \n1 - Cliente \n2 - Administrador \n0 - Sair \nEscolha: "
    );
    switch (clientChoose) {
      case 1:
        userScreen();
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

function userScreen() {
  let rep = true;
  do {
    let userHaveAccount = readline.questionInt("1 - Fazer Login \n2 - Criar conta \n0 - Sair \nEscolha: ");
    switch (userHaveAccount) {
      case 1:
        // Chama `userLogin` e armazena o resultado em uma variável
        const isLoggedIn = userInstance.userLogin();
        if (isLoggedIn) {
          productInstance.productList();
        } else {
          console.log("Não foi possível efetuar o login");
        }
        break;
      case 2:
        userInstance.userCreate();
        break;
      case 0:
        rep = false;
        break;
      default:
        console.log("Opção não existe.");
        readline.question("\nPressione ENTER para continuar...");
        break;
    }
  } while (rep);
}


main()