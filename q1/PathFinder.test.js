const PathFinder = require('./PathFinder')
const PNode = require('./PathFinder').Node

// test node connection
test('connect nodes', () => {
    const A = new PNode
    const B = new PNode
    const C = new PNode
    A.connect(B)
    B.connect(C)
    expect(A.connectedNodes.has(B)).toBe(true)
    expect(B.connectedNodes.has(A)).toBe(true)
    expect(C.connectedNodes.has(B)).toBe(true)
    expect(B.connectedNodes.has(C)).toBe(true)
})

test('unconnected nodes', () => {
    const A = new PNode
    const C = new PNode
    expect(A.connectedNodes.has(C)).toBe(false)
    expect(C.connectedNodes.has(A)).toBe(false)
})

// test walk all with simple case
test('3 node walk', () => {
    const pathFinder = new PathFinder(['A', 'B', 'C'], [
        ['A', 'B'],
        ['B', 'C']
    ])
    const ACPaths = Array.from(pathFinder.findAllPaths('A', 'C'))
    expect(ACPaths.length).toBe(1)
    expect(ACPaths[0]).toStrictEqual(['A', 'B', 'C'])
    const BCPaths = Array.from(pathFinder.findAllPaths('B', 'C'))
    expect(BCPaths.length).toBe(1)
    expect(BCPaths[0]).toStrictEqual(['B', 'C'])
})

test('unreachable node', () => {
    const pathFinder = new PathFinder(['A', 'B', 'C', 'D'], [
        ['A', 'B'],
        ['B', 'C']
    ])
    const ADPaths = Array.from(pathFinder.findAllPaths('A', 'D'))
    expect(ADPaths.length).toBe(0)
})

test('shortest path', () => {
    const pathFinder = new PathFinder(['A', 'B', 'C', 'D'], [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
        ['A', 'D']
    ])
    expect(pathFinder.findShortest('A', 'D')).toStrictEqual(['A', 'D'])
    // to cover testing the prev.length < curr.length ? prev : curr 
    const pathFinder2 = new PathFinder(['A', 'B', 'C', 'D'], [
        ['A', 'D'],
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
    ])
    expect(pathFinder2.findShortest('A', 'D')).toStrictEqual(['A', 'D'])
})

test('circulating network', () => {
    const pathFinder = new PathFinder(['A', 'B', 'C', 'D'], [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
        ['D', 'A']
    ])
    const ADPaths = Array.from(pathFinder.findAllPaths('A', 'D'))
    expect(ADPaths.length).toBe(2)
})

// generate a binary-tree-like network
test('tree like structure', () => {
    // they are named as N, N0, N1, N00, N01, N10, N11, 
    // should be only single path from every pairs of nodes
    const DEPTH = 5
    const root = 'N'
    const nodes = [root]
    const depthMap = [[root]]
    const connections = []
    for (let d = 0; d < DEPTH; d++) {
        const parentNodes = depthMap[d]
        depthMap.push([])
        for (const p of parentNodes) {
            let child0 = p + '0', child1 = p + '1'
            nodes.push(child0)
            nodes.push(child1)
            connections.push([p, child0])
            connections.push([p, child1])
            depthMap[d + 1].push(child0)
            depthMap[d + 1].push(child1)
        }
    }
    const pathFinder = new PathFinder(nodes, connections)
    // test all nodes connections
    for (const start of nodes) {
        for (const end of nodes) {
            if (start === end) {
                continue
            }
            let paths = Array.from(pathFinder.findAllPaths(start, end))
            expect(paths.length).toBe(1)
        }
    }
})
