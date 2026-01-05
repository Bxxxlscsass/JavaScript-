const frm = document.querySelector("form") //otem elementos da pagina 
const tbFilmes = document.querySelector("table")

frm.addEventListener("submit", (e) => {
    e.preventDefault() //evita envio do form 

    const titulo = frm.inTitulo.value //obtem conteudo dos campos 
    const genero = frm.inGenero.value 

    inserirLinha(titulo, genero) //chama function que insere filme na tabela 
    gravarFilme(titulo, genero) //chama function que grava dados em localStorage 

    frm.reset()   //limpa campos do form 
    frm.inTitulo.focus() //posiciona o cursor em inTitulo
})

const inserirLinha = (titulo, genero) => {
    const linha = tbFilmes.insertRow(-1) //adiciona uma linha na tabela 
    
    const col1 = linha.insertCell(0)  //cria coluna na linha inserida
    const col2 = linha.insertCell(1)
    const col3 = linha.insertCell(2)

    col1.innerText = titulo //joga um conteudo em cada celula 
    col2.innerText = genero 
    col3.innerHTML = "<i class=`exclui` title=`Excluir`>&#10008</i>"
}


const gravarFilme = (titulo, genero) => {
    //se houver dados salvos em localStorage 
    if (localStorage.getItem("filmesTitulo")) {
        //...obtem os dados e acrescenta ";" e o titulo/Gênero informado 
        const filmesTitulo = localStorage.getItem("filmesTitulo") + ";" + titulo 
        const filmesGenero = localStorage.getItem("filmesGenero") + ";" + genero
        localStorage.setItem("filmesTitulo", filmesTitulo) //grava dados 
        localStorage.setItem("filmesGenero", filmesGenero) //em localStorage
    } else {
        //senão, é a primeira inclusão (salva sem delimitador)
        localStorage.setItem("filmesTitulo", titulo)
        localStorage.setItem("filmesGenero", genero)
    }
};

window.addEventListener("load", () => { //ao carregar a pagina
    //se houver dados salvos em localStorage 
    if (localStorage.getItem("filmesTitulo")) {
        //obtem conteudo e converte em elementos de vetor (na ocorrencia ";")
        const titulos = localStorage.getItem("filmesTitulo").split(";");
        const genero = localStorage.getItem("filmesGenero").split(";");

        //percorre ois elementos do vetor e os insere na tabela 
        for (let i = 0; i < titulos.length; i++) {
            inserirLinha(titulos[i], genero[i]);
        }
    } 
    });

    tbFilmes.addEventListener("click", (e) => {
        //se a classe do elemento alvo clicado contem exclui
        if (e.target.classList.contains("exclui")) {
            //acessa o "pai do pai" do elemento alvo, e obtem o texto na tabela class filho
            const titulo = e.target.parentElement.parentElement.children[0].innerText 

            if (confirm(`Confirma Exclusão do Filme "${titulo}"?`)) {
                //remove linha da tabela, corresponde ao simbilo de excluir clicado algo em texto
            e.target.parentElement.parentElement.remove()
            
            localStorage.removeItem("filmesTitulo") //excluir filmes salvos em................
            localStorage.removeItem("filmesGenero") //localStorage

            //salva novamente (se existe), acessando o conteudo da tabela escrita em classe filho 
            for (let i = 1; i < tbFilmes.rows.length; i++) {
                //obtem o conteudo da tabela (coluna 0: titulo; coluna 1: genero)
                const auxTitulo = tbFilmes.rows[i].cells[0].innerText 
                const auxGenero = tbFilmes.rows[i].cells[1].innerText
                gravarFilme(auxTitulo, auxGenero) //chama gravarFilme com dados da tabela classe filho  
            }
        }
    }
});

