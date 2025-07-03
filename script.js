$(document).ready(function () {
  const board = $('#game');
  const turnDisplay = $('#turn');
  const cli = $('#cli');
  let selectedCell = null;
  let turn = 'white';

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
    $('.cell').removeClass('highlight shake-little neongreen_txt');
  }

  function switchTurn() {
    turn = turn === 'white' ? 'black' : 'white';
    turnDisplay.text(`It's ${turn.charAt(0).toUpperCase() + turn.slice(1)}'s Turn!`);
    turnDisplay.addClass('turnhighlight');
    setTimeout(() => turnDisplay.removeClass('turnhighlight'), 1000);
  }

  function coordToId(coord) {
    const file = coord[0].toLowerCase().charCodeAt(0) - 97;
    const rank = 8 - parseInt(coord[1]);
    return `${file}_${rank}`;
  }

  function resetBoard() {
    $('.cell').text('');
    for (const [pieceKey, positions] of Object.entries(pieces)) {
      const symbol = pieceKey[0];
      const [x, y] = positions;
      $(`#${x}_${y}`).text(symbol);
    }
    turn = 'white';
    turnDisplay.text("It's Whites Turn!");
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

  resetBoard();

  $('.cell').click(function () {
    const clickedPiece = $(this).text();
    const clickedColor = getColor(clickedPiece);

    if (selectedCell === null) {
      if (clickedPiece && clickedColor === turn) {
        selectedCell = $(this);
        $(this).addClass('highlight shake-little neongreen_txt');
      }
    } else {
      const selectedPiece = selectedCell.text();
      const selectedColor = getColor(selectedPiece);

      if ($(this)[0] === selectedCell[0]) {
        clearHighlights();
        selectedCell = null;
      } else if (!clickedPiece || clickedColor !== selectedColor) {
        $(this).text(selectedPiece);
        selectedCell.text('');
        clearHighlights();
        selectedCell = null;
        switchTurn();
      } else {
        clearHighlights();
        selectedCell = $(this);
        $(this).addClass('highlight shake-little neongreen_txt');
      }
    }
  });

  cli.on('keypress', function (e) {
    if (e.which === 13) {
      const input = cli.val().trim().toLowerCase();
      const parts = input.split(' ');

      if (parts[0] === 'move' && parts.length === 3) {
        const fromId = coordToId(parts[1]);
        const toId = coordToId(parts[2]);
        const fromCell = $(`#${fromId}`);
        const toCell = $(`#${toId}`);
        const piece = fromCell.text();
        const color = getColor(piece);

        if (piece && color === turn) {
          toCell.text(piece);
          fromCell.text('');
          switchTurn();
        }
      } else if (parts[0] === 'reset') {
        resetBoard();
      }

      cli.val('');
    }
  });

  $('body').contextmenu(function (e) {
    e.preventDefault();
  });
});


