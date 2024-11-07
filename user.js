import { idCreator } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

let allUser = []

export class User {
  constructor(id, name, password, dateBirth){
    this.id = id
    this.name = name
    this.password = password
    this.dateBirth = dateBirth
  }
  userCreate() {
    console.clear();
    let userID = idCreator()
    let userName = readline.question("Nome: ");
    let userPassword = readline.question("Senha: ", { hideEchoBack: true });
    let userConfirmePass = readline.question("Confirmar senha: ", {
      hideEchoBack: true,
    });
    let userDateBirth = readline.question("Nascimento (DD/MM/AAAA): ");

    if (userConfirmePass !== userPassword) {

      console.log("Confirmação de senha incorreta.");
      readline.question("Pressione ENTER para continuar...");

    } else if (!this.validateDate(userDateBirth)) {

      console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
      readline.question("Pressione ENTER para continuar...");

    } else {

      const newUser = new User(userID ,userName, userPassword, userDateBirth)

      allUser.push(newUser);
      console.clear();
      console.log("Usuário Criado Com Sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  list() {
    allUser.forEach(User => {
      console.log(`ID: ${User.id}`);
      console.log(`Nome: ${User.name}`);
      console.log(`Nascimento: ${User.dateBirth}`);
      console.log("================================");
    });
  }

  userList() {
    console.clear();
    if (allUser.length < 1) {
      console.clear();
      readline.question(
        "Nenhum Usuário Cadastrado. \nPressione ENTER para continuar..."
      );
    } else {
      console.clear();
      this.list();
      readline.question("Pressione ENTER para continuar...");
    }
  }

  userDelete() {
    console.clear();
    this.list();
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
        .toUpperCase();
      if (confirmDelete === "s") {
        allUser.splice(index, 1);
        console.log("Usuário Deletado Com Sucesso!");
      } else {
        console.log("Exclusão cancelada.");
      }
    }
    readline.question("Pressione ENTER para continuar...");
  }

  userUpdate() {
    console.clear();
    this.list();
    const userUpdateID = readline.questionInt("Digite o ID do usuário que quer modificar: ");
    console.clear();
    const index = allUser.findIndex((user) => user.id === userUpdateID);

    if (index === -1) {
      console.log("Este usuário não existe.");
    } else {
      const userToUpdate = allUser[index];
      console.log("O usuário modificado será:");
      console.log(`ID: ${userToUpdate.id}`);
      console.log(`Nome: ${userToUpdate.name}`);
      console.log(`Nascimento: ${userToUpdate.dateBirth}`);
      console.log("================================\n");

      const userChooseUpdate = readline.questionInt(
        "O que deseja modificar? \n1 - Nome \n2 - Data de Nascimento \n0 - Voltar \nEscolha: "
      );
      switch (userChooseUpdate) {
        case 1:
          const newName = readline.question("Digite o novo nome: ");
          if (newName.trim()) {
            userToUpdate.name = newName;
          }
          break;
        case 2:
          const newDateBirth = readline.question(
            "Digite a nova data de nascimento: "
          );
          if (this.validateDate(newDateBirth)) {
            userToUpdate.dateBirth = newDateBirth;
          } else {
            console.log(
              "Data de nascimento inválida. Use o formato DD/MM/AAAA."
            );
            readline.question("Pressione ENTER para continuar...");
          }
          break;
        case 0:
          break
        default:
          console.log("Opcao não existe.")
          readline.question("\nPressione ENTER para continuar...");
          break
      }
    }

      console.clear()
      console.log("Usuário Atualizado Com Sucesso!");
      readline.question("\nPressione ENTER para continuar...");
  }

  validateDate(date) {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    console.log("Format: ", dateFormat);
    return dateFormat.test(date);
  }
}
