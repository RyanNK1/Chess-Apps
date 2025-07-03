$(document).ready(function () {
  const board = $('#game');
  const turnDisplay = $('#turn');
  let selectedCell = null;
  let turn = 'white';

  // Unique keys for internal logic, but only show the symbol
  const pieces = {
    '♜1': [0, 0], '♞1': [1, 0], '♝1': [2, 0], '♛': [3, 0], '♚': [4, 0], '♝2': [5, 0], '♞2': [6, 0], '♜2': [7, 0],
    '♟1': [0, 1], '♟2': [1, 1], '♟3': [2, 1], '♟4': [3, 1], '♟5': [4, 1], '♟6': [5, 1], '♟7': [6, 1], '♟8': [7, 1],
    '♙1': [0, 6], '♙2': [1, 6], '♙3': [2, 6], '♙4': [3, 6], '♙5': [4, 6], '♙6': [5, 6], '♙7': [6, 6], '♙8': [7, 6],
    '♖1': [0, 7], '♘1': [1, 7], '♗1': [2, 7], '♕': [3, 7], '♔': [4, 7], '♗2': [5, 7], '♘2': [6, 7], '♖2': [7, 7]
  };

  function getColor(piece) {
    return ['♜','♞','♝','♛','♚','♟'].includes(piece) ? 'black' : 'white';
  }

  function clearHighlights() {
    $('.cell').removeClass('highlight');
  }

  function switchTurn() {
    turn = turn === 'white' ? 'black' : 'white';
    turnDisplay.text(`It's ${turn.charAt(0).toUpperCase() + turn.slice(1)}'s Turn!`);
  }

  // Create board
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const cell = $('<div class="cell"></div>');
      cell.addClass((x + y) % 2 === 0 ? 'white' : 'black');
      cell.attr('id', `${x}_${y}`);
      board.append(cell);
    }
  }

  // Place pieces
  for (const [pieceKey, positions] of Object.entries(pieces)) {
    const symbol = pieceKey[0]; // Only show the symbol
    const [x, y] = positions;
    $(`#${x}_${y}`).text(symbol);
  }

  // Handle clicks
  $('.cell').click(function () {
    const clickedPiece = $(this).text();
    const clickedColor = getColor(clickedPiece);

    if (selectedCell === null) {
      if (clickedPiece && clickedColor === turn) {
        selectedCell = $(this);
        $(this).addClass('highlight');
      }
    } else {
      if ($(this)[0] !== selectedCell[0]) {
        $(this).text(selectedCell.text());
        selectedCell.text('');
        clearHighlights();
        selectedCell = null;
        switchTurn();
      } else {
        clearHighlights();
        selectedCell = null;
      }
    }
  });
});

