//imprime o nome e o valor de cada propriedade de o. retorna undefined.
function printprops(o) {
    for(var p in o) 
        console.log(p + ": " + o[p] + "\n");
}
//calcula a distância entre pontos cartesianos (x1,y1) e (x2,y2).
function distance(x1,y1,x2,y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}
//uma função recursiva (que chama a si mesmo) que calcula fatoriais
//lembre-se de que x! é o produto de x e todos os inteiros positivos menores do que ele.
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x-1)
}
//este expressão de função define uma função que eleva seu argumento ao quadrado 
//note que atribuimos a uma variavel 
var square = function(x) { return x*x; }

//as expressões de função podem incluir nomes, o que é util para a recursividade 
var f = function fact(x) { if (x <= 1) return 1; else return x*fact(x-1); };

//as expressões de função tambem podem ser usadas como argumentos de outras função 
data.sort(function(a,b) { return a-b; });

//ás vezes as expressões de função são definidas e chamadas imediatamente:
var tensquared = (function(x) { return x*x;}(10));
/*
*/
printprops({x:1});
var total = distance(0,0,2,1) + distance(2,1,3,5);
var probability = factorial(5)/factorial(13);
/*
*/
//define e chama uma função para determinar se estamos no modo restrito 
var strict = (function() { return !this; }());
/*
*/
var calculator = {  //um objeto literal 
    operand: 1,
    operand: 2,
    add: function() {
        //note o uso da palavra-chave this para se referir a esse objeto.
        this.result = this.operand1 + this.operand2
    }
};
calculator.add();   //uma chanada de método para calcular 1+1
calculator.result   //=> 2
/*
*/
var o = {                           //um objeto o.
    m: function() {                 //método m do objeto 
        var self = this;            //salva o valor de this em uma variaveis 
        console.log(this === o);    //imprime "true": this é o objeto o.
        f();                        //agora chama a função auxiliar f().

        function f() {              //uma função aninhada f
            console.log(this === o); //"false": this é global ou undefined 
            console.log(self === o); //"true": self é o valor do this extends 
        }
    }
};
o.m();                               //chama o método m no objeto o.
/*
*/
//anexa os nomes das propriedades enumeraveis do objeto o no 
//array a e retorna a. se a for omitido, cria e retorna um novo array
function getPropertyNames(o, /* opcional */ a) {
    if (a === undefined) a = [];     //se for undefined, usa um novo array 
    for(var property in o) a.push(property);
    return a;
}  

//esta função pode ser chamada com 1 ou 2 argumentos 
var a = getPropertyNames(o);    //obtem as propriedades de o em um novo array
getPropertyNames(p,a);          //anexa as prpriedades de p nesse array 

function f(x, y, z) {
    //primeiramente, verifica se foi passado o número correto de argumentos
    if (arguments.length != 3) {
        throw new Error("function f called with " + arguments.length +
                        "arguments, but it expect 3 arguments.");
    }
    //agora executa a função real.... 
}
/*
*/
function max(/* ... */) {
    var max = Number.NEGATIVE_INFINITY;
    //itera através de argumentos, procurando (e lembrando) o maior.
    for(var i = 0; i < arguments.length; i++)
        if (arhguments[i] > max) max = arguments[i];
    //retorna o maior
    return max;
}

var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); 
/*
*/
function f(x) {      
    console.log(x);      //exibe o valor inicial do argumento 
    arguments[0] = null; //mudar o elemento do array tambem muda x!
    console.log(x);      //agora exibe "null"
}
/*
*/
//lembrado as ondems do argumento 
function flexisum(a) {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
        var element = arguments[i], n;
        if (element == null) continue;  //ignora argumentos null e underfined 
        if (isArray(element))       //se o argumento é um array 
            n = flexisum.apply(this,element);  //calcula sua sima recursivamente 
        else if (typeof element === "function") //ou, se for uma função.....
            n = Number(element());             //chama-a e converte  
        else n = Number(element);              //senão tenta converte-lá 

        if (isNaN(n)) //se não cpnseguimos coverter em um numero, lança um erro 
            throw Error("flexisum(): can't convert" + element + "to number");
        total += n; //caso contrario, adiciona n no total 
    }
    return total;
}

var s = square; //agora se refere a mesma função que square 
square(4); //=> 16
s(4); //=> 16 

