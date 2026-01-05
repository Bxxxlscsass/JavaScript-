const prompt = require("prompt-sync")()

const vinhos = []

function titulo(texto) { // recebe, por parametro, o texto a ser exibido original 
    console.log()
    console.log(texto)
    console.log("=".repeat(40))
}
//Programa Principal
do {
    titulo("===< Cadastro de Vinhos >===")
    console.log("1 - Inclusão de Vinhos")
    console.log("2 - Listagem de Vinhos")
    console.log("3 - Pesquisa por Tipo")
    console.log("4 - Media e Destaques")
    console.log("5 - Finalizar")
    const opcao = Number(prompt("Opção: "))
    if (opcao == 1) {
        incluir()
        function incluir() 
        {
            titulo("===< Inclusão de Vinhos >===")

            const marca = prompt("Marca...: ") //lê dados do vinho
            const tipo = prompt("Tipo...: ")
            const preco = Number(prompt("Preço R$: "))
            vinhos.push({marca, tipo, preco}) //insere um objeto no vetor 
            console.log("Ok!, Vinho cadastrado com Sucesso!")
        }

    } else if (opcao == 2) {
        listar()
        function listar()
        {
            titulo("===< Lista de Vinhos Cadastrados >===")
            console.log("Marca...........Tipo.............Preço R$:")

            //percorre o vetor para exibir todos os vinhos 
            for (const vinho of vinhos) {
                console.log(`${vinho.marca.padEnd(20)} ${vinho.tipo.padEnd(20)} ` +
                            `${vinho.preco.toFixed(2).padStart(9)}`)
            }
        }

    } else if (opcao == 3) {
        pesquisar()
        function pesquisar() {
            titulo("====< Pesquisa por Tipo de Vinho >====")

            const pesq = prompt("Tipo: ") //Lê o tipo do vinho a pesquisar 

            let contador = 0 //contador para verificar se existe 
            console.log("Marca..................Tipo...................Preço R$:")

            for (const vinho of vinhos) {
                if (vinho.tipo.toUpperCase().includes(pesq.toUpperCase())) {    
                    console.log(`${vinho.marca.padEnd(20)} ${vinho.tipo.padEnd(20)}` +
                                `${vinho.preco.toFixed(2).padStart(9)}`)
                    contador++  //se entrou no if, incrementa o contador 
                }
            }

            //se percorreu todos os vinhos e contador continua == 0, significa que não há 
            if (contador == 0) {
                console.log(`Obs.: Não há vinhos cadastrados do tipo "${tipo}"`)
            }
        }
    } else if (opcao == 4) {
        calcularMedia()
        function calcularMedia() {
            titulo("===< Média e Destaques do Cadastro de Vinhos >====")

            const num = vinhos.length //obtem numero de elementos do vetor 
            if (num == 0) {
                console.log(`Obs.: Nâo há vinhos cadastrados`)
                return 
            }

            let total = 0 //para acumular o total 
            for (const vinho of vinhos) {
                total += vinho.preco 
            }

            const media = total / num //calcula o preço medio 

            const vinhos2 = [...vinhos] //cria uma copia do vetor original 

            vinhos2.sort((a, b) => a.preco - b.preco) //ordena por preco 

            const menor = vinhos2[0]  //menor preço é o primeiro (posicao 0)
            const maior = vinhos2[num-1] //maoir preço é o ultimo (posição num-1)

            console.log(`Preço Médio dos Vinhos R$: ${media.toFixed(2)}`)
            console.log(`Menor Valor R$: ${menor.preco.toFixed(2)} - ${menor.marca}`)
            console.log(`Maior Valor R$: ${maior.preco.toFixed(2)} - ${maior.marca}`)
        }
    } else {
        break
    }

} while (true)