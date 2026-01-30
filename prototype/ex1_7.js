//esse objeto construtora recem criado 
//função construtora em javascript em vez de função fabrica 
//a classe representando um intervalo de valores 

//esta função construtora que inicilaliza novos objetos range em java
//note que ela não cria nem retorna o objeto. ele apenas inicializa this.
function Range(from, to) {
    //armazena os pontos inicial e final (estado) desse novo objeto range.
    //essas são propriedades não herdadas exclusivas desse objeto
    this.from = from;
    this.to = to; 
} 

//todos os objetos range herdam desse objeto 
//note que o nome de propriedade deve ser "prototype" para que isso funcione 
Range.prototype = {
    //retorne true se x está no intervalo; caso contrario, false 
    //este metodo funciona tanto para intervalos textuais e date como para numéricos 
    includes: function(x) { return this.from ,+ x && x <= this.to; },
    //chama f uma vez para cada inteiro no intervalo 
    //este método funciona tanto para intervalos numericos 
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    //retorna uma representação de string do intervalo 
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

/*
*/
//aqui estão exemplos de uso de um objeto range 
var r = new Range(1,3);    //cria o objeto range
r.includes(2);             //=> verdadeiro: 2 esta no intervalo 
r.foreach(console.log);    // imprime 1 2 3 
console.log(r);            //imprime (1...3)
/*
*/
r instanceof Range // retorna true se r herda de Range.prototype, coloca a ferramenta prototype sobre o capo de AI
/*
*/
var F = function() {};  //este objeto função 
var p = F.prototype;  //este é o objeto prototipo associado a ele
var c = p.constructor;  //este é a função associada ao prototipo em javascript 
c === F                 //=> verdadeiro: F.prototype.constructor === F para qualquer função 

var o = new F();   //cria um objeto o da classe F 
o.constructor === F //=> verdadeiro: a porpriedade constructor especifica a classe

Range.prototype = {
    constructor: Range, //define explicitamente a referencia de volta para a construção em java 
    includes: function(x) { return this.from <= x && x <= this.to; },
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
        },
        toString: function() { return "(" + this.from + "..." + this.to + ")" ; }
};
/*
*/
//observe esse novo objeto prototipo usa as propriedades construtor predefinido 
//as intâncias de Range, coforme definido, não tem uma propriedade constructor 
//resolve esse porblema adicionando uma construção em prototipo  
//este objeto Range.prototype predefinido para não sobrescrevamos
//a propriedade Range.prototype.constructor cria automaticamente.
Range.prototype.includes = function(x) { return this.from<=x && x<=this.to; }; 
Range.prototype.foreach = function(f) {
    for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
};
Range.prototype.toString = function() {
    return "(" + this.from + "..." + this.to + ")";
};

//uma função simples para definir a classes simples 
function defineClass(constructor, //uma função que configura propriedades de instância
                    methods,      //metodos de instancias: copiados para o prototipo 
                    statics)      //propriedades de classe: copiadas para a construtora 
{
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}
//está é uma variante simples de nossa classe Range 
var SimplesRange = 
    defineClass(function(f,t) { this.f = f; this.t = t; },
                {
                    includes: function(x) { return this.f <= x && x <= this.t;},
                    toString: function() { return this.f + "..." + this.t; }
                },
                { upto: function(t) { return new SimplesRange(0, t); } });
/*
*Complex.js
*este arquivo define uma classe complex para representar números complexos 
*lembre-se de que um numero complexo é a soma de um número real e um 
*número imaginario e de que o número imaginario i é a raiz quadrada de -1
*/
/*
*esta fução construtora defiune os campos de instacia r e i em cada
*instancia que cria. esses campos contêm as partes real e imaginaria 
*do numero complexo: eles são o estado do objeto depois add 
*/
function Complex(real, imaginary) {         
    if(isNaN(real) || isNaN(imaginary))        //certifica-se de que os dois args são numeros
        throw new TypeError();                 //lança um erro se não forem
    this.r = real;                             //a parte real do numero complexo
    this.i = imaginary;                        //a parte imaginaria do número 
}
/*
*os métodos de instancia de uma classe são definidos como propriedades com valor de 
*funcoes do objeto prototipo. Os metodos definidos aaqui são herdados por todas
*as instancias e fornecem o comportamento compartilhado da classe. Note que os 
*metodos de instancia de Javascript devem usar a palavra-chave this para acessar os 
*campos de instância
*/

