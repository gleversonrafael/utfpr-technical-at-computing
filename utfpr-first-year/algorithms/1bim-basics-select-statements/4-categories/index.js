function callMainFunction(submitEvent) {
    submitEvent.preventDefault();
    categorize();
}

function categorize() {
    //E
    let userData = {
        name: document.querySelector("#userName").value,
        age: document.querySelector("#userAge").value,
        gender: document.querySelector("#userGender").value,
        sport: document.querySelector("#userSport").value
    };

    //P
    let userCategory;
    
    obtainUserCategory();
    Object.defineProperty(userData, "category", {
        value: userCategory, 
        configurable: true,
        enumerable: true,
    });

    //S
    const outputSpan = document.querySelector("#output");
    outputSpan.innerHTML = `
    <ul> 
        <li> Nome: ${userData.name} </li>
        <li> Idade: ${userData.age} </li>
        <li> Gênero: ${userData.gender} </li>
        <li> Modalidade: ${userData.sport} </li>
        <li> Categoria: ${userData.category} </li>

    </ul>`

    //
    function obtainUserCategory() {
        if(userData.gender === "m") {
            userData.gender === "Masculino";
    
            switch(userData.sport) {
                case "Futsal":
                    if(userData.age >= 18){
                        userCategory = "Adulto";
    
                    } else if(userData.age >= 16) {
                        userCategory = "Sub16";
    
                    } else if(userData.age >= 12) {
                        userCategory = "Sub12";
                    
                    } else {
                        userCategory = "Inadequada"
                    };
    
                    break;
    
                case "Basquete":
                    if(userData.age > 40) {
                        userCategory = "Veteranos";
    
                    } else if(userData.age > 18) {
                        userCategory = "Adulto";
                    
                    } else if(userData.age > 16){
                        userCategory = "Sub18"
                    
                    } else if(userData.age > 12) {
                        userCategory = "Sub12"
                    
                    } else {
                        userCategory = "Indisponível";
                    }
    
                    break;
    
                default:
            }
    
        } else {
            userData.gender === "Feminino";
    
            switch(userData.sport) {
                case "Futsal":
                    if(userData.age > 15){
                        userCategory = "Adulto";
    
                    } else if(userData.age > 12) {
                        userCategory = "Sub15";
                    
                    } else {
                        userCategory = "Sub13"
                    }
    
                    break;
    
                case "Basquete":
                    if(userData.age > 40) {
                        userCategory = "Veteranos";
    
                    } else if(userData.age > 18) {
                        userCategory = "Adulto";
                    
                    } else if(userData.age > 16){
                        userCategory = "Sub18"
                    
                    } else if(userData.age > 12) {
                        userCategory = "Sub12"
                    
                    } else {
                        userCategory = "Indisponível";
                    } 
    
                    break;
    
                default:
            }
        }
    }
}