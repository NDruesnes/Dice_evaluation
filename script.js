//fonction gagnant si atteint x points ok
//fonction new game ok 
// fonction stop game
//fonction nom joueur
//fonction pt max
//fonction current player = point rouge a coté du houeur +couleur plus foncé (style font-weight=700)
var players = [
    {
       scoreTotal : 0,
       scoreCurrent :0 
    },
    {
        scoreTotal : 0,
        scoreCurrent :0 
     },
];
var playersLength = players.length - 1;
var currentPlayer = 0;
var scoreWin = 10;

function newGame(){

    $('#dice').replaceWith('<img class="dice" id="dice" value=1 alt="dice 1" src="img/dice_1.svg"></img>');
    for(let i = 0; i < playersLength; i++){
        players[i].scoreCurrent = 0;
        players[i].scoreTotal = 0;
        //gerer le changement de joueur ?
        $('#player_'+[i]).css('font-weight', '+=300');
        $('#current_score_p_'+[i]).html(0);
        $('#global_score_p_'+[i]).html(0);
    }
}

function stopGame(){
    if(players[0].scoreTotal > players[1].scoreTotal){
        $("#winnerModal").modal('show');
        $(".winner").html('Joueur 1 a gagné !');
    } else if(players[0].scoreTotal== players[1].scoreTotal){ 
        $("#winnerModal").modal('show');
        $(".winner").html('Vous avez tous les deux gagné !');
        } else {
            $("#winnerModal").modal('show');
            $(".winner").html('Joueur 2 a gagné !');
        }
    newGame();
}

function updateCurrent(score){
    if(score >= 1){
        players[currentPlayer].scoreCurrent += score;
        $('#current_score_p_'+[currentPlayer]).html(players[currentPlayer].scoreCurrent);
    } else {
        players[currentPlayer].scoreCurrent = 0;
        $('#current_score_p_'+[currentPlayer]).html(0);
        changePlayer();
    }
}

function updateScore(){
    players[currentPlayer].scoreTotal += players[currentPlayer].scoreCurrent;
    $('#global_score_p_'+[currentPlayer]).html(players[currentPlayer].scoreTotal);
}

function changePlayer() { 
    updateScore();
    getWinner();
    players[currentPlayer].scoreCurrent = 0;
    if(currentPlayer < playersLength){
        currentPlayer++;
    }else{
        currentPlayer = 0;
    }
}

function getWinner(){
    if(players[currentPlayer].scoreTotal >= scoreWin){
        $("#winnerModal").modal('show');
       
        currentPlayer += 1;
        $(".winner").html('Joueur ' + currentPlayer + ' a gagné !');
        // alert('Joueur ' + currentPlayer + ' a gagné');
        newGame();
        } else {
        players[currentPlayer].scoreCurrent = 0;
        // alert('joueur suivant');
    }
}

function hold(){
    // updateScore();
    $('#current_score_p_'+[currentPlayer]).html(0);
    changePlayer(); 
    $('#current_score_p_'+[currentPlayer]).html(0);   
}

$(document).ready(function(){ 

    $('#rulesModal').modal('show');

    $('#new_game').click(function(){
        newGame();
    })
    $('#go_button').click(function(){
        newGame();
    })
    $('#stop_game').click(function(){
        stopGame();
    })
    $('#roll_dice').click(function(){

        
        // console.log('player ' + currentPlayer + ' - total: ' +  players[currentPlayer].scoreTotal + ' current:' + players[currentPlayer].scoreCurrent);
        // console.log('joueur n=°'+currentPlayer);
        //selectionne un nombre au hasard entre 1 et §, affiche le dés correspondant et ajoute lavaleur au current score
        var number = Math.floor(Math.random() * 6) + 1;
        switch(number){
            case 1 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=1 alt="dice 1" src="img/dice_1.svg"></img>');
                updateCurrent(0);
                break;

            case 2 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=2 alt="dice 2" src="img/dice_2.svg"></img>');
                updateCurrent(number);
                break;

            case 3 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=3 alt="dice 3" src="img/dice_3.svg"></img>');
                updateCurrent(number);
                break;
                
            case 4 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=4 alt="dice 4" src="img/dice_4.svg"></img>');
                updateCurrent(number);
                break;
                
            case 5 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=5 alt="dice 5" src="img/dice_5.svg"></img>');
                updateCurrent(number);
                break;
                
            case 6 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=6 alt="dice 6" src="img/dice_6.svg"></img>');
                updateCurrent(number);
                break;

            default :
            alert('il y\' a un probleme');
        }    
    });

    $('#hold').click(function(){
        hold();
    });

});


