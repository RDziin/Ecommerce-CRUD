import { idCreatorUser } from "./idCreator.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

export let allUser = [];
let currentUser = null;

export class User {
  constructor(id, name, password, dateBirth) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.dateBirth = dateBirth;
  }

  userCreate() {
    console.clear();
    let userID = idCreatorUser();
    let userName = readline.question("Nome: ");
    let userPassword = readline.question("Senha: ", { hideEchoBack: true });
    let userConfirmePass = readline.question("Confirmar senha: ", {
      hideEchoBack: true,
    });
    let userDateBirth = readline.question("Nascimento (DD/MM/AAAA): ");

    if (userConfirmePass !== userPassword) {
      console.clear();
      console.log("Confirmacao de senha incorreta.");
      readline.question("Pressione ENTER para tentar novamente...");
      return this.userCreate();
    }

    if (!this.validateDate(userDateBirth)) {
      console.clear();
      console.log("Data de nascimento invalida. Use o formato DD/MM/AAAA.");
      readline.question("Pressione ENTER para tentar novamente...");
      return this.userCreate();
    }
  
    const userExists = allUser.some((user) => user.name === userName);
    if (userExists) {
      console.log("Este usuario ja existe!");
      readline.question("Pressione ENTER para continuar...");
      return;
    }

    const newUser = new User(userID, userName, userPassword, userDateBirth);
    allUser.push(newUser);
    console.clear();
    console.log("Usuario criado com sucesso!");
    readline.question("\nPressione ENTER para continuar...");
  }

  userLogin() {
    console.clear();
    let loginName = readline.question("Login: ");
    let loginPassword = readline.question("Senha: ", { hideEchoBack: true });

    const loginUser = allUser.find(
      (u) => u.name === loginName && u.password === loginPassword
    );

    if (loginUser) {
      console.clear();
      console.log("Login efetuado com sucesso!");
      currentUser = loginUser;
      readline.question("\nPressione ENTER para continuar...");
      return true;
    } else {
      console.clear();
      console.log("Nome de usuario ou senha incorretos.");
      readline.question("\nPressione ENTER para tentar novamente...");
      return false;
    }
  }

  list() {
    if (allUser.length === 0) {
      console.clear();
      console.log("Nenhum usuario cadastrado.");
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
      console.log("Usuario nao existe.");
    } else {
      const userToDelete = allUser[index];
      console.log("O usuario a ser deletado:");
      console.log(`ID: ${userToDelete.id}`);
      console.log(`Nome: ${userToDelete.name}`);
      console.log(`Nascimento: ${userToDelete.dateBirth}`);
      console.log("================================\n");

      const confirmDelete = readline
        .question("Confirmar exclusao? (S/N): ")
        .toUpperCase();
      if (confirmDelete === "S") {
        console.clear();
        allUser.splice(index, 1);
        console.log("Usuario deletado com sucesso!");
      } else {
        console.log("Exclusao cancelada.");
      }
    }
    readline.question("\nPressione ENTER para continuar...");
  }

  userUpdate() {
    console.clear();
    this.list();
    const userUpdateID = readline.questionInt(
      "Digite o ID do usuario que deseja modificar: "
    );
    const index = allUser.findIndex((user) => user.id === userUpdateID);

    if (index === -1) {
      console.clear();
      console.log("Este usuario nao existe.");
      readline.question("\nPressione ENTER para continuar...");
      return;
    }

    const userToUpdate = allUser[index];
    console.log("O usuario a ser modificado:");
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
        console.clear();
        const newName = readline.question("Digite o novo nome: ");
        if (newName.trim()) {
          userToUpdate.name = newName;
          updated = true;
        }
        break;
      case 2:
        console.clear();
        const newDateBirth = readline.question(
          "Digite a nova data de nascimento: "
        );
        if (this.validateDate(newDateBirth)) {
          userToUpdate.dateBirth = newDateBirth;
          updated = true;
        } else {
          console.clear();
          console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
          readline.question("\nPressione ENTER para continuar...");
        }
        break;
      case 0:
        console.clear();
        console.log("Operaçao cancelada.");
        break;
      default:
        console.clear();
        console.log("Opçao nao existe.");
        break;
    }

    if (updated) {
      console.clear();
      console.log("Usuário atualizado com sucesso!");
      readline.question("\nPressione ENTER para continuar...");
    }
  }

  userEditOwnProfile() {
    console.clear();
    if (!currentUser) {
      console.log("É necessário fazer login para editar o perfil.");
      readline.question("\nPressione ENTER para continuar...");
      return;
    }

    console.clear();
    console.log("O seu perfil:");
    console.log(`ID: ${currentUser.id}`);
    console.log(`Nome: ${currentUser.name}`);
    console.log(`Nascimento: ${currentUser.dateBirth}`);
    console.log("================================\n");

    const userChooseUpdate = readline.questionInt(
      "O que deseja modificar? \n1 - Nome \n2 - Data de Nascimento \n3 - Senha \n0 - Voltar \nEscolha: "
    );

    let updated = false;
    switch (userChooseUpdate) {
      case 1:
        console.clear();
        const newName = readline.question("Digite o novo nome: ");
        if (newName.trim()) {
          currentUser.name = newName;
          updated = true;
        }
        break;
      case 2:
        console.clear();
        const newDateBirth = readline.question(
          "Digite a nova data de nascimento (DD/MM/AAAA): "
        );
        if (this.validateDate(newDateBirth)) {
          currentUser.dateBirth = newDateBirth;
          updated = true;
        } else {
          console.clear();
          console.log("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
          readline.question("\nPressione ENTER para continuar...");
        }
        break;
      case 3:
        console.clear();
        const oldPassword = readline.question("Digite sua senha atual: ", {
          hideEchoBack: true,
        });
        if (oldPassword === currentUser.password) {
          console.clear();
          const newPassword = readline.question("Digite a nova senha: ", {
            hideEchoBack: true,
          });
          const confirmNewPassword = readline.question(
            "Confirme a nova senha: ",
            {
              hideEchoBack: true,
            }
          );
          if (newPassword === confirmNewPassword) {
            currentUser.password = newPassword;
            updated = true;
          } else {
            console.clear();
            console.log("As senhas nao coincidem.");
          }
        } else {
          console.log("Senha atual incorreta.");
        }
        break;
      case 0:
        console.clear();
        console.log("Operaçao cancelada.");

        break;
      default:
        console.clear();
        console.log("Opçao nao existe.");

        break;
    }

    if (updated) {
      console.clear();
      console.log("Perfil atualizado com sucesso!");
    }
  }

  validateDate(date) {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateFormat.test(date);
  }
} 
