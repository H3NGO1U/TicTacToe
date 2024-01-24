var y="x"
var Xscore = 0;
var Oscore = 0;

var compturn = false;

function generateGame(){
    x = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    o = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counter = 0;
    document.getElementById("game-board").innerHTML="";
    var buttonId = 0
    for(let row = 0; row<  3; row++){
        for(let col = 0; col < 3; col++){
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("class", "grid-cell");
        button.setAttribute("onclick", "markCheck(this)");
        button.setAttribute("value", " ");
        document.getElementById("game-board").appendChild(button);
        button.setAttribute("id", buttonId)
        buttonId++
        console.log(buttonId)
        }
        var breakline = document.createElement("br")
        document.getElementById("game-board").appendChild(breakline);
    }
}

const patterns= [[0,0,0,1,1,1,0,0,0],
[1,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,1,1,1],
[1,0,0,0,1,0,0,0,1],
[1,0,0,1,0,0,1,0,0],
[0,1,0,0,1,0,0,1,0],
[0,0,1,0,0,1,0,0,1],
[0,0,1,0,1,0,1,0,0]]

var x = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var o = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var counter = 0

//obj זה הכפתור שלוחצים אליו
function markCheck(obj){
    counter = counter + 1

    if (y=="x"){
        obj.setAttribute("value", "x");
        obj.setAttribute("class", "red-player");
        console.log("player X marked", obj.id);
        x[obj.id]=1
    }

    else if (y=="o"){
        obj.setAttribute("value", "o");
        obj.setAttribute("class", "green-player");
        console.log("player o marked", obj.id)
        o[obj.id]=1
    }

    var xwin = checkPlayerHasAnyWinningPattern(x);
    var owin = checkPlayerHasAnyWinningPattern(o);

    obj.setAttribute("disabled", "disabled");

    if (counter == 9 && !xwin && !owin) {
        window.alert("!DRAW! The game has ended");
        console.log("player x " + x);
        console.log("player o " + o);
    }
    if (xwin == true){
        EndGame();
        window.alert("player x has won!");
        console.log("player x " + x);
       console.log("player o " + o);
       Xscore++;
       document.getElementById("Xscore").innerHTML = Xscore;
    }
    else if (owin == true){
        EndGame();
        window.alert("player o has won!");
        console.log("player x " + x);
        console.log("player o " + o);
        Oscore++;
        document.getElementById("Oscore").innerHTML = Oscore;
    }
    else changeTurn();
}

    
function iswinningpattern(winpattern, moves){
    check_pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i<9; i++){
        check_pattern[i] = winpattern[i]*moves[i]
    }
    for (let j = 0; j<9; j++){
        if (check_pattern[j] != winpattern[j]){
            return false;
        }
    }
        return true;
}

function checkPlayerHasAnyWinningPattern(moves){
    for (let i=0; i<8; i++){
        var answeri = iswinningpattern(patterns[i], moves);
        if (answeri== true){
            return true;
        }
    }
    return false;
}

function EndGame(){
    for(let buttonId = 0; buttonId<9; buttonId++){
        document.getElementById(buttonId).setAttribute("disabled", "disabled");
    }
}

function reset(){
    document.getElementById("Xscore").innerHTML = Xscore = 0;
    document.getElementById("Oscore").innerHTML = Oscore = 0;
}

function changeTurn(){
	if (y == 'x') {
		y = 'o';
        console.log("Turn changed to: " + y);
		// if auto player selected
		if (compturn===true){ computer();
            console.log("Computer's turn");
        }
	}
	else y = 'x';
}

function compTrue(){
    compturn = true;
    console.log("computer player active")
}

function computer(){
    console.log("Computer is making a move...");
    var avail = []
    for (let i=0; i<9; i++){
        if (x[i]==0 && o[i]==0){
            avail.push(i);
        }
    }
    var RandomNum= Math.floor(Math.random()*avail.length);
    console.log(RandomNum);
    var compbutton= document.getElementById(avail[RandomNum]);
    markCheck(compbutton);
    console.log(compbutton);
}