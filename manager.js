import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");
import { User } from "./user.js";
import { Product } from "./product.js";
import { read } from "fs";

const userInstance = new User();
const productInstance = new Product()

export class Manager {
  userManager() {
    userInstance.userList();
    let managerChooseUser = readline.question("Deseja fazer alguma alteração? \n1 - Modificar Dados \n 2 - Deletar")
    switch(managerChooseUser){
      case Y:
      case y:
        let modUserChosse = readline.questionInt("1 - Modificar Dados \n 2 - Deletar 0 - Voltar")
          switch(modUserChosse){
            case 1:
              userInstance.userUpdate()
              break
            case 2:
              userInstance.userDelete() 
              break
            case 0:
              break
            default:
              console.log("Opção Invàlida.")
              break
          }
        break
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

  productManager(){

  }
}
