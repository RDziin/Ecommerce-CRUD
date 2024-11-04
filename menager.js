import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const readline = require('readline-sync');
import { userList } from './user';

export function userManager(){
    userList()
    let deleteChoose = readline.questionInt('Deseja deletar algum usuário? ( Y / N )')
    switch(deleteChoose){
        case y:
        case Y:
            
            break
    }
}