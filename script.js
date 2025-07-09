let legalSquares = [];
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByClassName("img")

function setupBoardSquares(){
    for (let i=0; i<boardSquares.length;i++){
        boardSquares[i].addEventListener("dragover" , allowDrop);
        boardSquares[i].addEventListener("drop" , drop);
        let row= 8-Math.floor(i/8);
        let column=String.fromCharCode(97+(i/8));
        let square=boardSquares[i];
        square.id = column+row
    }
}


