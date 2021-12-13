var players = [
    {
       scoreTotal : 0,
       scoreCurrent :0,
       name: undefined
    },
    {
        scoreTotal : 0,
        scoreCurrent :0,
        name: undefined

     },
];
var playersLength = players.length - 1;
var currentPlayer;
var scoreWin;

function newGame(){
    $('#dice').replaceWith('<img class="dice" id="dice" value=1 alt="dice 1" src="images/dice_1.svg">');
    currentPlayer = 0;

    for(let i = 0; i <= playersLength; i++){
        players[i].scoreCurrent = 0;
        players[i].scoreTotal = 0;
        $('#current_score_p_'+[i]).html(0);
        $('#global_score_p_'+[i]).html(0);
    } 
    if($('#player_'+[0]).css('font-weight') >= 400){
        $('#player_'+[0]).css('font-weight', '400');
    }else{
        $('#player_'+[0]).css('font-weight', '+=300');
    }

    if($('.current-p-'+[0]).hasClass('not-displayed')){
        $('.current-p-'+[0]).removeClass('not-displayed');
    }
    $('#player_'+[1]).css('font-weight', '-=300');
    if(!$('.current-p-'+[1]).hasClass('not-displayed')){
        $('.current-p-'+[1]).addClass('not-displayed');
    }
}

function stopGame(){
    if(players[0].scoreTotal > players[1].scoreTotal){
        $("#winnerModal").modal('show');
        $(".winner").html(players[0].name+ ' a gagné !');
    } else if(players[0].scoreTotal== players[1].scoreTotal){ 
        $("#winnerModal").modal('show');
        $(".winner").html('Vous avez tous les deux gagné !');
        } else {
            $("#winnerModal").modal('show');
            $(".winner").html(players[1].name+' a gagné !');
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
    console.log($('#player_0').css);
    if(currentPlayer < playersLength){
        $('#player_'+[currentPlayer]).css('font-weight', '-=300');
            if(!$('.current-p-'+[currentPlayer]).hasClass('not-displayed')){
                $('.current-p-'+[currentPlayer]).addClass('not-displayed');
            } 
        currentPlayer++;
            $('#player_'+[currentPlayer]).css('font-weight', '+=300');
            if($('.current-p-'+[currentPlayer]).hasClass('not-displayed')){
                $('.current-p-'+[currentPlayer]).removeClass('not-displayed');
            } 
        }else{

        $('#player_'+[currentPlayer]).css('font-weight', '-=300');
            if(!$('.current-p-'+[currentPlayer]).hasClass('not-displayed')){
                $('.current-p-'+[currentPlayer]).addClass('not-displayed');
            } 
        currentPlayer = 0;
        $('#player_'+[currentPlayer]).css('font-weight', '+=300');
            if($('.current-p-'+[currentPlayer]).hasClass('not-displayed')){
                $('.current-p-'+[currentPlayer]).removeClass('not-displayed');
            } 
        }
    $('#dice').replaceWith('<img class="dice" id="dice" value=1 alt="dice 1" src="images/dice_1.svg">');

}

function getWinner(){
    scoreWin = $('#point').val();
    if(players[currentPlayer].scoreTotal >= scoreWin){
        $("#winnerModal").modal('show');

        $(".winner").html(players[currentPlayer].name + ' a gagné !');
        newGame();
        } else {
        players[currentPlayer].scoreCurrent = 0;
    }
}

function hold(){
    $('#current_score_p_'+[currentPlayer]).html(0);
    changePlayer(); 
    $('#current_score_p_'+[currentPlayer]).html(0);   
}
function setName(){
    
    for(i = 0; i <= playersLength; i++){

        if($('#player-'+i+'-name').val() == ''){

            players[i]['name'] = 'Joueur '+ (i+ 1);
            $('#player_'+i).html('Joueur '+ (i+ 1));

        } else {

            players[i]['name'] = $('#player-'+i+'-name').val();
            $('#player_'+i).html(players[i]['name']);

        }
    }
}

function checkInput(){
    if(scoreWin < 2){
        alert('hello');
    }
}

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        console.log(event);
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

$(document).ready(function(){ 

    currentPlayer = 0;

    // saisie seulement de chiffre dans la modale rulesModal
    setInputFilter(document.getElementById("point"), function(value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1000);
    });
  
    $('#rulesModal').modal('show');

    $('#rules').click(function(){
        $('#rulesModal').modal('show');
        
    })
    $('#new_game').click(function(){
        $('#rulesModal').modal('show');
    })

    $('#new_game_after_win').click(function(){
        $('#rulesModal').modal('show');
    
    })

    $('#go_button').click(function(e){
        if($('#point').val() <= 1){
            $('#alertModal').modal('show');
            $('#rulesModal').modal('show');
        }
        setName();
        newGame();
    })

    $('#stop_game').click(function(){
        stopGame();
    })

    $('#roll_dice').click(function(){

        //selectionne un nombre au hasard entre 1 et 6, affiche le dés correspondant et ajoute lavaleur au current score
        var number = Math.floor(Math.random() * 6) + 1;
        switch(number){
            case 1 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=1 alt="dice 1" src="images/dice_1.svg">');
                updateCurrent(0);
                break;

            case 2 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=2 alt="dice 2" src="images/dice_2.svg">');
                updateCurrent(number);
                break;

            case 3 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=3 alt="dice 3" src="images/dice_3.svg">');
                updateCurrent(number);
                break;
                
            case 4 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=4 alt="dice 4" src="images/dice_4.svg">');
                updateCurrent(number);
                break;
                
            case 5 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=5 alt="dice 5" src="images/dice_5.svg">');
                updateCurrent(number);
                break;
                
            case 6 : 
                $('#dice').replaceWith('<img class="dice" id="dice" value=6 alt="dice 6" src="images/dice_6.svg">');
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


