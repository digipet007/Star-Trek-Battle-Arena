$(document).ready(function() {
    //object lists each character's stats
    var characters = {
        "worf" : {
            "name" : "Worf",
            "imageURL" : "assets/images/worf.jpg",
            "health" : 101,
            "attackPower" : 10,
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
    //stores number of defeated opponents
    var deaths = 0;

    //FUNCTIONS -------------------------------------------------------------------------
    //This function will render a character card to the page when called
    var renderEm = function(character, renderArea, charStatus) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='characterTitle'>").text(character.name);
        var charImage = $("<img alt='character image' class='pic'>").attr("src", character.imageURL);
        var charHealth = $("<div class='characterHealth'>").text(character.health); 
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
        //if the charStatus argument for renderEm function is "enemy"...
        if (charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }
        else if (charStatus === "defender"){ 
            //empty variable, currDefender, is assigned the current defender's info
            currDefender = character;
            $(charDiv).addClass("target-enemy"); 
        }
    }
    //function for directions
    var renderMessage = function(message) {
        var gameMessage = $("#directions");
        var newMessage = $("<div>").text(message);
        gameMessage.append(newMessage);
        if (message === "clearMessage"){
            gameMessage.text("");
        }
    }
    //renders the characters as a string
    //parameters: 1) the character to be rendered 2) in which ID they will be rendered   
    var renderCharacters = function(charobj, areaRender) {
    //conditional checks to see if we are targeting the desired HTML section
        if (areaRender === "#character-pictures") {
            //empty the defender div first, since different characters will cycle through here.
            $(areaRender).empty();
            for (var key in charobj) {
                //make sure the object is not empty
                if (key in charobj) {
                    //renders a div for every object in the characters object
                    renderEm(charobj[key], areaRender, "");
                }
            }
        }
        //Selected character will appear in the yourCharacter div
        if(areaRender === "#yourCharacter") {
            renderEm(charobj, areaRender, "");
        }
        //enemies (sorted below), will render to the #enemiesAvailableToAttackDiv
        if(areaRender === "#enemiesAvailableToAttack") {
            choosingEnemy = true;
            
            //Loop through combatants array; charStatus of "enemy" will assign it .enemy class
            for(var i = 0; i < charobj.length; i++){
                renderEm(charobj[i], areaRender, "enemy"); 
            }
            //on click event for each enemy
            $(document).on("click", ".enemy", function(){
                var name = ($(this).attr("data-name"));
                //check to make sure there are not yet defenders
                if ($("#defender").children().length <=1) {
                    renderCharacters(name, "#defender"); 
                    $("#enemiesAvailableToAttack").hide(); 
                    renderMessage("clearMessage");
                    choosingEnemy = false;
                }
            })
        }
        //make sure the selected enemy needs to be rendered to the #defender div. If so, render
        if (areaRender === "#defender") {
            $(areaRender).empty(); 
            for (var i = 0; i < combatants.length; i++){
                if(combatants[i].name === charobj){  
                    renderEm(combatants[i], areaRender, "defender");
                }
            }
        }
        // render defender health stats over again
        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderEm(charobj, "#defender", "defender");
        }
        //render your character's health stats all over again
        if (areaRender === "enemyDamage") {
            $("#yourCharacter").empty();
            renderEm(currentlySelectedCharacter, "#yourCharacter", ""); 
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
    //function call to render all characters to the starting area to begin the game
    renderCharacters(characters, "#character-pictures");

    //on click event for selecting main character. Only happens once in the game
    $(document).on("click", ".character", function() {
        if (choosingEnemy === false && hasSelectedCharacter === false){
            //"name" is given the value of the attribute data name of the selected DOM element/ div (aka: "this"). 
            //The variable stores the data-name of WHATEVER character is clicked on.
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
                        combatants.push(characters[key]);
                    }
                }
                $("#character-pictures").hide();
                renderCharacters(currentlySelectedCharacter, "#yourCharacter");
                choosingEnemy = true; 
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
            currDefender.health -= currentlySelectedCharacter.attackPower;
            //attack power increases by 6 each time your caracter attacks
            currentlySelectedCharacter.attackPower += 6;
            if (currDefender.health > 0) {
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
                    var index = combatants.indexOf(currDefender);
                    for (var key in combatants) {
                        if (combatants[key] !== combatants[index]) {
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
                if (deaths >= 3) {
                    renderMessage("clearMessage");
                    restartGame("You are the undefeated champion!!");
                    $("#fightSection").hide();
                    $("#attackButton").hide();
                }
            }
        }
    })
});