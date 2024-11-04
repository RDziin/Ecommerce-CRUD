import { User } from "./user.js";
import { Product } from "./product.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

let rep = true
const userInstance = new User()
const productInstace = new Product()

function main(){
    do{
        //Tela Inicial 
        /* let userType = readline.questionInt('Você é: \n1 - Usuário \n2 - Administrador \n0 - Sair \nEscolha: ')
        switch(userType){
            case 1:
                console.log('sadfds')
                break
        } */
        console.clear()
        let choose = readline.questionInt("1 - Criar \n2 - Listar \n3 - Deletar \n0 - Sair \nEscolha: ")
    
        switch(choose){
            case 1:
                userInstance.userCreate()
                break
            case 2:
                userInstance.userList()
                break
            case 3:
                userInstance.userDelete()
                break
            case 0:
                console.log("Saindo...")
                rep = false
                break
            default:
                console.log("Opcao Não existente")
                break
        }
    } while(rep)  
}

main()