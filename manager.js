import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { User } from "./user.js";
import { Product } from "./product.js";

const userInstance = new User();
const productInstance = new Product();

export class Manager {
  constructor(id, name, password) {
    this.id = id;
    this.name = name;
    this.password = password;
  }

  // Método de login do gerente
  managerLogin() {
    console.clear();
    const admin = new Manager(1, "Rhodrigo", "RD123");
    let attempts = 3;

    while (attempts > 0) {
      let loginName = readline.question("Login: ");
      let loginPassword = readline.question("Senha: ", { hideEchoBack: true });

      if (loginName === admin.name && loginPassword === admin.password) {
        console.log("Login efetuado com sucesso!");
        readline.question("\nPressione ENTER para continuar...");
        return true;
      } else {
        attempts--;
        console.log(
          `Nome de usuário ou senha incorretos. Tentativas restantes: ${attempts}`
        );
      }

      if (attempts === 0) {
        console.log("Número de tentativas excedido. Acesso negado.");
        readline.question("\nPressione ENTER para sair...");
        return false;
      }
    }
  }

  // Gerenciamento de usuários
  userManager() {
    console.clear();
    userInstance.userList();
    let managerChooseUser = readline
      .question("\nDeseja realizar alguma alteração? (S/N): ")
      .toUpperCase();

    if (managerChooseUser === "S") {
      let modUserChoose = readline.questionInt(
        "\n1 - Modificar Dados \n2 - Deletar Usuário \n0 - Voltar \nEscolha: "
      );

      switch (modUserChoose) {
        case 1:
          userInstance.userUpdate();
          break;
        case 2:
          userInstance.userDelete();
          break;
        case 0:
          console.log("Voltando ao menu anterior...");
          break;
        default:
          console.log("Opção Inválida. Retornando ao menu anterior...");
          break;
      }
    } else if (managerChooseUser !== "N") {
      console.log("Opção inválida.");
    }
  }

  // Gerenciamento de produtos
  productManager() {
    console.clear();
    productInstance.productList();
    let managerChooseProduct = readline
      .question("\nDeseja realizar alguma alteração? (S/N): ")
      .toUpperCase();

    if (managerChooseProduct === "S") {
      let modProductChoose = readline.questionInt(
        "\n1 - Criar Produto \n2 - Modificar Dados \n3 - Deletar Produto \n0 - Voltar \nEscolha: "
      );

      switch (modProductChoose) {
        case 1:
          productInstance.productCreate();
          break;
        case 2:
          productInstance.productUpdate();
          break;
        case 3:
          productInstance.productDelete();
          break;
        case 0:
          console.log("Voltando ao menu anterior...");
          break;
        default:
          console.log("Opção Inválida. Retornando ao menu anterior...");
          break;
      }
    } else if (managerChooseProduct !== "N") {
      console.log("Opção inválida.");
    }
  }
}