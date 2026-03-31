function callMainFunction(submitEvent) {
    submitEvent.preventDefault();
    writeNameTenTimes();
}

function writeNameTenTimes() {
    // E
    let selectedName, outputArea;

    try {
        selectedName = document.querySelector("#selectedName").value;
        outputArea = document.querySelector("p#outputParagraph");

        if(!selectedName || !outputArea) { throw Error()};
    
    } catch {
        alert("Insira um nome para prosseguir.");
    }

    //P + S
    outputArea.innerHTML = "";

    for(let current = 1; current <= 10; current++) {
        outputArea.innerHTML += `<br> ${selectedName} <br>`;
    }
}