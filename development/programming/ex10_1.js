const frm = document.querySelector("form") //obtem elementos da pagina
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
    e.preventDefault()  //evita envio do form

    const tarefa = frm.inTarefa.value //obtem o conteudo digitado 

    const h5 = document.createElement("h5") //cria elemento HTML h5 
    const texto = document.createTextNode(tarefa)  //cria texto 
    h5.appendChild(texto)   //e que texto sera filho de h5 
    dvQuadro.appendChild(h5)  //e que h5 sera filho de divQuadro

    frm.inTarefa.value = "" //limpa o campo da edição 
    frm.inTarefa.focus() //joga o cursor neste campo 
})
    
    frm.btSelecionar.addEventListener("click", () => {
        const tarefas = document.querySelectorAll("h5") //obtem tags h5 da pagina 

        if (tarefas.length == 0) {
            alert("Não há tarefas para selecionar") //se não há tarefas, exive alerta 
            return // e retorna 
        }

        let aux = -1 //variavel auxiliar para indicar linha selecionada 

        //percorre a lista de elementos h5 inseridos na página, ou seja, tarefas 
        for (let i = 0; i < tarefas.length; i++) {
            //se tag é da class tarefa-selecionada (está selecionada)
            if (tarefas[i].className = "tarefa-selecionada") {
                tarefas[i].className = "tarefa-normal" //troca para normal
                aux = i //muda valor da variavel auxiliar 
                break //sai da repetição 
            }
        }

        //se a linha que está selecionado é a ultima, ira voltar para a primeira 
        if (aux == tarefas.length - 1) {
            aux = -1
        }

        tarefas[aux + 1].className = "tarefa.selecionada" //muda estilo da próxima linha 
    })

        frm.btRetirar.addEventListener("click", () => {
            const tarefas = document.querySelectorAll("h5") //obtem a tags h5 da página 

            let aux = -1 //variavel auxiliar para indicar linha selecionada 

            //percorre a lista das tarefas inseridos na pagina (elementos h5)
            tarefas.forEach((tarefa, i) => {
                if (tarefa.className == "tarefa-selecionada") { //se é da classe tarefa-selecionada 
                    aux = i // muda valor da variavel aux 
                }
            })

            if (aux == -1) { //se não há tarefa selecionada (ou se lista vazia...)
                alert("Selecione uma tarefa para removê-la...")
                return 
            }

            //solicita confirmação (exibindo o conteudo da tag h5 selecionado)
            if (confirm(`Confrima Exclusão de "${tarefas[aux].innerText}"?`)) {
                dvQuadro.removeChild(tarefas[aux]) //renove um dos filhos de divQuadro 
            }
        })

        frm.btGravar.addEventListener("click", () => {
            const tarefas = document.querySelectorAll("h5") //obtem as tags h5 da pagina 

            if (tarefas.length == 0) {
                alert("Não há tarefas para serem salvas") //se não há tarefas, exibe alerta 
                return // retorna 
            }

            let dados = "" //irá "acumular" os dados a serem salvos 
            tarefas.forEach(tarefa => {
                dados += tarefa.innerText + ";"  //acumula conteudo de cada h5
            })

            //grava os dados em localStorage, removendo o ultimo ";"
            localStorage.setItem("tarefasDia", dados.slice(0, -1))

            //confere se dados foram armazenados em localStorage
            if (localStorage.getItem("tarefasDia")) {
                alert("Ok!, Tarefas Salvas")
            }
        })

        window.addEventListener("load", () => {
            //verifica se há tarefas salvas no navegador do usuario 
            if (localStorage.getItem("tarefasDia")) {
                //cria um vetor com a lista de tarefas (separadas pelo split(";"))
                const dados = localStorage.getItem("tarefasDia").split(";")

                //percorre os dados armazenados em localStorage 
                dados.forEach(dado => {
                    const h5 = document.createElement("h5")   //cria o elemento HTML h5 
                    const texto = document.createTextNode(dado) //cria um texto 
                    h5.appendChild(texto) //define que texto será filho de h5 
                    dvQuadro.appendChild(h5) // e que h5 será filho de divQuadro     
                    //classes pai e classe filhos, voltado a camadas de estrutura de código do sistema 
                })
            }
        })
        