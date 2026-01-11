"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const songs = ["Juice", "Shake it Off", "What's up"];
function runOnSOngs(getSongAt) {
    for (let i = 0; i < songs.length; i++) {
        console.log(getSongAt(i));
    }
}
function getSongAt(index) {
    return `${songs[index]}`;
}
runOnSOngs(getSongAt); //Ok
function logSong(song) {
    return `${song}`;
}
runOnSOngs((index) => logSong(songs[index] ?? ""));
//this will throw the compiler error discussed above
//runOnSOngs(logSong);
//~~~~~~~~~~~~~~~~~~
//error: argument of type (song: string) => string is not 
//assignable to parameter of type  (index are imcompatible)
//# sourceMappingURL=juice.js.map