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
    
        function dataExists(thisFunction) {
            let response;

            try {        
                if(isNaN(thisFunction.lines) || isNaN(thisFunction.columns)) 
                    throw new Error(NaN);
                
                else if(thisFunction.lines <= 0 || thisFunction.columns <= 0)
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
    console.log(currentMatrix);
    console.log(currentMatrix.matrix);
}


// events
generateEvents();

function generateEvents() {
    document.querySelector("#generateMatrix").addEventListener("click", () => {
        currentMatrix = new matrixStructure();
        currentMatrix.generateMatrix(document.querySelector("#generateMatrixFeedback"));
    })

    document.querySelector("#insertNumberHTML").addEventListener("click", () => { 
        const number = parseFloat(document.querySelector("#insertDataHTML").value);

        currentMatrix.insertNumber(number);
        updateOutput();
    });
}