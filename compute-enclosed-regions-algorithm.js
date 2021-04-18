function replaceEnclosedRegion(board) {
  console.log('replaceEnclosedRegion ran with', board)

  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const boardHeight = board.length
  const boardWidth = board[0].length

  let visited = new Array(boardHeight)
  for (let i = 0; i < boardHeight; i++) {
    visited[i] = new Array(boardWidth)
    visited[i].fill(false)
  }

  function markBoundaryRegion(xCoord, yCoord) {
    console.log('markBoundaryRegion ran with', xCoord, yCoord)
    let queue = []
    let currentPosition, neighbor
    queue.push([xCoord, yCoord])
    visited[yCoord][xCoord] = true
    board[yCoord][xCoord] = 'B'

    while (queue.length) {
      console.log(queue)
      currentPosition = queue.shift()
      for (const direction of directions) {
        neighbor = [
          currentPosition[0] + direction[0],
          currentPosition[1] + direction[1],
        ]
        if (isFeasible(neighbor)) {
          visited[neighbor[1]][neighbor[0]] = true
          if (board[neighbor[1]][neighbor[0]] == 'W') {
            board[neighbor[1]][neighbor[0]] = 'B'
            queue.push([neighbor[0], neighbor[1]])
          }
        }
      }
    }
  }

  function isFeasible(indices) {
    let x = indices[0],
      y = indices[1]
    return (
      x >= 0 &&
      x < boardWidth &&
      y >= 0 &&
      y < boardHeight &&
      !visited[indices[1]][indices[0]]
    )
  }

  for (let x = 0; x < boardWidth; x++) {
    for (let y = 0; y < boardHeight; y++) {
      if (y == 0 || y == boardHeight - 1 || x == 0 || x == boardWidth - 1) {
        if (board[y][x] == 'W' && visited[y][x] == false) {
          markBoundaryRegion(x, y)
        }
      }
    }
  }

  return board
}

var board = [
  ['B', 'B', 'B', 'B'],
  ['W', 'B', 'W', 'B'],
  ['B', 'W', 'W', 'B'],
  ['B', 'B', 'B', 'B'],
]

var board2 = [
  ['B', 'W', 'W', 'B', 'W'],
  ['W', 'B', 'B', 'W', 'W'],
  ['B', 'W', 'W', 'B', 'W'],
  ['B', 'B', 'B', 'B', 'W'],
]

console.log('finished', replaceEnclosedRegion(board2))