var o = {square: function(x) { return x*x; }}; //um objeto literal 
var y = o.square(16);                          //y é igual a 256 
/*
*/
//definimos algumas funções simples real 
function add(x,y) { return x + y; } //funcao de add
function subtract(x,y) { return x - y; }
function multiply(x,y) { return x * y; }
function divide(x,y) { return x / y; }

//aqui está uma função que recebe uma das funções anteriores 
//como argumento e o chama em dois operando 
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}
//poderimos chamar essa função como segue para seguir, para calcularmos o valor (2+3) + (4*5):
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

//para ajudar no exemplo, implementados as função são simples novamente simples 
//desta vez usando funções literais dentro de objeto literal;
var operators = {
    add:        function(x,y) { return x+y; },
    subtract:   function(x,y) { return x-y; },
    multiply:   function(x,y) { return x*y; },
    divide:     function(x,y) { return x/y; },
    pow:        Math.pow      //tambem funciona para funções predefinidas 
};

//esta função recebe nome de um operador, procura esse operador
//no objeto e, então, o chama nos operandos fornecidos. Observe 
//a sintaxe usada para chamar a função operator 
function operate2(operation, operand1, operand2) {
    if (typeof operators[operation] === "function")
        return operators[operation](operand2);
    else throw "unknown operator";
} 
//calcula o valor ("hello" + " " + "world") como segue: isso é um hello de segue
var j = operate2("add", "hello", operate2("add", " ", "world"))
//usando a função predefinida Math.pow():
var k = operate2("pow", 10, 2);

//antes da declaração inicial counter do objeto function 
//as declarações de fuinção são içadas, de modo que podemos 
//fazer esta atribuição e declaração antes da declaração da função 
uniqueInteger.counter = 0;

//esta função retorna um inteiro diferente cada vez que é chamada
//ela usa uma propriedade dela mesma para lembrar o próximo valor a ser retornado 
function uniqueInteger() {
    return uniqueInteger.counter++;  //incrementa e retorna a propriedade counter 
}

//calcula fatorias e coloca os resultados na cache como propriedade da própria função 
function factorial(n) {   //finito, somente ints positivos 
    if (isFinite(n) && n>0 && n==Math.round(n)) { //se não houver resultado na cache 
        if (!(n in factorial))                    //calcula e o coloca na cache 
            factorial[n] = n * factorial(n-1);         //retorna o resultado da cache 
        }
        else return NaN;                         //se a entrada for invalida                         
    }
factorial[1] = 1; //inicializa a cache para conter esse caso binario 
/*
*/
function mymodule() {
    //o código do módulo usada pelo módulo é local a esta função e chama declaração 
    //em vez de congestionar o espaço de nomes global
}
mymodule();      //mas nãoi se esqueça de chamar a função!
/*
*/
(function() {    //função mymodule rescrita como uma expressão não nomeada 
    //o codigo do modulo fica aqui 
}());          //finaliza função literal e a chama agora 

//define uma função extend que copia as propriedades de seu segundo 
//argumento e dos subsequestes em seu primeiro argumento 
//resolvemos um erro do IE aqui: em muitas versões do IE, o laço 
//não numera uma propriedade enumeravel de o, se o prototipo de o tem 
//uma propriedade não numeravel de mesmo nome. isso significa que propriedade 
//como toString não são manipulados corretamente pelo programa, a não ser que as verificamos 
//como toString não são manipulados corretamente, a não ser que as verifique 
//explicitamente
var  extend = (function() {
    //primeiramente, verifica a presença do erro, antes de usar o patch 
    for(var p in{toString:null}) {
        //se chegarmos aqui, então laço for/in funciona corretamente e retornamos 
        //uma versão simples da função extend()
        return function extend(o) {
            for(var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for(var prop in source) o[prop] = source[prop];
            }
            return o;
        };
    }
    //se chegamos até aqui, isso significa que o laço for/in nãi numerou 
    //a propriedade toString do objeto de teste. portanbto, retorna uma versão 
    //da função extend() <= que testa explicidamente as porpriedade 
    //não enumeraveis de Object.prototype 
    
    //e agora verifica as propriedades de caso especial aqui 
    for( var j = 0; j < protoprops.length; j++) {
        prop = protoprops[j];
        if (source.hasOwnProperty(prop)) o[prop] = source[prop];
    return function patched_extend(o) {
        for(var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            //copia todas as propriedades enumeraveis 
            for(var prop in source) o[prop] = source[prop];
            }
        }
        return o;
    };
    //esta é a lista de propriedade do caso especial que verificamos 
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
                      "isPrototypeOf", "propertyIsenumerable", "toLocaleString"];
}());


