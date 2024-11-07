import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

import { User } from "./user.js";
import { Product } from "./product.js";
import { Manager } from "./manager.js";

const userInstance = new User();
const productInstance = new Product();
const managerInstance = new Manager();

let rep = true;

function main() {
  do {
    const clientChoose = readline.questionInt(
      "Você é: \n1 - Cliente \n2 - Administrador \n0 - Sair"
    );
    switch (clientChoose) {
    }
  } while (rep);
}

main()