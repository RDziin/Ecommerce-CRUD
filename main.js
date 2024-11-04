import { userCreate } from "./user.js";
import { userList } from "./user.js";
import { userDelete } from "./user.js";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const readline = require('readline-sync');

let rep = true

do{
    console.clear()
    let opt = readline.questionInt('1 - Criar \n2 - Listar \n3 - Deletar \n0 - Sair \nEscolha: ')

    switch(opt){
        case 1:
            userCreate()
            break
        case 2:
            userList()
            break
        case 3:
            userDelete()
            break
        case 0:
            console.log('Saindo...')
            rep = false
            break
        default:
            console.log('Opcao Não existente')
            break
    }
} while(rep)