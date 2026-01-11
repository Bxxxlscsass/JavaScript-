"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ok: all fields match whats expected in Poet
//const poetMatch: Poet = { //erro parte poeta e atividade 
//    born: 1935,
//   name: "Maya Angelou"
//};
const poetMatch = {
    activity: "walking",
    born: 1935,
    name: "Maya Angelou",
};
const extraProperty = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};
//error: type activity: string; born: number; nemoe: string;
//is not assignable to type ´Poet´
//Object literal may only specity known properties
//and ´activity´ does not exit i type ´Poet´
//const exitingObject = {
//    activity: "walking",
//   born: 1935,
//   name: "Mary Oliver",
//};
//const extraPropertyButOk: Poet = existingObject; 
//não é um programa 
//# sourceMappingURL=extraproperty.js.map