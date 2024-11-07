export function codeGenerator(tamanho) {
  let caracter =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";

  for (let i = 0; i < tamanho; i++){
    codigo += caracter.charAt(Math.floor(Math.random() * caracter.length));
  }
  
  return codigo;
}
