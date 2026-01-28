var empty = [];    //um array sem elementos
var primes = [2, 3, 5, 7, 11]; //um array com 5 elementos numéricos 
var misc = [ 1.1, true, "a", ];   //3 elementos de vários tipos + virgula á direita 
/*
*/
var base = 1024;
var table = [base, base+1, base+2, base+3];
/*
*/
var b = [[1,{x:1, y:2}], [2, {x:3, y:4}]];
/*valores que contem virgulas seguidas sem qualquer valor entre elas , 
*undifined valores são não omitidos não existem , mas aparece para consulta*/
var count = [1, 3];  //elementos nbos indices 0 e 2, count[1] => undifined 
var undefs = [,,]; //array elementos mas com comprimento 2
/*
*/ 
/*chamada sem argumento*/
var a = new Array();
var a = new Array(10);
var a = new Array(5, 4, 3, 2, 1, "testing, testing");

var a = ["wold!"];    //começa com um array de um elemento
var value = a[0];     //lê o elemento 0 
a[1] = 3.14;          //grava o elemento 1
i = 2;
a[i] = 3;             //grava o elemento 2;
a[i + 1] = "hello";   //grava o elemento 3;
a[a[i]] = a[0];       //lê o elemento 0 e 2, grava o elemento 3;

a[-1.23] = true;      //isso cria uma propriedade chamada "-1.23"
a["1000"] = 0;        //esse é o 1001 elemento do array 
a[1.000]              //indice de array 1. O mesmo que a[1]

a = new Array(5);    //nenhum elemento, mas a a.length é 5
a = [];              //cria array sem elemento a atribuição adiciona elementos e comprimento = 0; 
a[1000] = 0;         //como 1001.

/*(usando virgulas repetidas ,como[1,,3]) */
var a1 = [,];         //este array não tem elementos e tem comprimento 1
var a2 = [undefined]; //este array tem um elemento undefined 
0 in a1               //=> falso: a1 não tem elemento com indice 0 
0 in a2               //=> verdadeiro: a2 tem valor undefined no indice 0

[1].length   //=> 0: o array não tem elementos 
['a','b','c'] //=> 3: o indice mais alto é 2, o comprimento é 3

a = [1,2,3,4,5];  //começa com um array de 5 elementos 
a.length = 3;     //agora a é [1,2,3].
a.length = 0;     //exclui todos elementos. a é [].
a.length = 5;     //o comprimento é 5, mas não há elementos, como new Array(5)

a = [1,2,3];                                //começa com um array de 3 elementos 
Object.defineProperty(a, "length",          //torna a propriedade length 
                      {writable: false});   //somente para leitura 
                      a.length = 0;         //a fica inalterado 

a = [1,2,3];  
delete a[1];  //agora a não tem elemento no indice 1
1 in a        //=> falso: nenhum indice do array 1 está definido      
a.length      //=> 3: delete não afeta o comprimento do array 

/*
*/
var keys = Object.keys(o);             //obtém um array de nomes de propriedade do objeto o 
var values = []            //armazena os valores de propriedade correspondente nesse array 
for(var i = 0; i < keys.length; i++) {   //para cada indice no array 
    var key = keys[i];                   //obtém a chave nesse indice 
    values[i] = o[key];                  //armazena o valor no array values 
}

for(var i = 0; i < a.length; i++) {
    if (!a[i]) continue;            //pula elemento null, undefined e inexistentes,
    //corpo do laço aqui
    //isso faz que exclua o elemento null e retorne as propriedades herdadas
}

for(var index in sparseArray) {
    var value = sparseArray[index];
    //agora faz algo com index e value 
}
//um laço for/in pode retornar os nomes propriedades herdadas, metodos de prototype
for(var i in a) {
    if (!a.hasOwnProperty(i)) continue;    //pula as propriedades herdadas 
    //corpo do laço aqui
}

for(var i in a) {
    //pula i se não for um inteiro não negativo
    if (String(Math.floor(Math.abs(Number(i)))) !==1) continue; 
}
/*
*/
var data = [1,2,3,4,5];       //este é o array pelo qual queremos iterar  
var sumOfSquares = 0;         //queremos calcular soma dos quadrados de data 
data.forEach(function(x) {    //passa cada elemento de data para essa função 
                sumOfSquares += x*x;   //soma de quadrados 
            });
