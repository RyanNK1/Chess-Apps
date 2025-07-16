def initializeBoard():
    return [
        ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        ["--", "--", "--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--", "--", "--"],
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
        ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ]

def printBoard(board):
    for row in range(8):
        print(8 - row, " ", end="")
        print(" ".join(board[row]))
        #for col in range(8):
         #   print(board[row][col], end=" ")
        #print()
    print("    a  b  c  d  e  f  g  h")

def parsePosition(pos):
    col = ord(pos[0]) - ord('a')
    row = 8 - int(pos[1])
    return row, col

def findKing(board, color):
    king = 'wk' if color == 'w' else 'bk'
    for row in range(8):
        for col in range(8):
            if board[row][col] == king:
                return row, col
    return None

def isKingInCheck(board, color):
    kingRow, kingCol = findKing(board, color)
    opponent = 'b' if color == 'w' else 'w'

    for row in range(8):
        for col in range(8):
            if board[row][col].startswith(opponent):
                piece = board[row][col][1]
                fromPos = f"{chr(col + ord('a'))}{8 - row}"
                toPos = f"{chr(kingCol + ord('a'))}{8 - kingRow}"
                if isValidMove(board, opponent, piece.upper(), fromPos, toPos):
                    return True
    return False

def getAllMoves(board, color):
    moves = []
    for row in range(8):
        for col in range(8):
            if board[row][col].startswith(color):
                piece = board[row][col][1]
                fromPos = f"{chr(col + ord('a'))}{8 - row}"
                for r in range(8):
                    for c in range(8):
                        toPos = f"{chr(c + ord('a'))}{8 - r}"
                        if isValidMove(board, color, piece.upper(), fromPos, toPos):
                            moves.append((fromPos, toPos))
    return moves

def isCheckmate(board, color):
    if not isKingInCheck(board, color):
        return False

    for fromPos, toPos in getAllMoves(board, color):
        tempBoard = [row[:] for row in board] 
        movePiece(tempBoard, fromPos, toPos)
        if not isKingInCheck(tempBoard, color):
            return False
    return True

def isValidPawnMove(board, color, fromPos, toPos):
    fromRow, fromCol = parsePosition(fromPos)
    toRow, toCol = parsePosition(toPos)
    direction = -1 if color == 'w' else 1
    startRow = 6 if color == 'w' else 1

    if fromCol == toCol and board[toRow][toCol] == "--":
        if toRow == fromRow + direction:
            return True
        if fromRow == startRow and toRow == fromRow + 2 * direction and board[fromRow + direction][fromCol] == "--":
            return True

    if abs(fromCol - toCol) == 1 and toRow == fromRow + direction:
        if board[toRow][toCol].startswith('b' if color == 'w' else 'w'):
            return True

    return False

def isClearPath(board, fromPos, toPos, isDiagonal=False):
    fromRow, fromCol = parsePosition(fromPos)
    toRow, toCol = parsePosition(toPos)
    rowDiff = toRow - fromRow
    colDiff = toCol - fromCol

    stepRow = 1 if rowDiff > 0 else -1 if rowDiff < 0 else 0
    stepCol = 1 if colDiff > 0 else -1 if colDiff < 0 else 0

    if isDiagonal:
        if abs(rowDiff) != abs(colDiff):
            return False

    currentRow, currentCol = fromRow + stepRow, fromCol + stepCol
    while (currentRow != toRow or currentCol != toCol):
        if not (0 <= currentRow < 8 and 0 <= currentCol < 8):
            return False
        if board[currentRow][currentCol] != "--":
            return False
        currentRow += stepRow
        currentCol += stepCol

    return True

def isValidMove(board, color, piece, fromPos, toPos):
    fromRow, fromCol = parsePosition(fromPos)
    toRow, toCol = parsePosition(toPos)

    if not (0 <= toRow < 8 and 0 <= toCol < 8):
        return False

    targetPiece = board[toRow][toCol]
    if targetPiece.startswith(color):
        return False

    if piece == 'P':
        return isValidPawnMove(board, color, fromPos, toPos)
    elif piece == 'N':
        rowDiff = abs(fromRow - toRow)
        colDiff = abs(fromCol - toCol)
        return (rowDiff, colDiff) in [(2, 1), (1, 2)]
    elif piece == 'B':
        return isClearPath(board, fromPos, toPos, isDiagonal=True)
    elif piece == 'R':
        return isClearPath(board, fromPos, toPos) and (fromRow == toRow or fromCol == toCol)
    elif piece == 'Q':
        return isClearPath(board, fromPos, toPos, isDiagonal=True) or isClearPath(board, fromPos, toPos)
    elif piece == 'K':
        return abs(fromRow - toRow) <= 1 and abs(fromCol - toCol) <= 1
    return False

def movePiece(board, fromPos, toPos):
    fromRow, fromCol = parsePosition(fromPos)
    toRow, toCol = parsePosition(toPos)
    board[toRow][toCol] = board[fromRow][fromCol]
    board[fromRow][fromCol] = "--"

def main():
    board = initializeBoard()
    #printBoard(board)
    moves = input().split(", ")
    turn = 'w'

    for move in moves:
        parts = move.split()
        if len(parts) != 4:
            print(f"error {move}")
            break
        color, piece, fromPos, toPos = parts

        if color != turn:
            print(f"error {move}")
            break

        fromRow, fromCol = parsePosition(fromPos)
        actualPiece = board[fromRow][fromCol]
        if actualPiece == "--" or actualPiece[0] != color or actualPiece[1].upper() != piece:
            print(f"{'White' if turn == 'w' else 'Black'} move: {piece} {fromPos} {toPos}")
            print(f"error {move}")
            break

        if not isValidMove(board, color, piece, fromPos, toPos):
            print(f"{'White' if turn == 'w' else 'Black'} move: {piece} {fromPos} {toPos}")
            print(f"error {move}")
            break

        tempBoard = [row[:] for row in board]
        movePiece(tempBoard, fromPos, toPos)
        if isKingInCheck(tempBoard, color):
            print(f"{'White' if turn == 'w' else 'Black'} move: {piece} {fromPos} {toPos}")
            print(f"error {move}")
            break
        
        print(f"{'White' if turn == 'w' else 'Black'} move: {piece} {fromPos} {toPos}")
        movePiece(board, fromPos, toPos)
        printBoard(board)

        if isCheckmate(board, 'b' if turn == 'w' else 'w'):
            print(f"{'white' if turn == 'w' else 'black'} win!")
            break

        turn = 'b' if turn == 'w' else 'w'

main()