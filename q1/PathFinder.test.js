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
