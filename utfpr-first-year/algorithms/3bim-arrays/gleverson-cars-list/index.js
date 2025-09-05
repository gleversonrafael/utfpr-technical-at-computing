//GV
let allCars = [];


//F
function addCar() {
    //E
    let car;
    const brand = document.querySelector("#carBrand").value,
        plate = document.querySelector("#licensePlate").value,
        model = document.querySelector("#carModel").value,
        year = document.querySelector("#year").value;

    //P
    if (brand && plate && model && year) {
        car = new Car(brand, plate, model, year);
        allCars.push(car);

    } else {
        alert("Please, insert all car details.");
    }
}

function showQueriedCars() {
    const output = document.querySelector("#outputParagraph"),
        queried = document.querySelector("#queriedBrand").value;

    output.innerHTML = '';

    for(let car of allCars) {
        if(queried === '' || (queried.length > 0 && car.carBrand === queried)) {
            output.innerHTML += `Car brand: ${car.carBrand} | Car model: ${car.carModel} | License plate: ${car.licensePlate} | Year: ${car.year} <br>`
        } 
    }
}