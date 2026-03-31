// main data
let magicSquare;
let matrixOrder;

generateEvents();


function createMagicSquare() {
    // if fill is used on magic square, each array is treated as a single object, so therefore if any array is changed, all the others are changed too.
    magicSquare = new Array(matrixOrder);

    for(let thisKey = 0; thisKey < magicSquare.length; thisKey++) 
        magicSquare[thisKey] = new Array(matrixOrder).fill('');    
}

function fillMagicSquare() {
    let line, column;

    // insert one
    line = (matrixOrder - 1) / 2;
    column = matrixOrder - 1;
    magicSquare[line][column] = 1;

    // insert anothers
    for(let number = 2; number <= matrixOrder * matrixOrder; number++) {
        line = ++line >= matrixOrder ? line - matrixOrder : line;
        column = ++column >= matrixOrder ? column - matrixOrder : column;
    
        while(typeof(magicSquare[line][column]) === 'number') {
            line = line + 2 >= matrixOrder ? line + 2 - matrixOrder : line + 2;
            column = ++column >= matrixOrder ? column - matrixOrder : column;
        }

        magicSquare[line][column] = number;
    }
}

function showMagicSquare() {

}


// aside
function generateEvents() {
    document.querySelector("#magicSquareForm").addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();

        matrixOrder = parseInt(document.querySelector("#matrixOrder").value);
        const OUTPUT_HTML = document.querySelector(".feedbackSection");

        if(matrixOrder % 2 == 1) {
            createMagicSquare();
            fillMagicSquare();
            showMagicSquare();

            OUTPUT_HTML.querySelector("p").innerHTML = "Matrix order: " + matrixOrder;
            
        } else {
            OUTPUT_HTML.querySelector("p").innerHTML = "Matrix order is not odd. Please insert a odd value.";
        }
    });
}


