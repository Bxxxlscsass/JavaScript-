"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSongRecordingDate(song) {
    switch (song) {
        case "Stringe Fruit":
            return new Date('April 20, 1939'); //Ok
        case "Greensleeves":
            return undefined;
        //return "unknown"; error
        //Ok: return underfied 
        //error: type 'string' is not assingnable to type 'Date'
        default:
            return undefined; //Ok, must be spelled correctly 
    }
}
//# sourceMappingURL=getSong.js.map