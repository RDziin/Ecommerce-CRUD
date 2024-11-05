import { idCreator } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

let user = {};
let allUser = [];

let formName = "";
let formPassword = "";
let formConfirmePass = "";
let formDateBirth = "";

export class User {
  userCreate() {
    console.clear();
    formName = readline.question("Nome: ");
    formPassword = readline.question("Senha: ", { hideEchoBack: true });
    formConfirmePass = readline.question("Confirmar senha: ", {
      hideEchoBack: true,
    });
    formDateBirth = readline.question("Nascimento (DD/MM/AAAA): ");

    if (formConfirmePass !== formPassword) {
      console.log("Confirmação de senha incorreta.");
      readline.question("Pressione ENTER para continuar...");
    } else if (!this.validateDate(formDateBirth)) {
      console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
      readline.question("Pressione ENTER para continuar...");
    } else {
      user = {
        id: idCreator(),
        name: formName,
        dateBirth: formDateBirth,
      };

      allUser.push(user);
      console.clear();
      console.log("Usuário Criado Com Sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  list(){
    allUser.forEach((user) => {
      console.log(`ID: ${user.id}`);
      console.log(`Nome: ${user.name}`);
      console.log(`Nascimento: ${user.dateBirth}`);
      console.log("================================");
    });
  }

  userList() {
    console.clear();
    if (allUser.length < 1) {
      console.clear()
      readline.question(
        "Nenhum Usuário Cadastrado. \nPressione ENTER para continuar..."
      );
    } else {
      console.clear()
      this.list()
      readline.question("Pressione ENTER para continuar...");
    }
  }

  userDelete() {
    console.clear();
    this.list()
    const deleteID = readline.questionInt("Digite o ID que quer deletar: ");
    console.clear();
    const index = allUser.findIndex((user) => user.id === deleteID);

    if (index === -1) {
      console.log("Usuário não existe.");
    } else {
      const userToDelete = allUser[index];
      console.log("O usuário deletado será:");
      console.log(`ID: ${userToDelete.id}`);
      console.log(`Nome: ${userToDelete.name}`);
      console.log(`Nascimento: ${userToDelete.dateBirth}`);
      console.log("================================\n");

      const confirmDelete = readline
        .question("Confirmar exclusão? (s/n): ")
        .toLowerCase();
      if (confirmDelete === "s") {
        allUser.splice(index, 1);
        console.log("Usuário Deletado Com Sucesso!");
      } else {
        console.log("Exclusão cancelada.");
      }
    }
    readline.question("Pressione ENTER para continuar...");
  }
  userUpdate(){

  }
  validateDate(date) {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    console.log("Format: ", dateFormat);
    return dateFormat.test(date);
  }
}
