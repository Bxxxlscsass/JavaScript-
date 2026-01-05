//programa que calcula o salario final de um funcionario baseado em seus quadrienios 

const prompt = require("prompt-sync")() //adiciona pacote para entrada de dados 
const salario = Number(prompt("Salario R$: ")) //lê salario
const tempo = Number(prompt("Tempo(anos): "))
const quadrienios = Math.floor(tempo/ 4) //calcula quadriénios
const acrescimo = salario * quadrienios /100 // ...e acrèscimo
console.log(`Quadriênios: ${quadrienios}`) //exibe as respostas
console.log(`Salario Final R$: ${(salario+acrescimo.toFixed(2))}`) //exibe as respostas


