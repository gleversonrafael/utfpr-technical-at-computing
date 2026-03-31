document.querySelector("#bountyForm").addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    obtainAndShowResults();

});


function obtainAndShowResults() {
    let marineOfficer = document.querySelector("#marineOfficer").value,
        capturedPirate = document.querySelector("#capturedPirate").value,
        pirateBounty = parseFloat(document.querySelector("#pirateBounty").value),
        monthNumber = parseInt(document.querySelector("#monthNumber").value),
        finalBounty, officerReward, treasureReward, bonus
    ;

    obtainFinalBounty();
    obtainOfficerAndTreasureReward();

    document.querySelector("#outputSection").innerHTML = `
    <p> Captured Pirate: ${capturedPirate} </p> 
    <p> Regular Bounty: ${pirateBounty} berries </p>
    <p> Bonus: ${bonus} berries </p>
    <p> Final bounty: ${finalBounty} berries </p>
    <p> Marine Officer: ${marineOfficer} </p> <p> Officer Reward: ${officerReward} berries </p> <p> Marine's treasure reward: ${treasureReward} berries </p>
    `;

    console.log("B" + treasureReward);
    

    // Complementary functions
    function obtainFinalBounty() {
        //
        console.log(monthNumber);

        switch(monthNumber) {
            case(1 || 2):
                console.log("teste infeliz");
                bonus = 0;
                break;

            case(4 || 5 || 6):
                console.log("ABRIL")
                bonus = 2000;
                break;

            case(7 || 8 || 9):
                console.log("JUNHO");
                bonus = 3000;
                break;

            case(10 || 11 || 12):
                console.log("ASDASDASDAS");
                bonus = 1000;
                break;

            default: 
                bonus = 0;
                break;
        }

        finalBounty = pirateBounty + bonus;
    }


    function obtainOfficerAndTreasureReward() {
        switch(marineOfficer) {
            case "Smoker": 
                officerReward = finalBounty >= 5000 ? finalBounty * (40/100) : 0;
                break;

            case "Tashigi":
                officerReward = finalBounty * (35/100);
                break;

            case "Koby":
                officerReward = finalBounty > 50000 ? finalBounty * (33/100) : finalBounty * (30/100);
                break;

            case "Garp":
                officerReward = finalBounty*(finalBounty > 100000 ? (41/100) : (38/100));
                break;

            default:
                officerReward = 0;
                break;
        }
        
        treasureReward = finalBounty - officerReward;
    }
}