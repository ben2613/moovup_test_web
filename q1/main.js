import PathFinder from "./PathFinder.js"

let pathFinder = new PathFinder()

console.log('Print all route from A to H')
for (const path of pathFinder.findAllPaths('A', 'H')) {
    console.log(path.join(' -> '))
}
console.log('Print shortest route from A to H')
console.log(pathFinder.findShortest('A', 'H').join(' -> '))
