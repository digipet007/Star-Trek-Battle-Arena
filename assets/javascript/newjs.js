$(document).ready(function() {

    //setup variables
    var chosenMainCharacter = false;
    var chosenDefender = false;

    //Establish object listing each character's health, attack power, and counter attack power
    var characters = {
        "worf" : {
            "name" : "Worf",
            "imageURL" : "assets/images/worf.jpg",
            "health" : 70,
            "attackPower" : 20,
            "counterAttackPower" : 10,
            "willFight" : false,
            "potentialEnemy" : false,
            // "currentlySelectedCharacter": false
        },
        "picard": {
            "name" : "Picard",
            "imageURL" : "assets/images/picard-1200x680.jpg",
            "health" : 50,
            "attackPower" : 10,
            "counterAttackPower" : 40,
            "willFight" : false,
            "potentialEnemy" : false,
            // "currentlySelectedCharacter": false
        },
        "spock": {
            "name" : "Spock",
            "imageURL" : "assets/images/spock-1024x536.jpg",
            "health" : 33,
            "attackPower" : 33,
            "counterAttackPower" : 34,
            "willFight" : false,
            "potentialEnemy" : false,
            // "currentlySelectedCharacter": false
        },
        "gorn": {
            "name" : "Gorn",
            "imageURL" : "assets/images/gorn.jpg",
            "health" : 60,
            "attackPower" : 20,
            "counterAttackPower" : 20,
            "willFight" : false,
            "potentialEnemy" : false,
            // "currentlySelectedCharacter": false
        }
    }

    var hasSelectedCharacter = false;
    var currentlySelectedCharacter;
    var combatants = [];

    //FUNCTIONS -------------------------------------------------------------------------
    //This function will render a character card to the page when called
    var renderEm = function(character, renderArea) {
        //creating divs, displayed names, and images using jQuery
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='characterTitle'>").text(character.name);
        var charImage = $("<img alt='character image' class='pic'>").attr("src", character.imageURL);
        var charHealth = $("<div class='characterHealth'>").text(character.health);
        //appends everything to the charDiv, then appends charDiv to target location add to end: 
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }
    //renderCharacter function renders the characters as a string.
    //parameters: 1) the character to be rendered 2) in which ID they will be rendered   
    var renderCharacters = function(charobj, areaRender) {
    //conditional checks to see if we are targeting the desired HTML section (specified as argument when calling the function)
        if (areaRender === "#character-pictures") {
            $(areaRender).empty();
            //for statement will loop through the properties of the object. Each time, the variable "key" will represent the property
            for (var key in charobj) {
                //if statement makes sure the object is not empty
                if (key in charobj) {
                    //renders a div for every object in the characters object
                    renderEm(charobj[key], areaRender);
                }
            }
        }
    }
    //note to self: function expressions (not declarations) must be called after the expression (acting as a variable)
    //function call to render all characters to the page
    renderCharacters(characters, "#character-pictures");

    //on click event for selecting main character
    $(document).on("click", ".character", function() {
        //"name" is given the value of the attribute data name of the selected DOM element/ div (aka: "this"). The variable stores the data-name of WHATEVER character is clicked on.
        var selectedName = $(this).attr("data-name");
        hasSelectedCharacter = true;
        if (selectedName === "Worf") {
            currentlySelectedCharacter = characters.worf;
            // combatants.push(characters.worf);
            // console.log(combatants);
        } 
        else if (selectedName === "Picard") {
            currentlySelectedCharacter = characters.picard;
            // combatants.push(characters.picard);
            // console.log(combatants);
        }
        else if (selectedName === "Spock") {
            currentlySelectedCharacter = characters.spock;
            // combatants.push(characters.spock);
            // console.log(combatants);
        }
        else {
            currentlySelectedCharacter = characters.gorn;
            // combatants.push(characters.gorn);
        //     console.log(combatants);
        }
        // console.log(selectedName);
        // console.log(characters);
        // console.log(currentlySelectedCharacter);



        //make sure there is no currently-selected character
        if (hasSelectedCharacter) {
            //loop through remaining characters and push them to the enemies array using for variable in object loop (used above as well)
            for (var key in characters) {
                if (characters[key] !== currentlySelectedCharacter) {

                // if (currentlySelectedCharacter !== key && key !== selectedName && key !== characters.name) {
                    console.log(characters[key]);
                    combatants.push(characters[key]);
                    // console.log(combatants);
                // if (key === selectedName)
                //     combatants.delete(characters[selectedName]);
                //     console.log(combatants);
                }
                // if (!characters.worf.currentlySelectedCharacter) {
                //     combatants.push(characters.worf);
                // }
                // else if (!characters.picard.currentlySelectedCharacter) {
                //     combatants.push(characters.picard);
                // }
                // else if (!characters.spock.currentlySelectedCharacter) {
                //     combatants.push(characters.spock);
                // }
                // else if (!characters.gorn.currentlySelectedCharacter) {
                //     combatants.push(characters.gorn);
                // } 
            }
        
        }
    })
});