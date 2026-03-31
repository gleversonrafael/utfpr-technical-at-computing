let matrixes = {
    standard: [], 
    mirrored: []
}


function insertNumber() {
    console.log("Insert number");
}

function generateMatrix() {
    const output = document.querySelector("#output");
    let obtainedData = false;
    let lines, columns;

    try {
        lines = parseInt(document.querySelector("#lines").value);
        columns = parseInt(document.querySelector("#columns").value);

        if(isNaN(lines))
            throw new Error();

        else
            obtainedData = true; 

    } catch {
        output.innerHTML = "Matrix hasn't been generated. Values couldn't be obtained."
        return;
    }


    if(obtainedData) {
        matrixes.standard = [];

        for(let line = 0; line < lines; line++) {
            let column = obtainColumn(0, []);

            matrixes.standard.push(column);        
        }
    }

    // RECURSIVE FUNCTION...
    function obtainColumn(current, returnedArray) {
        if(current < columns) {
            return obtainColumn(current++);
        }

        return columnArray.push('')
    }
}