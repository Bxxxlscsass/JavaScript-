"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleResult(result) {
    if (result.succeeded) {
        console.log('we did it! ${result.data}');
    }
    else {
        //type of result: failuResult
        console.error('awww.....${result.error.message');
    }
    //result.data;
    //error de compilação aqui: esse resultado não exite 'data'
}
//# sourceMappingURL=inter.js.map