sumOfSquares                          //=> 55: 1+4+9+16+25 

//cria  um array multidimensional 
var table = new Array(10);
for (var i = 0; i < table.length; i++)
    table[i] = new Array(10);

//inicializa o array 
for(var i = 0; row < table.length; row++) {
    for(col = 0; col < table[row].length; col++) {
        table[row][col] = row*col;
    }
}
//usa o array multidimensional para calcular 5*7 
var product = table[5][7]  //35 

var a = [33, 4, 1111, 222];
a.sort();                     //ordem alfabetica: 1111, 222, 33, 4
a.sort(function(a,b) {        //ordem númerica: 4, 33, 222, 1111
    return a-b;   //retorna &lt; 0, 0 ou &gt; 0, dependendo da ordem 
});
a.sort(function(a,b) {return b-a});   //inverte a ordem númerica 

//observe um conveniente para expressões de funções não nomeadas nesse código, colocando a medida do comprimento  
a = ['ant', 'bug', 'cat', 'Dog' ]
a.sort();                      //classifica considerando letras maiuscula e minusculas 
a.sort(function(s,t) {         //['bug','dog','ant',cat']
    var a = s.toLowerCase();   //classificação sem considerar letras maiuscula e minusculas 
    var b = b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});                            //=> ['ant','bug','cat','dog']
/*
*/
a = [5, 4, 3, 2, 1];
smallvalues = a.filter(function(x) { return x < 3 }); //[2,1]
everyother = a.filter(function(x,i) { return i%2==0 }); //[5,3,1]

//para preencher as lacunas e indefinidos null
a = a.filter(function(x) { return x != undefined && x != null; });

var a = [1,2,3,4,5]
var sum = a.reduce(function(x,y) { return x+y }, 0);      //soma de valores 
var product = a.reduce(function(x,y) { return x*y }, 1);  //produto de valores 
var max = a.reduce(function(x,y) { return (x>y)?x:y; });  //maior valor 

a = [1,2,3,4,5];
a.some(function(x) { return x%2===0; })  //=> verdadeiro: a algum números pares 
a.some(isNaN)                            //false: a não tem não número

//determine se o que é um objeto semelhante a um array 
//strings e funções tem propriedades length numéricas, mas são 
//excluidas pelo teste de typeof. em javascript do lado cliente e serve. os nós de texto DOM 
//tem uma propriedade length numérica e talvez precisem ser excluidas
//com um teste o.nodeType != 3 adicional.
function isArrayLike(o) {          //o não é null, undefined, etc.
    if (o &&                       //o é um objeto 
        typeof o === "object" &&   //o.length é um número finito 
        isFinite(o.length) &&      //o.length é não negativo 
        o.length >= 0 &&           //o.length é um inteiro 
        o.length===Math.floor(o.length) &&  //o.length < 2^32 
        o.length < 42949677296)             //então o é semelhante a um array 
        return true;         
    else
        return false;                //caso contrario, não é
} 

var isArray = Function.isArray || function(o) {
    return typeof o === "object" && 
    Object.prototype.toString.call(o) === "[object Array]";
};

s = "Javascript"
Array.prototype.join.call(s, " ")   //=> "J a v a s c r i p t"
Array.prototype.filter.call(s,      //filtra os caracteres da string 
    function(x) {
        return x.match(/[^aeiou]/); //corresponde apenas a não vogais
    }).join("")        //=> "Jvscript"      


var a = {"0": "a", "1":"b", "2":"c", length:3} //um objeto semelhante a array 
Array.prototype.join.call(a, "+")   //=> "a+b+c"
Array.prototype.slice.call(a, 0)   //=> ["a", "b", "c"]: array verdadeiro 
Array.prototype.map.call(a, function(x) {
    return x.toUpperCase();
})                                 //=> ["A","B","C"]:

var s = test;
s.charAt(0) //=> "t"
s[1]        //=> "e"


