import PathFinder from "./PathFinder.js"

let pathFinder = new PathFinder(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    [
        ['A', 'B'],
        ['A', 'D'],
        ['A', 'H'],
        ['B', 'C'],
        ['B', 'D'],
        ['C', 'F'],
        ['C', 'D'],
        ['D', 'E'],
        ['F', 'G'],
        ['F', 'E'],
        ['E', 'H'],
        ['G', 'H'],
    ]
)

console.log('Print all route from A to H')
for (const path of pathFinder.findAllPaths('A', 'H')) {
    console.log(path.join(' -> '))
}
console.log('Print shortest route from A to H')
console.log(pathFinder.findShortest('A', 'H').join(' -> '))
