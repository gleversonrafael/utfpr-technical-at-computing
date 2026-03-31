// general
let currentMatrix;

class matrixStructure {
    matrix; lines; columns; elementsInserted;

    constructor() {
        this.matrix = [];
    }

    generateMatrix(outputHTML) {
        this.lines = parseInt(document.querySelector("#linesNumber").value);
        this.columns = parseInt(document.querySelector("#columnsNumber").value);

        if(dataExists(this)) {
            this.elementsInserted = 0;
    
            for(let line = 0; line < this.lines; line++) {
                const theseColumns = new Array(this.columns).fill('');
                this.matrix.push(theseColumns);
            }
    
            outputHTML.innerHTML = "Success.";
        
        } else {
            outputHTML.innerHTML = "Lines or columns are out of bounds.";
        }
    
        function dataExists(thisObject) {
            let response;

            try {        
                if(isNaN(thisObject.lines) || isNaN(thisObject.columns)) 
                    throw new Error(NaN);
                
                else if(thisObject.lines <= 0 || thisObject.columns <= 0)
                    throw new Error()
        
                else 
                    response = true;
            
            } catch(Error) {
                response = false;
            }

            return response;
        }
    }

    insertNumber(number) {
        if(this.elementsInserted <= this.lines*this.columns) {
            debugger;

            // elementsInserted++ = nextPosition
            this.elementsInserted++;
            
            const thisLine = (this.elementsInserted / this.columns) - 1;
            const thisColumn = (this.elementsInserted - thisLine*this.columns) - 1;
    
            this.matrix[thisLine][thisColumn] = number;
        }
    }
}

function updateOutput() {
    const OUTPUT = document.querySelector("#outputSection > div");
    let generatedHTML = "";

    for(let line = 0; line < currentMatrix.lines; line++) {
        for(let column = 0; column < currentMatrix.columns; column++) {
            generatedHTML += currentMatrix.matrix[line][column] ? ` <div> ${currentMatrix.matrix[line][column]} </div>` : `<div> _ </div>`;
        }

        generatedHTML += '<br>'
    }

    OUTPUT.innerHTML = generatedHTML;
}


// events
generateEvents();

function generateEvents() {
    document.querySelector("#generateMatrix").addEventListener("click", () => {
        currentMatrix = new matrixStructure();
        currentMatrix.generateMatrix(document.querySelector("#generateMatrixFeedback"));

        updateOutput();
    })

    document.querySelector("#insertNumberHTML").addEventListener("click", () => { 
        const NUMBER = parseFloat(document.querySelector("#insertDataHTML").value);
        currentMatrix.insertNumber(NUMBER);

        updateOutput();
    });
}