//adiciona o número complexo em this e retorna a soma em um novo objeto 
Complex.prototype.add = function(that) {
    return new Complex(this.r + that.r, this.i + that.i);
};
//multiplica esse número complexo por outro e retorne o produto 
Complex.prototype.mul = function(that) {
    return new Complex(this.r * that.r - this.i * that.i,
                       this.r * that.i + this.i * that.r);
};

//retorna a magnitude de um número complexo. isso é definido 
//como sua distância em relação á origem (0,0) do plano complexo 
Complex.prototype.mag = function() {
    return Math.sqrt(this.r*this.r + this.i*this.i);
};

//retorna um numero complexo que é o negativo deste
Complex.prototype.neg = function() { return new Complex(-this.r, this.i); };

//converte um objeto complex em uma string de maneira util 
Complex.prototype.toString = function() {
    return "{" + this.r + "," + this.i + "}";
};
//testa se esse objeto complex tem o mesmo valor do outro 
Complex.prototype.equals = function(that) {    
    return that != null &&                    //deve ser definido e não nulo
        that.constructor === Complex &&       //e deve ser uma instância de Complex
        this.r === that.r && this.i === that.i;  //e ter os mesmo valores 
};
/*
*os campos de classes (como as constantes) e os métodos de classe são definidos como 
*propriedades da construtora. Note que os métodos de classe geralmente 
* não usam a palavra-chave this: eles operam somenbte em seus argumentos.
*/

//aqui estão alguns campos de classe que contêm números complexos predefinidos úteis 
//seus nomes estão em maiusculas para indicar que são constantes 
// (em ECMAScript 5, poderiamos tornar essas propriedades somente para leitura o converte.)
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

//este método de classe analisa uma string no formato retornado pelo
//método de instância toString e retorna um objeto Complex ou lança um 
//TypeError
Complex.parse = function(s) {
    try {
        var m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch (x) {
        throw new TypeError("Can't parse '" +s+ "' as a complex number.");
    }
};
//um campo de classe "privado", usado em Complex.parse() acima 
//o sublinhado em seu nome indica que se destina a uso interno 
//e não deve ser considerado parte da API pública dessa classe 
Complex._format = /^\{([^,]+),([^}]+)\}$/;    
//\{}\ caracteres literais de chaves. a barra invertida é necessaria 
//porque as chaves tem significado especial, virgula corresponde numero real que separa os valores  
//o segundo semelhante ao primeiro, mas correspoonde a um ou mais caracteres de nâo seja uma virgula negação. 
//isso captura a parte "imaginaria".
//número complexo no formato especifico de objeto imaginario 
//{10,5i}
//$1 : 10 
//$2 : 5i 

/*
*/
var c = new Complex(2,3);      //cria um novo objeto com a construtora
var d = new Complex(c.i,c.r);  //usa propriedades de instancia de c 
c.add(d).toStrng();            //=> "{5,5}": usa metodos de instância 
//uma expressão mais complexa que é um método e um campo de classe
Complex.parse(c.toString()).   //converte c em uma string e de volta novamente 
    add(c.neg()).              //adiciona seu negativo a ele,
    equals(Complex.ZERO)       //e ele sempre será igual a zero
/*
*/
Complex.prototype.toString = function() {
    return "{" + this.r + "," + this.i + "}";
};
/*
*/
//chama a função f muitas vezes varias vezes, passando o número da iteração 
//por exemplo, para imprimir ("hello") 3 vezes:
//var n = 3;
//n.times(function(n) { console.log(n + " hello"); })
Number.prototype.times = function(f, content) {
    var n = Number(this);
    for(var i = 0; i < n; i++) f.call(useContext, i);
};

//define o método string.trim() de ES5 se ainda não existir nenhum 
//este metodo retorna uma string com espaço em branco removido do inicio e do fim 
String.prototype.trim = String.prototype.trim || function() {
    if (!this) return this;
    return this.replace(/^\s+|\s+$/g, "");
};
//retorna o nome de uma função. se ela tem uma propriedade name (não padronizado), a 
//utiliza. caso contraruio, converte a função em uma funçãio em uma string e extrai o nome desta string 
//retorna uma string vazia para função não nomeadas como ela mesma.
Function.prototype.getName = function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};
/*
*/
function typeAndValue(x) {
    if (x == null) return "";        //Null e undefined não tem construção em js
    switch(x.constructor) {
        case Number: return "Number: " + x;       //funciona para tipos primitivos 
        case String: return "String: '" +x+ "'";  
        case Date: return "Date: " + x;           //e para tipos internos
        case RegExp: return "Regexp: " + x;
        case Complex: return "Complex: " + x;     //e para tipos definidos pelo usuario 
    }
}

