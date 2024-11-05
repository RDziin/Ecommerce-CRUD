import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");
import { User } from "./user.js";
import { read } from "fs";

const userInstance = new User();

export class Manager {
  userManager() {
    userInstance.userList();
    let managerChoose = readline.question("Deseja fazer alguma alteração? \n1 - Modificar Dados \n 2 - Deletar")
    switch(managerChoose){
      case Y:
      case y:
        let modChosse = readline.questionInt("1 - Modificar Dados \n 2 - Deletar 0 - Voltar")
        break
    }
    let deleteChoose = readline.question(
      "Deseja deletar algum usuário? ( Y / N )"
    );
    switch (deleteChoose) {
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
}
