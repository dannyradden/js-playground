function replaceEnclosedRegion(board) {
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const boardHeight = board.length
  const boardWidth = board[0].length

  function markBoundaryRegion(xCoord, yCoord) {
    let queue = []
    let currentPosition, neighbor
    queue.push([xCoord, yCoord])
    board[yCoord][xCoord] = 'B'

    while (queue.length) {
      currentPosition = queue.shift()
      for (const direction of directions) {
        neighbor = [
          currentPosition[0] + direction[0],
          currentPosition[1] + direction[1],
        ]
        if (isFeasible(neighbor) && board[neighbor[1]][neighbor[0]] == 'W') {
          board[neighbor[1]][neighbor[0]] = 'B'
          queue.push([neighbor[0], neighbor[1]])
        }
      }
    }
  }

  function isFeasible(indices) {
    let x = indices[0],
      y = indices[1]
    return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight
  }

  for (let x = 0; x < boardWidth; x++) {
    for (let y = 0; y < boardHeight; y++) {
      if (y == 0 || y == boardHeight - 1 || x == 0 || x == boardWidth - 1) {
        if (board[y][x] == 'W') {
          markBoundaryRegion(x, y)
        }
      }
    }
  }

  return board
}

var board1 = [
  ['B', 'B', 'B', 'B'],
  ['W', 'B', 'W', 'B'],
  ['B', 'W', 'W', 'B'],
  ['B', 'B', 'B', 'B'],
]

var board2 = [
  ['B', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'B', 'W', 'W'],
  ['B', 'W', 'B', 'B', 'W'],
  ['B', 'B', 'W', 'B', 'W'],
  ['B', 'B', 'B', 'B', 'B'],
]

var board3 = [
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'B', 'B', 'B', 'W'],
  ['W', 'B', 'B', 'B', 'W'],
  ['W', 'B', 'B', 'B', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
]

var board4 = [
  ['B', 'B', 'B', 'B', 'B'],
  ['B', 'W', 'W', 'W', 'B'],
  ['B', 'W', 'W', 'W', 'B'],
  ['B', 'W', 'W', 'W', 'B'],
  ['B', 'B', 'B', 'B', 'B'],
]

console.log('Board 1', replaceEnclosedRegion(board1))
console.log('Board 2', replaceEnclosedRegion(board2))
console.log('Board 3', replaceEnclosedRegion(board3))
console.log('Board 4', replaceEnclosedRegion(board4))
