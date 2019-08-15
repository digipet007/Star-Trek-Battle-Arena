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

// console.log(characters);
// console.log("chosenMainCharacter: " + chosenMainCharacter);
// console.log("chosenDefender: " + chosenDefender);

//choose main character

// function chooseMainCharacter(){
//     if(chosenMainCharacter === false){
//         for(var i = 0; i < characters.length; i++){

//         }
//     }
// }

$("#worfIcon").on("click", function(){
    if(!chosenMainCharacter){
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
        console.log("chosen main character? " + chosenMainCharacter)
        //debugging
        // console.log(characters);
        // console.log("chosenMainCharacter: " + chosenMainCharacter);
        // console.log("chosenDefender: " + chosenDefender); 
    }
    //else statement should start once chosenMainCharacter is set to true.
    //player will choose a defender
    //set chosen defender to true to begin battle in a separate function.
    else {
        // $("#worfIcon").on("click", function(){
            $("#defender").append(worfIcon);
            console.log("worf is chosen defender");
        // })

    }
})
$("#picardIcon").on("click", function(){
    if(!chosenMainCharacter){
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
        console.log("chosen main character? " + chosenMainCharacter)
        //debugging
        // console.log(characters);
        // console.log("chosenMainCharacter: " + chosenMainCharacter);
        // console.log("chosenDefender: " + chosenDefender); 
    }
    else {

    }
})

    $("#spockIcon").on("click", function(){
        if(!chosenMainCharacter){
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
            console.log("chosen main character? " + chosenMainCharacter)

            //debugging
            // console.log(characters);
            // console.log("chosenMainCharacter: " + chosenMainCharacter);
            // console.log("chosenDefender: " + chosenDefender);   

        }
        else {

        }
    })

    $("#gornIcon").on("click", function(){
        if(!chosenMainCharacter){
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
            console.log("chosen main character? " + chosenMainCharacter)
            //debugging
            // console.log(characters);
            // console.log("chosenMainCharacter: " + chosenMainCharacter);
            // console.log("chosenDefender: " + chosenDefender); 
        }
        else {

        }
    })





     

 

    // $("#picardIcon").on("click", function(){
    //     console.log(chosenDefender + " Picard clicked");
    //     // chosenMainCharacter = true;
    //     console.log(chosenMainCharacter + " 2");
    //     if(!chosenDefender && chosenMainCharacter){
    //         console.log("Picard will defend");
    //     }
    // })

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