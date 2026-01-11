"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publishDates = {
    Frankenstein: new Date("1818-01-01"), //mudar os dias 
};
publishDates.Frankenstein; //type: date 
console.log(publishDates.Beloved?.toString()); //colocar um valor undefined
publishDates.Beloved; //type: date, but value of undefined!
console.log(publishDates.Beloved?.toString());
//runtime erro: cannot read propperty "toString"
//error: um erro sobre publishDates: beloved
//caso voce força e usar?. retornara o if ou else 
// onde o vs code mostrara um erro vermelho de um objeto "underfined"
//# sourceMappingURL=book.js.map