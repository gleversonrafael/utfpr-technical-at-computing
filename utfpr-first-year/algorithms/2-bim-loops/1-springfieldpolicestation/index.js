// virtual database
let callsData  = {
    total: 0,

    dangerousDirection: 0,
    manyNoise: 0,
    drunk: 0,
    homer: 0,
}

let officers = {
    clancyData: { name: "chiefClancy", calls: 0 },
    eddieData: { name: "eddie", calls: 0 },
    louData: { name: "lou", calls: 0},
}


// general
assignEvents()
function assignEvents() {
    const allRadios = document.querySelectorAll("#registerCallForm input[type=radio]");
    allRadios.forEach((radio) => {
        radio.addEventListener("change", setHomerLevel)
    })

    document.getElementById("registerCallForm").addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        submitRegister();
    });


    function submitRegister() {
        const callObject = {
            type: document.querySelector("[name=callType]:checked").value,
            level: document.querySelector("[name=callLevel]:checked").value
        };

        registerCall(callObject);
    }

    function setHomerLevel() {
        const typeInput = document.querySelector("[name=callType]:checked"), 
            levelInput = document.querySelector("[name=callLevel]:checked");
        ;

        if(typeInput) console.log(typeInput.value);
        if(levelInput) console.log(levelInput.value);

        if((typeInput && levelInput) && (typeInput.value === "homer" && levelInput.value !== "3")) {
            console.log("activated");
            levelInput.removeAttribute("checked");
            document.querySelector("#dangerousCall").setAttribute("checked", "");
        }
    }
}


// main code
function registerCall(callObject) {
    // callObject = { type, level }
    // selectedOfficer = [ officerDataIdentifier, { officerData }]
    const selectedOfficer = obtainOfficer(callObject);

    officers[selectedOfficer[0]].calls += 1;
    callsData.total += 1
    callsData[callObject.type] += 1;

    refreshOutputedData();
}

function obtainOfficer(callObject) {
    let returnedOfficer;

    if(callObject.type === "homer") {
        returnedOfficer = ["clancyData", officers.clancyData];
    
    } else {
        // on each: [0] = selectedDataIdentifier | [1] = { name: n, calls: n }
        const officersArray = Object.entries(officers);

        for(let current = 0; current < officersArray.length; current++) {
            const officerData = officersArray[current][1];
            const calls = officerData.calls;

            if(current === 0 || (returnedOfficer && calls < returnedOfficer[1].calls)) {
                returnedOfficer = officersArray[current];
            }
        }
    }

    return returnedOfficer
}

function refreshOutputedData() {
    // update calls number
    Object.entries(officers).forEach((officer) => {
        const selectedTableData = document.querySelector(`#${officer[1].name}Output > .callsNumber`);
        selectedTableData.innerHTML = officer[1].calls;
    });

    // others
    document.querySelector("#homerCallsOutput > span").innerHTML = callsData.homer;
    document.querySelector("#directionCallsOutput > span").innerHTML = (callsData.dangerousDirection / callsData.total)*100 + "%";
}