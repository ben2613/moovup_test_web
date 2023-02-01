export default class PathFinder {
    constructor() {
        this.nodes = Object.fromEntries(
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(
                c => [c, new Node(c)]
            )
        )
        this.init()
    }
    init() {
        this.nodes.A.connect(this.nodes.B)
        this.nodes.A.connect(this.nodes.D)
        this.nodes.A.connect(this.nodes.H)
        this.nodes.B.connect(this.nodes.C)
        this.nodes.B.connect(this.nodes.D)
        this.nodes.C.connect(this.nodes.F)
        this.nodes.C.connect(this.nodes.D)
        this.nodes.D.connect(this.nodes.E)
        this.nodes.F.connect(this.nodes.G)
        this.nodes.F.connect(this.nodes.E)
        this.nodes.E.connect(this.nodes.H)
        this.nodes.G.connect(this.nodes.H)
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
