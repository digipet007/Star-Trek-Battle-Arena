$(document).ready(function() {
    //Establish object listing each character's health, attack power, and counter attack power
    var characters = {
        "worf" : {
            "name" : "Worf",
            "imageURL" : "assets/images/worf.jpg",
            "health" : 100,
            "attackPower" : 18,
            "counterAttackPower" : 30,
        },
        "picard": {
            "name" : "Picard",
            "imageURL" : "assets/images/picard-1200x680.jpg",
            "health" : 110,
            "attackPower" : 8,
            "counterAttackPower" : 9,
        },
        "spock": {
            "name" : "Spock",
            "imageURL" : "assets/images/spock-1024x536.jpg",
            "health" : 123,
            "attackPower" : 10,
            "counterAttackPower" : 15,
        },
        "gorn": {
            "name" : "Gorn",
            "imageURL" : "assets/images/gorn.jpg",
            "health" : 100,
            "attackPower" : 8,
            "counterAttackPower" : 7,
        }
    };

    console.log(characters);

    //booleans to control game flow and switch if statements on and off
    var hasSelectedCharacter = false;
    var choosingEnemy = false;
    //populated upon selection of character
    var currentlySelectedCharacter;
    //unselected characters are added to combatants
    var combatants = [];
    //populated once player selects an enemy
    var currDefender;
    //counter variable to keep track of turns and serve as damage multiplier for character turns
    var turnCounter = 1;
    //stores number of defeated opponents
    var deaths = 0;

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
            // console.log("charStatus is defender");  
            //empty variable, currDefender is assigned the current defender's info
            currDefender = character;
            // console.log(currDefender); checks out
            $(charDiv).addClass("target-enemy"); //problem: does not assign class- fixed!!
        }
    }
    //function for messages
    var renderMessage = function(message) {
        var gameMessage = $("#directions");
        var newMessage = $("<div>").text(message);
        gameMessage.append(newMessage);
        //clear message
        if (message === "clearMessage"){
            gameMessage.text("");
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
                    renderCharacters(name, "#defender"); 
                    $("#enemiesAvailableToAttack").hide(); //works! note: used to be $("this").hide();
                    renderMessage("clearMessage");
                    choosingEnemy = false;
                }
            })
        }
        //make sure the selected enemy needs to be rendered to the #defender div. If so, render
        if (areaRender === "#defender") {
            // console.log("#defender is areaRender"); //checks out
            $(areaRender).empty(); //feedback from console thumbs up
            // console.log(charobj);
            
            for (var i = 0; i < combatants.length; i++){
                //console.log(combatants[i].name);
                // console.log("for loop in line 122 working"); //checks out
                if(combatants[i].name === charobj){  //fixed problem of not specifying index or the array of objects (aka combatants)
                    // console.log(combatants[i].name); // fixed!!
                    renderEm(combatants[i], areaRender, "defender");
                }
            }
        }
        // render defender health stats over again
        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderEm(charobj, "#defender", "defender");
            // console.log(charobj);
        }
        //render your character's health stats all over again
        if (areaRender === "enemyDamage") {
            $("#yourCharacter").empty();
            // console.log(currentlySelectedCharacter);
            renderEm(currentlySelectedCharacter, "#yourCharacter", ""); //fixed problem: thought defender was charobj AND currentlySelectedCharacter
        }
        //defeated enemy is removed
        if (areaRender === "enemyDefeated"){
            $("#defender").empty();
            var gameStateMessage = "You have defeated " + charobj.name + "! Choose another opponent";
            renderMessage(gameStateMessage);
        }
    }

    //Game restart function
    var restartGame = function(inputEndGame) {
        //restart button reloads the page
        var restart = $("<button>Restart</button>").click(function(){
            location.reload();
        })
        //create div to hold end of game message
        var gameState = $("<div>").text(inputEndGame);
        //render restart button and message
        $("#directions").append(gameState);
        $("#directions").append(restart);
    }
    //--------------------------------------------------------------------------
    //note to self: function expressions (not declarations) must be called after the expression (acting as a variable)
    //function call to render all characters to the starting area to begin the game
    renderCharacters(characters, "#character-pictures");

    //on click event for selecting main character. Only happens once in the game
    $(document).on("click", ".character", function() {
        if (choosingEnemy === false && hasSelectedCharacter === false){
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
                choosingEnemy = true; //not sure if this should be here...
                renderCharacters(combatants, "#enemiesAvailableToAttack");
            }
        }
    })
    //attack button on click function (kept as a separate function)
    $("#attackButton").on("click", function(){
        if ($("#defender").children().length !== 0){
            //game directions/updates
            var attackMessage = "You attacked " + currDefender.name + " for " + (currentlySelectedCharacter.attackPower) + " damage.";
            var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.counterAttackPower + " damage.";
            renderMessage("clearMessage");
            //reduce defender's health
            // console.log(currDefender); checks out now
            console.log(currentlySelectedCharacter.attackPower);
            currDefender.health -= currentlySelectedCharacter.attackPower;
            //attack power increases by 6 each time your caracter attacks
            currentlySelectedCharacter.attackPower += 6;
            console.log(currentlySelectedCharacter.attackPower);
            // console.log(currDefender); checks out now
            if (currDefender.health > 0) {
                // console.log("currDefender's health > 0"); //fixed problem: wasn't firing
                //update defender's/enemy's health on their display- completed in if statement in line 136
                renderCharacters(currDefender, "playerDamage"); 
                //render messages
                renderMessage(attackMessage);
                //reduce your health by defender's attack
                currentlySelectedCharacter.health -= currDefender.counterAttackPower;
                renderMessage(counterAttackMessage);
                //update your character's health on their display (if statement around line 140)
                renderCharacters(currentlySelectedCharacter, "enemyDamage"); 
            }
            //if you have less than zero health, call restart game function
            if (currentlySelectedCharacter.health <= 0){
                renderMessage("clearMessage");
                restartGame("You have been defeated.  Game over");
                $("#attackButton").unbind("click");
                choosingEnemy = true;
            }
            //if the enemy's HP drops to 0, they are defeated!
            else if (currDefender.health <=0){
                //enemy dies and disappears from the playing board
                renderCharacters(currDefender, "enemyDefeated");
                deaths++;
                choosingEnemy = true;
                $("#enemiesAvailableToAttack").empty();
                $("#enemiesAvailableToAttack").show();
                //gets the index of the defeated opponent
                if (deaths === 1){
                    console.log(deaths);
                    // console.log(combatants[index]); //checks out
                    //causes name in rendering functions to become undefined (maybe line 114):
                    // delete combatants[index];
                    var index = combatants.indexOf(currDefender);
                    for (var key in combatants) {
                        // console.log(combatants); checks out
                        //broke entire code. Game starts unrendered:
                        // if (characters[key] !== currentlySelectedCharacter && characters[key] !== combatants[index]) {
                        if (combatants[key] !== combatants[index]) {
                        // console.log(combatants[key]); //checks out!
                        // console.log(charobj); charobj is undefined
                        // $(combatants).empty();
                        // // console.log(characters[key]);
                        // combatants.push(characters[key]);
                        renderEm(combatants[key], "#enemiesAvailableToAttack", "enemy"); 
                        choosingEnemy = true;
                        }
                    }
                }
                if (deaths === 2){
                    console.log(deaths);
                    for (var key in combatants){
                    if (combatants[key].health > 0)
                    renderEm(combatants[key], "#enemiesAvailableToAttack", "enemy"); 
                    choosingEnemy = true;
                    }
                }
                // if (combatants[index].health <= 0) {
                //     (combatants[index]).detatch();
                // } 
                //also need to consolelog damage
                // $("div").remove(".target-enemy"); this class is removed after defeat
                // $(".target-enemy").hide();
                if (deaths >= 3) {
                    renderMessage("clearMessage");
                    restartGame("You are the undefeated champion!!");
                    $("#fightSection").hide();
                    $("#attackButton").hide();
                }
            }
        }
        turnCounter++;
    })
});