$(document).ready(function() {

    //setup variables
    var chosenMainCharacter = false;
    var chosenDefender = false;

    //Establish object listing each character's health points, attack power, and counter attack power
    var characters = {
        "worf" : {
            "icon" : "#worfIcon",
            "healthPoints" : 70,
            "attackPower" : 20,
            "counterAttackPower" : 10,
            "willFight" : false,
            "potentialEnemy" : false
        },
        "picard": {
            "icon" : "#picardIcon",
            "healthPoints" : 50,
            "attackPower" : 10,
            "counterAttackPower" : 40,
            "willFight" : false,
            "potentialEnemy" : false
        },
        "spock": {
            "icon" : "#spockIcon",
            "healthPoints" : 33,
            "attackPower" : 33,
            "counterAttackPower" : 34,
            "willFight" : false,
            "potentialEnemy" : false
        },
        "gorn": {
            "icon" : "#gornIcon",
            "healthPoints" : 60,
            "attackPower" : 20,
            "counterAttackPower" : 20,
            "willFight" : false,
            "potentialEnemy" : false
        }
    }

console.log(characters);
console.log("chosenMainCharacter: " + chosenMainCharacter);
console.log("chosenDefender: " + chosenDefender);

//choose main character

// function chooseMainCharacter(){
//     if(chosenMainCharacter === false){
//         for(var i = 0; i < characters.length; i++){

//         }
//     }
// }

    $("#picardIcon").on("click", function(){
        if (chosenMainCharacter) {

        } 
        else {

        }
        $("#yourCharacter").append(picardIcon);
        $("#enemiesAvailableToAttack").append(worfIcon);
        $("#enemiesAvailableToAttack").append(spockIcon);
        $("#enemiesAvailableToAttack").append(gornIcon);
        $("#worfIcon").css("background-color", "red");
        $("#spockIcon").css("background-color", "red");
        $("#gornIcon").css("background-color", "red");
        $(".characterTitle").css("margin", "0px 0px 0px 0px"); //need to fix
        $("#directions").html("Directions: Select your enemy");
        $("#gornIcon").off("click");
        $("#worfIcon").off("click");
        $("#picardIcon").off("click");
        $("#spockIcon").off("click");
        characters.picard.willFight = true; 
        
        chosenMainCharacter = true;  
        console.log(chosenMainCharacter + " 1")

        //debugging
        // console.log(characters);
        // console.log("chosenMainCharacter: " + chosenMainCharacter);
        // console.log("chosenDefender: " + chosenDefender);             
    })

    if(!chosenMainCharacter) {
        $(function(){

            //if Worf is chosen
            $("#worfIcon").on("click", function(){
                $("#yourCharacter").append(worfIcon);
                $("#enemiesAvailableToAttack").append(picardIcon);
                $("#enemiesAvailableToAttack").append(spockIcon);
                $("#enemiesAvailableToAttack").append(gornIcon);
                $("#picardIcon").css("background-color", "red");
                $("#spockIcon").css("background-color", "red");
                $("#gornIcon").css("background-color", "red");
                $(".characterTitle").css("margin", "0px 0px 0px 0px"); //need to fix
                $("#directions").html("Directions: Select your enemy");
                $("#gornIcon").off("click");
                $("#worfIcon").off("click");
                $("#picardIcon").off("click");
                $("#spockIcon").off("click");
                characters.worf.willFight = true;
                
                chosenMainCharacter = true;
                console.log(chosenMainCharacter)

                //debugging
                // console.log(characters);
                // console.log("chosenMainCharacter: " + chosenMainCharacter);
                // console.log("chosenDefender: " + chosenDefender);
                //if Worf vs. Picard as defender
                // $("picardIcon").on("click", function(){
                //     console.log("working");
                // })
            })

            //if Picard is chosen
            $("#picardIcon").on("click", function(){
                $("#yourCharacter").append(picardIcon);
                $("#enemiesAvailableToAttack").append(worfIcon);
                $("#enemiesAvailableToAttack").append(spockIcon);
                $("#enemiesAvailableToAttack").append(gornIcon);
                $("#worfIcon").css("background-color", "red");
                $("#spockIcon").css("background-color", "red");
                $("#gornIcon").css("background-color", "red");
                $(".characterTitle").css("margin", "0px 0px 0px 0px"); //need to fix
                $("#directions").html("Directions: Select your enemy");
                $("#gornIcon").off("click");
                $("#worfIcon").off("click");
                $("#picardIcon").off("click");
                $("#spockIcon").off("click");
                characters.picard.willFight = true; 
                
                chosenMainCharacter = true;  
                console.log(chosenMainCharacter + " 1")

                //debugging
                // console.log(characters);
                // console.log("chosenMainCharacter: " + chosenMainCharacter);
                // console.log("chosenDefender: " + chosenDefender);             
            })

            //if Spock is chosen
            $("#spockIcon").on("click", function(){
                $("#yourCharacter").append(spockIcon);
                $("#enemiesAvailableToAttack").append(worfIcon);
                $("#enemiesAvailableToAttack").append(picardIcon);
                $("#enemiesAvailableToAttack").append(gornIcon);
                $("#picardIcon").css("background-color", "red");
                $("#worfIcon").css("background-color", "red");
                $("#gornIcon").css("background-color", "red");
                $(".characterTitle").css("margin", "0px 0px 0px 0px"); //need to fix
                $("#directions").html("Directions: Select your enemy");
                $("#gornIcon").off("click");
                $("#worfIcon").off("click");
                $("#picardIcon").off("click");
                $("#spockIcon").off("click");
                characters.spock.willFight = true;  
                
                chosenMainCharacter = true; 
                console.log(chosenMainCharacter)

                //debugging
                // console.log(characters);
                // console.log("chosenMainCharacter: " + chosenMainCharacter);
                // console.log("chosenDefender: " + chosenDefender);             
            })

            //if Gorn is chosen
            $("#gornIcon").on("click", function(){
                $("#yourCharacter").append(gornIcon);
                $("#enemiesAvailableToAttack").append(worfIcon);
                $("#enemiesAvailableToAttack").append(picardIcon);
                $("#enemiesAvailableToAttack").append(spockIcon);
                $("#picardIcon").css("background-color", "red");
                $("#spockIcon").css("background-color", "red");
                $("#worfIcon").css("background-color", "red");
                $(".characterTitle").css("margin", "0px 0px 0px 0px"); //need to fix
                $("#directions").html("Directions: Select your enemy");   
                $("#gornIcon").off("click");
                $("#worfIcon").off("click");
                $("#picardIcon").off("click");
                $("#spockIcon").off("click");
                characters.gorn.willFight = true; 
                
                chosenMainCharacter = true;
                console.log(chosenMainCharacter)
                //debugging
                // console.log(characters);
                // console.log("chosenMainCharacter: " + chosenMainCharacter);
                // console.log("chosenDefender: " + chosenDefender);       
            })
        })
    }

    $("#picardIcon").on("click", function(){
        console.log(chosenDefender + " Picard clicked");
        // chosenMainCharacter = true;
        console.log(chosenMainCharacter + " 2");
        if(!chosenDefender && chosenMainCharacter){
            console.log("Picard will defend");
        }
    })

    // if(characters.worf.willFight){
    //     alert("worf will fight");
    // }

    // if(chosenMainCharacter === true && chosenDefender === false && characters.worf.willFight === true) {
    //     $(function(){
    //         // $("#picardIcon").on("click", function(){
    //             alert("working");
    //         // })
    //     })
    // }

    // if(characters.worf.willFight === true){
    //     function potentEnemy(){
    //         characters.picard.potentialEnemy = true;
    //         characters.spock.potentialEnemy = true;
    //         characters.gorn.potentialEnemy = true;
    //     }
    // }

    // function potentEnemy(){
    //     if(character.potentialEnemy === true){
    //         $(characters.icon).on("click", function(){

    //         })
    //     }
    // }

    //if the main character has been chosen, player chooses enemy character

    //if worf is the main character
    // if(character.willFight === true) {
    //     $(function(){

            //if Picard is the enemy
            // $("#picardIcon").on("click", function(){
            //     alert("working");
                // $("#defender").append(picardIcon);

            // })
    //     })
    // }
 
    


    
    //create function for attack button and displaying new HP

});