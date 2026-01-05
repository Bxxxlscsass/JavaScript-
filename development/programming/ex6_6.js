const prompt = require ("prompt-sync")()
console.log("Informe o valor dos saques ou 0 para sair!")
const saques = [] //declarar vetor 
do {
    const valor = Number(prompt("Saque R$: ")) //lê valor 
    if (valor == 0) {     //antes ler a nota, verifica
        break //sai de repetição 
    }
    saques.push(valor) //adiciona objeto vetor
    if (valor % 10 == 0) {
        console.log("saque realizado com Sucesso!...") 
    } else {
        console.log("erro... Valor Invalido (deve ser multiplica por 10!)") 
    }
} while(true)
    console.log("\nSaques Válidos")     // \n no inicio gera uma nova linha
    console.log("-".repeat(40))  //exibe 40 
    const saquesValidos = saques.filter(saque => saque % 10 == 0)
    for (const saque of saquesValidos) {
        console.log(saque.toFixed(2))
    }
    console.log("-".repeat(40)) 
    const totalSacado = saquesValidos.reduce((total, saque) => total + saque, 0)
    console.log(`Total de Saques: R$ ${totalSacado.toFixed(2)}`)

    const saquesInvalidos = saques.length - saquesValidos.length
    console.log(`\nN de tentativas de Saques (saques Invalidos): ${saquesInvalidos}`)

