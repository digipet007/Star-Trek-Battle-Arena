$(document).ready(function() {
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
    };

    //booleans to control game flow and switch if statements on and off
    var hasSelectedCharacter = false;
    var choosingEnemy = false;
    //populated upon selection of character
    var currentlySelectedCharacter;
    //unselected characters are added to combatants
    var combatants = [];
    //populated once player selects an enemy
    var currDefender;

    //FUNCTIONS -------------------------------------------------------------------------
    //This function will render a character card to the page when called
    var renderEm = function(character, renderArea, charStatus) {
        //creating divs, displayed names, and images using jQuery
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='characterTitle'>").text(character.name);
        var charImage = $("<img alt='character image' class='pic'>").attr("src", character.imageURL);
        var charHealth = $("<div class='characterHealth'>").text(character.health);
        //appends everything to the charDiv, then appends charDiv to target location add to end: 
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
        //if the character is a defender, add the .enemy class
        if (charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }
        else if (charStatus === "defender"){
            // console.log("charStatus is defender");  //problem: this if statement is not being triggered by line 123
            //empty variable, currDefender is assigned the current defender's info
            currDefender = character;
            $(charDiv).addClass("target-enemy");
        }
    }
    //renderCharacter function renders the characters as a string.
    //parameters: 1) the character to be rendered 2) in which ID they will be rendered   
    var renderCharacters = function(charobj, areaRender) {
    //conditional checks to see if we are targeting the desired HTML section (specified as argument when calling the function)
        if (areaRender === "#character-pictures") {
            //empty the defender div first, since different characters will cycle through here.
            $(areaRender).empty();
            //for statement will loop through the properties of the object. Each time, the variable "key" will represent the property
            for (var key in charobj) {
                //if statement makes sure the object is not empty
                if (key in charobj) {
                    //renders a div for every object in the characters object
                    renderEm(charobj[key], areaRender, "");
                }
            }
        }
        //Selected character will appear in the yourCharacter div when this function is called with the appropriate argument.
        if(areaRender === "#yourCharacter") {
            renderEm(charobj, areaRender, "");
        }
        //When this function is called with the enemiesAvailableToAttack div argument, enemies (sorted below), will render to that div
        if(areaRender === "#enemiesAvailableToAttack") {
            choosingEnemy = true;
            
            //Loop through combatants array
            for(var i = 0; i < charobj.length; i++){
                renderEm(charobj[i], areaRender, "enemy"); //added enemy status loop in beginning of code then adds enemy class.
            }
            //on click event for each enemy
            $(document).on("click", ".enemy", function(){
                var name = ($(this).attr("data-name"));
                //check to make sure there are not yet defenders
                if ($("#defender").children().length <=1) {
                    // console.log("#defender characters are less than 1"); //checks out
                    renderCharacters(name, "#defender"); //potential problem?
                    $("#enemiesAvailableToAttack").hide(); //works! note: used to be $("this").hide();
                }
            })
        }
        //make sure the selected enemy needs to be rendered to the #defender div. If so, render
        if (areaRender === "#defender") {
            // console.log("#defender is areaRender"); //checks out
            $(areaRender).empty(); //feedback from console thumbs up
            console.log(charobj);
            
            for (var i = 0; i < combatants.length; i++){
                //console.log(combatants[i].name);
                // console.log("for loop in line 122 working"); //checks out
                if(combatants[i].name === charobj){  //potential problem: charobj is not part of the RenderEm function!
                    console.log(combatants[i].name); // problem: no feedback from console
                    renderEm(combatants, areaRender, "defender");
                }
            }
        }
    }
    //note to self: function expressions (not declarations) must be called after the expression (acting as a variable)
    //function call to render all characters to the starting area to begin the game
    renderCharacters(characters, "#character-pictures");

    //on click event for selecting main character
    $(document).on("click", ".character", function() {
        //"name" is given the value of the attribute data name of the selected DOM element/ div (aka: "this"). The variable stores the data-name of WHATEVER character is clicked on.
        var selectedName = $(this).attr("data-name");
        hasSelectedCharacter = true;
        if (selectedName === "Worf") {
            currentlySelectedCharacter = characters.worf;
        } 
        else if (selectedName === "Picard") {
            currentlySelectedCharacter = characters.picard;
        }
        else if (selectedName === "Spock") {
            currentlySelectedCharacter = characters.spock;
        }
        else {
            currentlySelectedCharacter = characters.gorn;
        }
        //make sure there is no currently-selected character
        if (hasSelectedCharacter & !choosingEnemy) {
            //loop through remaining characters and push them to the enemies array using for variable in object loop (used above as well) **Had to include characters[key] in if statement to facilitate mutual exclusivity of combatants
            for (var key in characters) {
                if (characters[key] !== currentlySelectedCharacter) {
                    // console.log(characters[key]);
                    combatants.push(characters[key]);
                }
            }
            // console.log(combatants);
            
            $("#character-pictures").hide();

            renderCharacters(currentlySelectedCharacter, "#yourCharacter");
            renderCharacters(combatants, "#enemiesAvailableToAttack");
        }
    })
});