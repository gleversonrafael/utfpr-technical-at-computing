document.getElementById("mediaForm").addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();    
    const values = obtainValues();

    calculateMedias(values);
})



// function
function calculateMedias(valueArray) {
    // entry
    const valuesValidation = true;
    outputMethods = [];

    // process
    if(valuesValidation === true) {
        outputMethods.push(calculateAndShowAll);
 
    } else {
        outputMethods.push(() => alert("Insira valores válidos!"));
    }
    
    // output
    outputMethods.forEach(method => method());


    //sub functions
    function calculateAndShowAll() {
        console.log("calculateAndShowAll has been called");

        const calculusTypes = ["geometric", "weighted", "harmonic", "arithmetic"];

        for(let selected = 0; selected < calculusTypes.length; selected++) {
            const equation = obtainEquationResult(calculusTypes[selected]);
            
            document.querySelector(`#${calculusTypes[selected]}Output span`).textContent = equation;
        }


        function obtainEquationResult(selectedEquation) {
            // used data = valueArray
            let response;

            switch(selectedEquation) {
                case "geometric":
                    response = (valueArray[0]*valueArray[1]*valueArray[2])**(1/3);                    
                    break
    
                case "weighted":
                    response = (valueArray[0] + 2*valueArray[1] + 3*valueArray[2])/6;
                    break
                
                case "harmonic":
                    response = 1/((1/valueArray[0]) + (1/valueArray[1]) + (1/valueArray[2]) )
                    break

                case "arithmetic":
                    response = (valueArray[0] + valueArray[1] + valueArray[1])/3;
                    break
    
                default:
                    response = "Equação Inválida!";
                    break
            }

            return response;
        }
    }
}


function obtainValues() {
    let values = Array.from(document.querySelectorAll("#mediaForm .value"));

    for(let selected = 0; selected < values.length; selected++) {
        values[selected] = parseFloat(values[selected].value);
    };

    return values
}