import { idCreatorUser } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");
import bcrypt from "bcrypt";
let allUser = [];

export class User {
  constructor(id, name, password, dateBirth) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.dateBirth = dateBirth;
  }

  async userCreate() {
    console.clear();
    let userID = idCreator();
    let userName = readline.question("Nome: ");
    let userPassword = readline.question("Senha: ", { hideEchoBack: true });
    let userConfirmePass = readline.question("Confirmar senha: ", {
      hideEchoBack: true,
    });
    let userDateBirth = readline.question("Nascimento (DD/MM/AAAA): ");

    if (userConfirmePass !== userPassword) {
      console.log("Confirmação de senha incorreta.");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    if (!this.validateDate(userDateBirth)) {
      console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const newUser = new User(userID, userName, hashedPassword, userDateBirth);

      allUser.push(newUser);
      console.clear();
      console.log("Usuário criado com sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    } catch (error) {
      console.log("Erro ao criar usuário:", error);
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  async userLogin() {
    console.clear();
    let loginName = readline.question("Login: ");
    let loginPassword = readline.question("Senha: ", { hideEchoBack: true });

    // Encontrar o usuário pelo nome
    const loginUser = allUser.find((u) => u.name === loginName);

    if (!loginUser) {
      console.log("Usuário não encontrado.");
      readline.question("\nPressione ENTER para continuar...");
      return false;
    }

    // Comparar a senha com o hash
    const isPasswordCorrect = await bcrypt.compare(
      loginPassword,
      loginUser.password
    );

    if (isPasswordCorrect) {
      console.log("Login efetuado com sucesso!");
      readline.question("\nPressione ENTER para continuar...");
      return true;
    } else {
      console.log("Senha incorreta.");
      readline.question("\nPressione ENTER para tentar novamente...");
      return false;
    }
  }

  list() {
    if (allUser.length === 0) {
      console.log("Nenhum usuário cadastrado.");
      readline.question("\nPressione ENTER para continuar...");
      return;
    }

    allUser.forEach((user) => {
      console.log(`ID: ${user.id}`);
      console.log(`Nome: ${user.name}`);
      console.log(`Nascimento: ${user.dateBirth}`);
      console.log("================================");
    });
  }

  userList() {
    console.clear();
    this.list();
    readline.question("Pressione ENTER para continuar...");
  }

  userDelete() {
    console.clear();
    this.list();
    const deleteID = readline.questionInt("Digite o ID que deseja deletar: ");
    const index = allUser.findIndex((user) => user.id === deleteID);

    if (index === -1) {
      console.log("Usuário não existe.");
    } else {
      const userToDelete = allUser[index];
      console.log("O usuário a ser deletado:");
      console.log(`ID: ${userToDelete.id}`);
      console.log(`Nome: ${userToDelete.name}`);
      console.log(`Nascimento: ${userToDelete.dateBirth}`);
      console.log("================================\n");

      const confirmDelete = readline
        .question("Confirmar exclusão? (S/N): ")
        .toUpperCase();
      if (confirmDelete === "S") {
        allUser.splice(index, 1);
        console.log("Usuário deletado com sucesso!");
      } else {
        console.log("Exclusão cancelada.");
      }
    }
    readline.question("\nPressione ENTER para continuar...");
  }

  userUpdate() {
    console.clear();
    this.list();
    const userUpdateID = readline.questionInt(
      "Digite o ID do usuário que deseja modificar: "
    );
    const index = allUser.findIndex((user) => user.id === userUpdateID);

    if (index === -1) {
      console.log("Este usuário não existe.");
      readline.question("\nPressione ENTER para continuar...");
      return;
    }

    const userToUpdate = allUser[index];
    console.log("O usuário a ser modificado:");
    console.log(`ID: ${userToUpdate.id}`);
    console.log(`Nome: ${userToUpdate.name}`);
    console.log(`Nascimento: ${userToUpdate.dateBirth}`);
    console.log("================================\n");

    const userChooseUpdate = readline.questionInt(
      "O que deseja modificar? \n1 - Nome \n2 - Data de Nascimento \n0 - Voltar \nEscolha: "
    );

    let updated = false;
    switch (userChooseUpdate) {
      case 1:
        const newName = readline.question("Digite o novo nome: ");
        if (newName.trim()) {
          userToUpdate.name = newName;
          updated = true;
        }
        break;
      case 2:
        const newDateBirth = readline.question(
          "Digite a nova data de nascimento: "
        );
        if (this.validateDate(newDateBirth)) {
          userToUpdate.dateBirth = newDateBirth;
          updated = true;
        } else {
          console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
          readline.question("\nPressione ENTER para continuar...");
        }
        break;
      case 0:
        console.log("Operação cancelada.");
        break;
      default:
        console.log("Opção não existe.");
        break;
    }

    if (updated) {
      console.clear();
      console.log("Usuário atualizado com sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  validateDate(date) {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateFormat.test(date);
  }
}
