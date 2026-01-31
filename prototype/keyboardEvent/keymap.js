/*
*Keymap.js: vincula eventos de tecla a funções de tratamento.
*
*este módulo define uma classe Keymap, Uma instacia desse classe representa um 
*mapeamento de identificadores de tecla (definido abaixo) em funções de tratamento.
*Keymap pode ser instalada em um elemento HTML para tratar de eventos keydown. Quando
*esse evento ocorre, Keymap utiliza seu mapeamento para chamar a rotina de tratamento 
*apropriada.
*
*Quando você cria uma Keymap, pode passar um objeto JavaScript representado 
*o conjunto inicial de vinculos para Keymap. Os nomes de propriedade desse objeto
*são identificadores de tecla e os valores de propriedade são as funções de tratamento.
*após uma Keymap ser criada, você pode adicionar novos vinculos, passando um 
*identificador de tecla e a função de tratamento para o método bind(). Um vinculo pode 
*ser removido passando-se um identificador de tecla para método unbind()
*
*para usar Keymap, chame seu método install(), passando um elemento HTML
*como o objeto documento. install() adiciona uma rotina de tratamento de evento
*onkeydown no objeto especificado. Quando essa rotina de tratamento é chamada, ela
*determina o identificador de tecla da tecla pressionada e chama função de tratamento,
*se houver, vinculada a esse identificador. Uma única keymap pode ser instalada em mais 
*de um elemento HTML 
*
*identificadores de tecla 
*
*um identificador de tecla é uma representação de string que não diferencia letras
*maiùsculas e minusculas de uma tecla, mais qualquer teclas modificadores que sejam 
*pressionadas ao mesmo tempo. Normalmente, o nome da tecla é o texto (sem Shift) que esta
*na tecla. Nomes de tecla validos incluem "A", "7", "F2", "PageUp", "Left", "Backspace"
*e "Esc".
*
*consulte o objeto Keymap.keyCodeToKeyName neste modulo para ver uma lista de nomes.
*esses reprensetam um subconjunto dos nomes definidos pelo padrão Level 3, do DOM e
*essa classe usará a propriedade key do objeto evento, quando for implementada.
*
*um identificador de tecla também pode incluir prefixos de tecla modificadora. Esses
*prefixos são Alt, Ctrl, Meta e Shift. Eles não diferenciam letras maiusculas e 
*minusculas e devem ser separados do nome tecla e uns dos outros com espaços ou 
*com sublinhado, hifen ou +. Por exemplo: "SHIFT+A", "Alt_F2", "meta-v" e "ctrl"
*alt left".
*Em Macs, Meta é a tecla Command e Alt é a tecla Option. Alguns navegadores 
*mapeiam a tecla Windows na modificadora Meta.
*
*funções de rotina de tratamento.
*
*as rotinas de tratamento são chamadas como métodosdo documento ou elemento do 
*documento em que o mapa de teclas está instalado e recebem dois argumentos
*      1) o objeto evento para evento keydown
*      2) o identificador de tecla da tecla que foi pressionada 
*o valor de retorno da rotina de tratamento se torna valor de retorno da rotina de 
*tratamento de keydown.
*se uma função de tratamento retorna false, o mapa de teclas vai parar de borbulhar e 
*vai cancelar qualquer ação padrão associada ao evento keydown.
*
*Limitações 
*
*não é possivel vincular uma função de tratamento a todas teclas. O sistema 
*operacional captura algumas sequências de tecla (Alt-F4, por exemplo). E o proprio 
*navegador pode capturar outras (Ctrl-S, por exemplo). Este codigo é dependente do 
*navegador, do sistema operacional e da localidade. As teclas de função e as teclas de 
*função modificadas funcionam bem, assim como as teclas alfanumericas é menos robusta.
*A combinação de Ctrl e Alt com caracteres alfanumericos é menos robusta.
*
*A maioria dos caracteres de pontuação que não existem a tecla Shift (``=[];',./\,
*mas não hifen) é suportada nos layouts de teclado US padrão. MAs não é 
*especialmente portàvel para outros layouts de teclado e deve ser evitada.
*/
//Esta função construtora 
function Keymap(bindings) {
    this.map = {};            //define o identificador de tecla->mapa da rotina de tratamento 
    if (bindings) {           //copia os vinculos iniciais nele 
        for(name in bindings) this.bind(name, bindings[name]);
    }
}

//vinculada o identificador de tecla especificado á função de tratamento especificada
Keymap.prototype.bind = function(key, func) {
    this.map[Keymap.normalize(key)] = func;
};

