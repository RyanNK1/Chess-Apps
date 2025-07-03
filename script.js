$(document).ready(function () {
  const board = $('#game');
  const pieces = {
    '♜': [0, 0], '♞': [1, 0], '♝': [2, 0], '♛': [3, 0], '♚': [4, 0], '♝': [5, 0], '♞': [6, 0], '♜': [7, 0],
    '♟': Array.from({ length: 8 }, (_, i) => [i, 1]),
    '♙': Array.from({ length: 8 }, (_, i) => [i, 6]),
    '♖': [0, 7], '♘': [1, 7], '♗': [2, 7], '♕': [3, 7], '♔': [4, 7], '♗': [5, 7], '♘': [6, 7], '♖': [7, 7]
  };

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const cell = $('<div class="cell"></div>');
      cell.addClass((x + y) % 2 === 0 ? 'white' : 'black');
      cell.attr('id', `${x}_${y}`);
      board.append(cell);
    }
  }

  for (const [piece, positions] of Object.entries(pieces)) {
    if (Array.isArray(positions[0])) {
      positions.forEach(([x, y]) => {
        $(`#${x}_${y}`).text(piece);
      });
    } else {
      const [x, y] = positions;
      $(`#${x}_${y}`).text(piece);
    }
  }
});
