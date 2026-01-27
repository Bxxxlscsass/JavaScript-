/* 
* Estrutura enumeradas de p em o e retorna o 
* Copia as propriedades enumeraveis de p em o e retorna o 
* Se o e p têm uma propriedade de mesmo nome, a propriedade de o é sobrescrita 
* Esta função não manipula métodos getter e setter nem cópia atributos.
*/
function extend(o, p) {    //para todas as pros em p.
    for(prop in p) {      //adiciona a propriedade em o.
        o[prop] = p[prop];
    }
    return o;
}
/*
* Copia as propriedades enumeraveis de p em o e retorna o.
* Se o e p tem uma propridade de mesmo nome, a propriedade de o é deixada intacta.
* Esta função não manipula métodos getter e setter copia atributos.
*/
function merge(o, p) {            //para todas as pros em p 
    for(prop in p) {              //exceto  as que já estão em o.
        if (o.hasOwnProperty[prop]) continue;     //adiciona a propriedade em o.
        o[prop] = p[prop];
    }
    return o;
}
/*
* Remove as propriedades de o se não existe uma propriedade com o mesmo nome em p
* Retorne o.
*/
function restrict(o, p) {        //para todas as props em o
    for(prop in o) {             //exclui se não estiver em p
        if (!(prop in p)) delete o[prop];
    }
    return o;
}
/*
* Para cada propriedade de p, exclui de o a propriedade de mesmo nome.
* Retorne o.
*/
function subtract(o, p) {  //para todas as props em p
    for(prop in p) {       //exclui de o (exclui uma 
        delete o[prop];    //prop inexistente não causa danos)
    
    }
    return o; 
}

/*
* Retorna um novo objeto contendpo as propriedades de o e p.
* Se o e p têm propriedades do mesmo nome, os valores de p são usados.
*/
function union(o,p) { return extend(extend({},o), p); }

/*
** Retorna um novo objeto contendo apenas as propriedades de o que também aparecem 
* em p. Isso é como a interseção de o e p, mas os valores das 
* propriedades em p são descartados 
*/
function intersection(o,p){ return restrict(extend({}, o), p); }

/*
* Retorna um array contendo os nomes das propriedades p´roprias enumeráveis de o.  
*/
function keys(o) {
    if(typeof o !== "object") throw TypeError();   //argumento object exigido 
    var result = [];                     //o array que retornaremos 
    for(var prop in o) {                 //para todas as propriedades enumeradas 
        if (o.hasOwnProperty(prop))      //se for uma propriedade própria
            result.push(prop);           //a adiciona no array
                                        
    }
    return result;                       // Retorna o array.
}
/*
*/
var o = {
    //uma propriedade de dados normal
    data_prop: value,

    //Uma propriedade de acesso definida como um par de funções
    get acessor_prop() { /* corpo da função aqui */},
    set acessor_prop(value) { /* corpo da função aqui */}
};
/*
*/
var p = {
    //x e y são propriedade de dados de leitura-gravação normais.
    x: 1.0,
    y: 1.0,

    //r é uma propriedade de acesso de leitura-gravação com métodos getter.
    // não se esqueça de colocar uma virgula após os métodos de acesso.
    get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    //theta é uma propriedade de acesso somente para leitura, apenas com método getter.
    get thete() { return Math.atan2(this.y, this.x); }
};
/*
*/
var q = inherit(p);    //cria um novo objeto que herda métodos getter e setter 
q.x = 1, q.y = 1;      //cria as propriedades de dados próprios de q
console.log(q.r);      // e usa as propriedades de acesso herdados 
console.log(q.theta);
/*
*/
// este objeto gera números seriais estritamente crescentes 
var serialnum = {
    //esta propriedade de dados contém o próximo número serial 
    //o $ no nome da propriedade sugere que se trata de uma propriedade privada 
    $n: 0,

    //retorna o valor atual e o incrementa 
    get next() { return this.$n++; },

    //configura um novo valor de n, mas somente se for maoir do que o atual 
    set next(n) {
        if (n>= this.$n) this.$n = n;
        else throw "serial number can only be set to a larger value";
    }
};
/*
*/
//obtendo uma propriedade com o nome expecifico 
//retorna {value: 1, writable:true, enumerable:true, conbfigurable:true}
Object.getOwnPropertyDescriptor({x:1}, "x");

//agora consulta a propriedade octet do object random definido anteriomente.
//retorna { get: /*func*/, set:underfined, enumerable:true, configurable:true}
Object.getOwnPropertyDescriptor(random, "octet");

//retorna undefined para propridades herdadas e propriedades que não existem.
Object.getOwnPropertyDescriptor({}, "x");   //indefinido, não existe essa prop
Object.getOwnPropertyDescriptor({}, "toString"); //indefinido, herdada 
/*
*/
var o = {};
//adiciona uma propriedade de dados não enumeravel x com valor 1.
Object.defineProperty(o, "x", { value : 1,
                                writable: true,
                                enumerable: false,
                                configurable: true});
//verifica se a propriedade existe mas não é enumeravel 
o.x;   // => 1
Object.keys(o)  // => []

//agora modifica a propriedade x para que ela seja somente para leitura 
Object.defineProperty(o, "x", { witable: false });

// tenta alterar o valor da propriedade
o.x = 2;   //falha silenciosamente ou lança TypeError no modo restrito 
o.x  // => 1

//A propriedade ainda é configuravel; portanto, podemos alterar seu valor, como segue:
Object.defineProperty(o, "x", { value: 2});
o.x    // => 2

//agora altera x de uma propriedade de dados para uma propriedade de acesso 
Object.defineProperty(o, "x", {get: function() { return 0; } });
o.x   //=> 0 
/*
*/
var p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable:true, configurable:true },
    y: { value: 1, writable: true, enumerable:true, configurable:true },
    r: {
        get: function() { return Math.sqrt(this.x*this.x + this.y*this.y) },
        enumerable:true,
        configurable:true
    }
});
/* 
*/
// propriedade com comportamento "magico" getter para implementar 
// este objeto tem propriedades de acesso que retornam números aleatorios.
// a expressão "random.octet", por exemplo, gera um número aleatorio
// entre 0 e 255 sempre que é avaliada.
var random = {
    get octet() { return Math.floor(Math.random()*256); },
    get uint16() { return Math.floor(Math.random()*65536); },
    get init16() { return Math.floor(Math.random()*65536)-32768; }
};
/*
*/
var p = {x:1};   //define um objeto protótipo
var o = Object.create(p); //cria um opbjeto com esse protótipo
p.isPrototypeOf(p)  //=> verdadeiro: o herda de p 
Object.prototype.isPrototypeOf(p)  //=> verdadeiro: p herda de Object.prototype
/*
*/
