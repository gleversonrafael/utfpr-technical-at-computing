
function calculateNecessaryTiles() {
    // Entrada
    const ambientArea = parseFloat(document.querySelector("#ambientHeight").value)*parseFloat(document.querySelector("#ambientWidth").value);

    const ambientHeight = parseFloat(document.querySelector("#ambientHeight").value);
    const ambientWidth = parseFloat(document.querySelector("#ambientWidth").value);
    const floorHeight = parseFloat(document.querySelector("#floorHeight").value);
    const floorWidth = parseFloat(document.querySelector("#floorWidth").value);

    // Processamento
    // const ambientArea = ambientHeight*ambientWidth
    const floorAreaInMeters = floorHeight*floorWidth*10**(-2);
    let necessaryTiles = ambientArea / floorAreaInMeters;
    necessaryTiles += necessaryTiles*(10/100);
    necessaryTiles = necessaryTiles.toFixed(0);


    // Saída
    document.getElementById("result").innerText = necessaryTiles;
}