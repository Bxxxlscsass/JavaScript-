<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>javascript loan Calculator</title>
    <style> /* Está é uma folha de pagamento de estilo CSS: ela diciona estilo de saida do programa com a função da linguagem*/
    .output { font-weight: bold; }  /* valores calculados em negrito */
    #payment { text-decoration: underline; } /* O grafico elemento com id"payment"*/ 
    #graph { border: solid black 1px; } /*o grafico tem borda simples */ 
    th, td { vertical-align: top; } /* não centraliza celulas de tabela */
    </style>
    </head>
    <body>
    <!-- 
        Está é uma tabela HTML como elementos <input> que permitem ao usuario inserir dados e 
        elementos <span> nos quais o porgrama pode exibir seus resultados. esses elementos tem 
        javascript que vem após a tabela. Note que alguns dos elementos de entrada definem 
        rotinas de tratamento de evento "onchage" ou "onclick". Elas especificam strings de 
        código JavaScript a ser executado quando o usuário insere dados ou á um clique.
        -->
    <table>
            <tr><th>Enter Loan Data:</th>
                <td></td>
                <th>Loan Balance, Cumulative Equity, and Interest Payments</th></tr>
                <tr><td>Amount of the loan($):</td>
                    <td><input id="amount" onchange="calculate();"></td>
                    <td rowspan="8">
                        <canvas id = "graph" width="400" height="300"></canvas></td></tr>
                    <tr><td>Annual interest (%):</td>
                        <td><input id="apr" onchange="calculate();"></td></tr>
                    <tr><td>Repayment period (years):</td>
                        <td><input id="years" onchange="calculate();"></td></tr>
                    <tr><td>Zipcode (to find lenders):</td>
                        <td><input id="zipcode" onchange="calculate();"></td></tr>
                    <tr><td>Approximate monthly payment:</td>
                        <td><button onclick="calculate();">Calculate</button></td></tr>
                    <tr><td>Monthly payment:</td>
                        <td>$<span class="output" id="payment"></span></td></tr>
                    <tr><td>Total payment:</td>
                        <td>$<span class="output" id="total"></span></td></tr>
                    <tr><td>Total interest:</td>
                        <td>$<span class="output" id="interest"></span></td></tr>
                    <tr><th>Sponsors:</th></td colspan=2>
                        Apply for your loan with one of these fine lenders:
                        <div id="lenders"></div></td></tr>
            </table>
            <!-- o restante do codigo a cima ficaria em javascript porgrama da funcao na marca a seguir -->
            <!-- Normalmente, este script ficaria na marca <head> do documento acima, mas -->
            <!-- é mais facil entede-lo aqui, depois de ter visto seu contexto em HTML-->
            <script>
                "use strict"; //uso modo restrito da ECMAScript 5 nos navegadores que suportam 
                /* Esta script define a função calculate() chamada pelas rotinas de tratamento de evento 
                *no código HTML acima. A função lé valores de elemntos <input>, calcula 
                * as informações de pagamento de emprestimo da folha, exibe o resultado em elementos <span>,
                * tambem salva os dados do usuario, exibe as liks para financeiras e desenha um grafico 
                */
               function calculate() {
                var amount = document.getElementById("amount");
                var apr = document.getElementById("apr");
                var years = document.getElementById("years");
                var zipcode = document.getElementById("zipcode");
                var payment = document.getElementById("payment");
                var total = document.getElementById("total");
                var Totalinterest = document.getElementById("interest");

                //obtem a entrada do usuario atraves dos elementos de entrada na função. Presure que tudo isso 
                //é valido e converte os valores 
                //converte os juros de porcentagem para decimais e converte de taxa 
                //anual para taxa mensal. converte o perido de pagemento de anos 
                //para o numero de pagamento mensais 
                var principal = parseFloat(amount.value);
                var interest = parseFloat(apr.value) / 100 / 12;
                var Payments = parseFloat(years.value) * 12;

                //agora calcula o valor do pagemento mensal 
                var x = Math.pow(1 + interest, Payments); //math.pow(), calcula potencias de numeros 
                var monthly = (principal *x*interest)/(x-1); 

                //se o resultado é ium numero finito, a entrada do usuario estava correta e 
                //temos o resultado signiificativo para exibir a função na tabela calculada 
                if (isFinite(monthly)) {
                    //preenche os ecampos da saida, arredondando para 2 casas decimais na folha do grafico 
                    payment.innerHTML = monthly.toFixed(2);
                    total.innerHTML = (monthly * Payments).toFixed(2);
                    Totalinterest.innerHTML = ((monthly * Payments) - principal).toFixed(2);
                    //Então salva a entrada do usuario para que possamos recupera-la na proxima vez que 
                    //ele for visto na função
                    save(amount.value, apr.value, years.value, zipcode.value);
                    //Anuncie: localiza e exibe financeiras locais, mas ignora erros de rede da função 
                    try { //captura quaisyuqer erros que ocorreem dentro destas chaves
                        getLenders(amount.value, years.value, zipcode.value);
                    } 
                    catch(e) { /* E ignorado erros falta a função */}
                    //Por fim, traça o grafico de saldo devedorm dos juros e dos pagamentos do capital 
                    chart(principal, interest, monthly, Payments);
                }
                else {
                    //o resultado foi Not-a-Number ou infinito, o que significa que a entrada 
                    //estava incompleta ou era invalida. Apaga qualquer saida exibida anteriomente
                    payment.innerHTML = ""; //apaga o conteudo do elemento usuario 
                    total.innerHTML = ""
                    Totalinterest.innerHTML = ""; 
                    chart(); //sem argumentos, apaga o grafico da função 
                    }
               }
               //salva a entrada do usuario como propriedade do objeto localStorage. Essas
               //propriedades ainda existirão quando o usuario visitar no futuro 
               //esse recurso de armazenamento não vai funcionar em alguns navegadores pois erro falta a função em alguns (firefox,
               //por exemplo), se voçê execuar o exemplo a partir de um arquivo local: //URL. Contudo,
               //funciona com HTTP
                function save(amount, apr, yeras, zipcode) {
                    if (window.localStorage) { //Só faz isso se o navegador suporta 
                        localStorage.loan_amount = amount;
                        localStorage.loan_apr = apr;
                        localStorage.loan_years = years;
                        localStorage.loan_zipcode = zipcode;
                    }
                }
                //tenta restaurar os campos de entrada automaticamente quando o documento é carregado 
                //pela primeira vez 
                window.onload = function() {
                    //se o navegador suporta localStorege e temos alguns dados armazenados 
                    if (window.localStorage && localStorage.loan_amount) {
                        document.getElementById("amount").value = localStorage.loan_amount;
                        document.getElementById("apr").value = localStorage.loan_apr;
                        document.getElementById("years").value = localStorage.loan_years;
                        document.getElementById("zipcode").value = localStorage.loan_zipcode;
                    }
                };

                //Passa a entrada do usuario para um script no lado do servidor que (teoricamente) pode 
                //retornar 
                //uma lista de links para financeiras locais interessadas em fazer emprestimos. Este 
                //exeplo não contem uma implementação real desse serviço de busca de financeiras. Mas 
                //se o serviço existisse, essa função funcionaria com ele, mais não é todos os servidores que a função funciona   
                function getLenders(amount, apr, years, zipcode) {
                    //se o navegador não suporta objeto XMLHtpRequest, não faz nada
                    if (!windows.XMLHttpRequest) return;
                    //localize o elemento para exibir as listas de financiamento 
                    var ad = document.getElementById("lenders");
                    if (!ad) return; //encerra se não há ponto de saida 
                    //codifica a entrada do usuario com parametros de consulta em um URL 
                    var url = "getLenders.php" +   //url do serviço mais 
                        "?amt="+ encodeURIComponent(amount)+ //dados do usuario na string função
                                                         //de consulta 
                        "&apr=" + encodeURIComponent(apr)+      
                        "&yrs=" + encodeURIComponent(years)+      
                        "&zip=" + encodeURIComponent(zipcode);
                    //busca o conteudo desse URl usando objeto XMLHttpResquest
                    var req = new XMLHttpRequest(); //Inicia um novo pedido 
                    req.open("GET", url);  //Um pedido GET da HTTp para o url 
                    req.send(null);  //envia um pedido sem corpo 

                    //Antes de retorna, registra uma função de rotina de tratamento de evento que será
                    //chamada de um momento posterior, qunado a resposta de servidor HTTP chegar.
                    //Esse tipo de programação assincrona é muito comum em javaScript do lado de 
                    //cliente 
                    req.onreadyStatechange == function() {
                        if (req.readyState == 4 && req.status == 200) {
                            //se chegamos até aqui, obtivemos uma resposta HTTp como string 
                            var response = req.respondeText; //resposta Http como string 
                            var lenders = JSON.parse(response); //analisa o array JS 

                            //converte o array do objetos lender em uma string HTML 
                            var list = "";
                            for(var i = 0; i < lenders.length; i++) {
                                list += "<li><a href='" + lenders[i].url + "'>" +
                                    lenders[i].name + "</a>";
                            }
                            //exibe o código HTML no elemnto acima.
                            ad.innerHTML = "<ul>" + list + "</ul>";
                        }
                }
        }
        
        //interest agora faz o saldo do devedor mensal, dos juros e do capital em um elento <canvas> 
        //da HTML.
        //se for chamado sem argumentos, função apagar qualquer grafico desenhado anteriomente armazenado 
        function chart(principal, interest, monthly, payments) {
            var graph = Document.getElementById("graph") //obtem a marca <canvas> para programar a imagem no grafico do navegador
            graph.widht = graph.widht; //magica para apagar e redefinir o elemento 
            //canvas caso não supuporta no navegador erro de função
            
            //se chamamos sem argumentos ou se esse navegador não suporta 
            //elementos graficos em um elemento <canvas> que define a API de desenho 
                var g = graph.getContent("2d"); //todo desenho feito com esse objeto 
                var width = graph.widht, height = graph.height; //obtem o tamanho da tela de desenho da função 

            //essa funções convertem numeros de pagamento e valores monetarios em pixels
            function paymentToX(n) { return n * width/payments; }
            function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}
            
            //os pagamentos são uma linha reta de (0,0) a (payments,monthly*payments)
            g.moveTo(paymentToX(0), amountToy(0));  //começa no canto inferior esquerdo, função apagar grafico 
            g.lineTo(paymentToX(payments), //desenha até o canto superior direito 
                                amountToY(paments), amountToY(0));   //Para baixo bem lá no fundo, até o canto 
                                //inferior direito 
            g.closePath(); //volta para o inicio 
            g.fillStyle = "#f88"; //vermelho-claro<
            g.fill(); //preeche o triângulo
            g.font = "bold 12px sans-serif";   //define uma fonte 
            g.fillText("Total interest Payments", 20, 20); //desenha texto na legenda 
            
            //O capital acumulado não é linear e é mais complicado de representar no grafico 
            var equity = 0;
            g.beginPath();  //inicia uma nova figura 
            g.moveTo(paymentToX(0))   //começa com um canto inferior 
            g.moveTo(paymentToX(0), amountToY(0));  //esquerdo

            for(var p = 1; p <= payments; p++) {
                //Para cada pagemento, descobre quanto é o juro 
                var thisMonthsInterest = (principal.equity)*interest;  //o resto vai para capital  
                equity+= (monthly - thisMonthsInterest); //linha aponta para este ponto da funcão x and y 
                g.lineTo(paymentToX(p),amountToY(equity));
            }
            g.lineTo(paymentToX(payments), amountToY(0));  //Linha de volta para o eixo X 
            g.closePath(); //e volta para o ponto inicial 
            g.fillstyle = "green";  //Agora usa tinta verde 
            g.fill(); //E preenche a area sob a curva
            g.filltext("Total Equity", 20,35);  //rotula em verde

            //Faz laço novamente, como acima, mas respresenta o saldo devedor como uma linha 
            //preta grossa no grafico 
            var bal = principal;
            g.beginPath();
            g.moveTo(paymentToX(0),amountToY(bal));
            for(var p = 1; p <= Payment; p++) {
                var thisMonthsInterest = bal*interest;
                bal -= (monthly - thisMonthsInterest); //o resto vai para o capital 
                g.lineTo(paymentToX(p), amountToY(bal)); //desenha a linha do ponto 
            }
            g.lineWidth =3;   //usa a linha grossa
            g.stroke(); //desenha a curva do saldo 
            g.fillStyle = "black";  //troca o texto preto 
            g.fillText("Loan Balance", 20,50);  //entrada de legenda 

            //agora faz marcações anuais e os numeros de ano do eixo X 
            g.textAlign="center";   //centraliza o texto nas marcas 
            var y = amountToY(0);   //coordenada Y do eixo X 
            for(var year=1; year*12 <= payments; years++) {  //para cada ano 
                var x =paymentToX(year*12);   //calcula a posição da marca
                g.fillRect(x-0.5,y-3,1,3);  //desenha a marca
                if (year == 1) g.fillText("Year", x ,y-5); //rotula o eixo  
                if (year % 5 == 0 && year*12 !== payments)
                g.fillText(String(year), x, y-5);
            }

            //marca valores de pagamento ao longo da margem direita 
            g.textAlign = "right"; //alinha o texto á direita 
            g.textBaseline = "middle";  //centralizada verticamente 
            var ticks = [monthly*payments, principal]; //os dois pontos que marcaremos 
            var rightEdge = paymentToX(payments); //coordenada x do eixo y 
            for(var i = 0; i < ticks.length; i++) {//para cada um dos 2 pontos 
                var y = amountToY(ticks[i]); //calcula a posição Y da marca 
                g.fillText(String(ticks[i].toFixed(0)),
                        rightEdge-5, y);
            }   
        }    
        </script>
</body>
</html>

