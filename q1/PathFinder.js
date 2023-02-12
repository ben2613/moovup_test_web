class PathFinder {
    /**
     * @param {string[]} nodes ['A', 'B', 'C']
     * @param {string[][]} connections [['A', 'H'], ['A', 'B'], ...]
     */
    constructor(nodes, connections) {
        this.nodes = Object.fromEntries(
            nodes.map(
                c => [c, new Node(c)]
            )
        )
        this.init(connections)
    }
    /**
     * @param {string[][]} connections [['A', 'H'], ['A', 'B']]
     */
    init(connections) {
        connections.forEach(([start, end]) => {
            this.nodes[start].connect(this.nodes[end])
        })
    }
    findAllPaths(start, stop) {
        let visitedNodes = new Set()
        let startNode = this.nodes[start]
        let stopNode = this.nodes[stop]
        let paths = [] // contain sequences of nodes
        return this.subFindAllPaths(startNode, stopNode, visitedNodes, paths)
    }
    *subFindAllPaths(startNode, stopNode, visitedNodes, paths) {
        visitedNodes.add(startNode)
        paths.push(startNode)

        if (startNode === stopNode) {
            yield paths.map(n => n.name)
        } else {
            for (const n of startNode.connectedNodes) {
                if (!visitedNodes.has(n)) {
                    yield* this.subFindAllPaths(n, stopNode, visitedNodes, paths)
                }
            }
        }

        paths.pop()
        visitedNodes.delete(startNode)
    }
    findShortest(start, stop) {
        let paths = Array.from(this.findAllPaths(start, stop))
        return paths.reduce((prev, curr) => prev.length < curr.length ? prev : curr)
    }
}

class Node {
    constructor(name) {
        this.name = name
        this.connectedNodes = new Set()
    }
    connect(node) {
        this.connectedNodes.add(node)
        node.connectedNodes.add(this)
    }
}

module.exports = PathFinder
module.exports.Node = Node