//exclui o vinculo do identificador de tecla especificado 
Keymap.prototype.unbind = function(element) {
    //esta é a função de tratamento de evento 
    var keymap = this;
    function handler(event) { return keymap.dispatch(event, element); }
    
    //agora a instala 
    if (element.addEventListener)
        element.addEventListener("keydown", handler, false);
    else if (element.attachEvent)
        element.attachEvent("onkeydown", handler);
};

//este metodo envia eventos de tecla baseados nos vinculos de mapa de teclas.
keymap.prototype.dispatch = function(event, element) {
    //começamos sem modificadoras e sem nome de tecla 
    var modifiers = ""
    var keyname = null;

    //constroi a string modificadora em ordem alfabetica minuscula canônica 
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";

    //o nome da tecla facil, se propriedade key do Level 3 do DOm estiver 
    //implementação:
    if (event.key) keyname = event.key;
    //usa keyIdentifier no safari e no chrome para nomes de tecla de função 
    else if (event.keyIdentifier && event.keyIdentifier.substring(0,2) !== "U+")
        keyname = event.key;
    //caso contrario, usa a propriedade keyCode e o mapa de relacionamento codigo-nome 
    //abaixo 
    else keyname = Keymap.keyCodeToKeyName[event.keyCode];

    //se não conseguimos encontrar um nome de tecla, apenas retorna e ignora o evento 
    if (!keyname) return; 
    //a identificação de tecla canônica é modifiers mais nome da tecla em minusculas
    var keyid = modifiers + keyname.toLowerCase();

    //agora vê se o identificador de tecla está vinculado a alguma coisa 
    var handler = this.map[keyid];

    if (handler) {   //se existe uma rotina de tratamento para essa tecla, trata dela 
        //chama a função de tratamento 
        var retval = handler.call(element, event, keyid);

        //se a rotina de tratamento retorna false, cancela o padrão e impede que borbulhe
        if (retval === false) {
            if (event.stopPropagation) event.stopPropagation();     //Modelo DOM 
            else event.cancelBubble = true;                         //Modelo IE 
            if (event.preventDefault) event.preventDefault();       // DOM 
            else event.returnValue = false;                         // IE 
        }

        //retorna o que é rotina de tratamento retornou 
        return retval;
    }
};
//função utilitaria para converter um identificador de tecla para a forma canônica 
//em hardware não macintosh, poderiamos mapear "meta" em "ctrl" aqui, para que 
//Meta-C fosse "Command-C" mac e "Ctrl-c" em outros lugares 
keymap.normalize = function(keyid) {
    keyid = keyid.toLowerCase();                  //tudo em minusculo 
    var words = keyid.split(/\s+|[\-+_]/);        //separa as modificadoras do nome 
    var keyname = words.pop();                    //keyname é a ultima palavra 
    keyname = Keymap.aliases[keyname] || keyname; //É um apelido?
    words.sort();                                 //classifica as modificadoras restantes
    words.push(keyname);                          //adiciona novamente o nome normalizado scape 
    return words.join("_");                       //concatena tudo 
};

Keymap.aliases = {                  //mapeia apelidos de tecla comuns em seus nomes 
    "escape":"esc",                 //de tecla "oficias" usados pelo Level 3 do DOM e pelo
    "delete":"del",                 //codigo de tecla no mapa de nomes de tecla abaixo.
    "return":"enter",               //tanto as teclas como os valores devem estar em letras 
                                    //minusculas aqui 
    "ctrl":"control",
    "space":"scapebar",
    "ins":"insert"
};

//a propriedade legada keyCode do objeto evento keydown não é padronizada
//mas os valores a seguir parecem funcionar para a maioria dos navegadores e sistemas 
//operacionais.
Keymap.keyCodeToKeyName = {
    //teclas contendo palavras ou setas 
    8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
    19:"Pause", 20:"CapsLock", 27:"Esc", 32:"SpaceBar", 33:"PageUp",
    34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right", 
    40:"Down", 45:"Insert", 46:"Del",

    //teclas numéricas no teclado principal (não no teclado numérico)
    48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9",

    //teclas de letra. Note que não distinguimops maiusculas e minusculas 
    65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
    74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
    83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",

    //numeros do teclado numérico e teclas de pontuação. (O opera não suporta isso.)
    96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
    106:"Multiply", 107:"Add", 108:"Subtract", 110:"Decimal", 111:"Divide",

    //tecla da função 
    112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6", 
    118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
    124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
    130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",

    //teclas de pontuação que não exigem manter tecla Shift pressionada 
    //O hifen não é portavel: ff retorna o mesmo codigo que subtract 
    59:";", 61:"=", 186:";", 187:"=",  //o firefox e o opera que subtract 
    188:",", 190:".",191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};

