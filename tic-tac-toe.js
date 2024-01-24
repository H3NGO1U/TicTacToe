var turn = 'X';
var total_turns = 0;
var scores = {
    'X':0,
    'O':0
};
var scoreNodes = {};
var with_computer = false;
var selection = new Array();
var win_patterns = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0], // [0,1,2]
    [0, 0, 0, 1, 1, 1, 0, 0, 0], // [3,4,5]
    [0, 0, 0, 0, 0, 0, 1, 1, 1], // [6,7,8]
    [1, 0, 0, 1, 0, 0, 1, 0, 0], // [0,3,6]
    [0, 1, 0, 0, 1, 0, 0, 1, 0], // [1,4,7]
    [0, 0, 1, 0, 0, 1, 0, 0, 1], // [2,5,8]
    [1, 0, 0, 0, 1, 0, 0, 0, 1], // [0,4,8]
    [0, 0, 1, 0, 1, 0, 1, 0, 0], // [2,4,6]
];
function restartGame(){
    scores= {
        'X':0,
        'O':0
    };
    generateGame();
}
function generateGame() {
    turn = 'X';
    with_computer = document.getElementById("with_computer").checked;
    selection['X'] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    selection['O'] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    total_turns = 0;
    document.getElementById("game-board").innerHTML = '';
    let buttonId = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var button = document.createElement("input");
            button.setAttribute("class", "grid-cell");
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "markCheck(this)");
            button.setAttribute("id", buttonId);
            buttonId++;
            button.setAttribute("value", "   ");
            document.getElementById('game-board').appendChild(button);
        }
        var br = document.createElement("br");
        document.getElementById("game-board").appendChild(br);
    }

    if(with_computer){
         computer_turn = Math.random()<0.5;
          if(computer_turn) autoTurn(); //so sometimes computer starts and sometimes the opposite
    }

    var scoreO_element = document.createElement("h3");
    var scoreX_element = document.createElement("h3");
    scoreNodes = {
        'X':scoreX_element,
        'O':scoreO_element
    }
    scoreO_element.id = "scoreO";
    scoreX_element.id="scoreX";
    scoreO_element.innerHTML = "Score O: "+scores['O'];
    scoreX_element.innerHTML = "Score X: "+scores['X'];
    document.getElementById("game-board").appendChild(scoreO_element);
    document.getElementById("game-board").appendChild(scoreX_element);
}

function markCheck(obj) {
    obj.setAttribute("value", turn);
    obj.setAttribute("disabled", 'disabled');
    let cell = Number(obj.id);
    selection[turn][cell] = 1;
    if (turn == 'X') {
        obj.setAttribute("class", "red-player");
    }
    else {
        obj.setAttribute("class", "green-player");
    }
    
    total_turns++;
    gameEnded = false;
    if (checkWinning()) {
        gameEnded = true;
        setTimeout(function(){
            alert(turn + " has won the game!");
        },1);
        scores[turn]++;
        scoreNodes[turn].innerHTML = "Score "+turn+": "+scores[turn];
        disable();
    }
    else if (total_turns == 9) {
        alert("It's a draw!");
    }
    setTimeout(()=>(turn = turn == 'O' ? 'X' : 'O'), 1);

    if(!gameEnded && with_computer){
         computer_turn = !computer_turn;
         if(computer_turn){
             setTimeout(()=>autoTurn(),200);
         }
    }
}

function autoTurn() {
    let available_cells = [];
    let num_of_available = 0;
    for (let i = 0; i < 9; i++) {
        if (selection['X'][i] == 0 && selection['O'][i] == 0) {
            available_cells.push(i);
            num_of_available++;
        }
    }
    let chosen_cell = available_cells[Math.floor(Math.random() * (num_of_available - 1))];
    var desired_obj = document.getElementById(chosen_cell);
    markCheck(desired_obj);
}
function checkWinning() {
    for (let i = 0; i < win_patterns.length; i++) {
        if (isWinningPattern(selection[turn], win_patterns[i])){
            return true;
        }   
    }
    return false;
}

function isWinningPattern(cur_pattern, win_pattern) {
    let match = 0;
    for (let i = 0; i < 9; i++) {
        if (win_pattern[i] + cur_pattern[i] == 2)
            match++;
        if (match == 3)
            return true;
    }
    return false;
}

function disable() {
    var elements = document.getElementsByClassName("grid-cell");
    for (var i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
    }
}

