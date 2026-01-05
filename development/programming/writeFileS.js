import fs from 'fs/promises'
const text = 'Star Wars (Brasil: Guerra nas estrelas /Portugal: Guerra das estrelas) é uma fraquia do tipo space opera estadunidense criada pelo cineasta George lucas, que conta uam serie de nove filmes de fantasia cientifica e dois spin-offs.\n'
await  fs.writeFile('async-await.txt', text)
const data = await fs.readFile('async-await.txt')
console.log(data.toString())



