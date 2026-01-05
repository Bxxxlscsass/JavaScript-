const fs = require('fs')
const promisify = require('util').promisify
const text = 'Star Wars (Brasil: Guerra nas estrelas /Portugal: Guerra das estrelas) é uma fraquia do tipo space opera estadunidense criada pelo cineasta George lucas, que conta uam serie de nove filmes de fantasia cientifica e dois spin-offs.\n'
const  writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
writeFileAsync('promisify.txt', text)
    .then(_ => readFileAsync('promise.txt'))
    .then(data => console.log(data.toString()))




