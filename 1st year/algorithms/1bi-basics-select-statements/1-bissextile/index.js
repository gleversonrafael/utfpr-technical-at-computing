const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();

    const selectedYear = parseInt(document.querySelector("#bissextileYearInput").value);

    calculateBissextileYear(selectedYear);
})


function calculateBissextileYear(receivedYear) {
    // E
    let response;
    const outputSpan = document.querySelector("#outputSpan");

    //P 
    if(receivedYear > 1582) {
        if((receivedYear % 4 === 0 && receivedYear % 100 != 0) || (receivedYear % 400 === 0)) {
            response = "Sim!"
    
        } else {
            response = "Não!"

            if(receivedYear % 100 === 0) {
                response += " O ano é múltiplo de 4 e 100, mas não múltiplo de 400"
            }

        }
    
    } else [
        response = "Valor desconsiderado! Insira um valor maior que 1582."
    ]

    outputSpan.textContent = response;
}