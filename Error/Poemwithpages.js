"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poem = Math.random() > 0.5
    ? { name: "The double Image", pages: 10, type: "pages" } //trocar por um numero o true que significa verdade é uma função 
    : { name: "Her Kind", rhymes: true, type: "rhymes" };
//erros na linha de baixo não é um programa
console.log(poem.name); //Ok, declara uma função 
if ("pages" in poem) {
    console.log(poem.pages);
}
else {
    //proiperty "pages" does not exist on type ´poem
    // poemwithrhymes´
    console.log(poem.rhymes);
}
//~~~~~~~~~~~~~
//error: com a saida de on type "poem"
//property ´rhymes´ does not exist on type `PoewithPages`
//Ok: know it's poemwithRhymes here for function
//Ok: esse tem uma função no console
//# sourceMappingURL=Poemwithpages.js.map