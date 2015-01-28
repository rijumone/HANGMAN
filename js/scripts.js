
$(document).ready(function() {
    $('#input_text').focus();
});
var hangman_status = 0;
var game_on = false;
var empty_boxes = 0;
var last_seen = 0;
var trials = new Array();
$(document).keyup(function(event) {
    if (game_on == true) {
        //                    console.log(empty_boxes);
        if (event.which > 64 && event.which < 91) {
            if (String.fromCharCode(event.which) != '' && String.fromCharCode(event.which) != 'A' && String.fromCharCode(event.which) != 'E' && String.fromCharCode(event.which) != 'I' && String.fromCharCode(event.which) != 'O' && String.fromCharCode(event.which) != 'U') {
                var already_tried = false;
                for (var i = 0; i < trials.length; i++) {
                    if (String.fromCharCode(event.which) == trials[i]) {
                        already_tried = true;
                    }
                }
                if (already_tried == false) {
                    trials.push(String.fromCharCode(event.which));
                    //                                console.log(trials);

                    var err = true;
                    //                        $(this).val(String.fromCharCode(event.which).toUpperCase());
                    for (var i = 0; i < $('#input_text').val().length; i++) {
                        if (String.fromCharCode(event.which) == $('#input_text').val()[i]) {
                            //                        console.log(i);
                            empty_boxes--;
                            if (empty_boxes == 0) {
                                $('#hangman_' + hangman_status).hide();
                                $('#hangman_won').show();
                                $('#display_' + i).show();
                            } else {
                                $('#display_' + i).show();
                            }
                            err = false;

                        } else {

                        }

                    }
                    if (err == true) {
                        hangman();
                        $('#trials_div').append(String.fromCharCode(event.which) + ' ');
                    }
                }
            }
        }
    }
});
$('#input_text').on('input', function() {
    $(this).val($(this).val().toUpperCase());
});
$('#start').click(function() {
    //                $('#intro').animate({height: 0, opacity: 0});
    $('#intro').hide();
    //                setTimeout(function() {                    $('#intro').hide();                }, 500);
    //                setTimeout(function() {
    $('#playground').show();
    //                }, 400);
    $('#hint_display').append($('#hint_text').val());
    for (var i = 0; i < $('#input_text').val().length; i++) {
        if ($('#input_text').val()[i] != ' ') {
            $('#display_area').append('<div class="col-lg-1"><div class=""  id="display_' + i + '"><p><strong>' + $('#input_text').val()[i] + '</strong></p></div></div>');
            if ($('#input_text').val()[i] != 'A' && $('#input_text').val()[i] != 'E' && $('#input_text').val()[i] != 'I' && $('#input_text').val()[i] != 'O' && $('#input_text').val()[i] != 'U') {
                $('#display_' + i).hide();
                empty_boxes++;
            }
            game_on = true;
        } else {
            $('#display_area').append('<div class="col-lg-1"><div class="slash-div">/</div></div>');
        }
    }
    //                $('#display_' + Math.floor(Math.random() * 10)).hide();

});
/*  $('#try').on('input', function() {
 if ($(this).val() != '') {
 var err = true;
 $(this).val($(this).val().toUpperCase());
 for (var i = 0; i < $('#input_text').val().length; i++) {
 if ($(this).val() == $('#input_text').val()[i]) {
 //                        console.log(i);
 $('#display_' + i).show();
 err = false;
 } else {
 
 }
 }
 if (err == true) {
 hangman();
 }
 }
 });*/

function hangman() {
    /*hangman_status++;
     if (hangman_status == 1 || hangman_status == 5) {
     $('#hangman_' + hangman_status).show();
     } else {
     $('#hangman_' + hangman_status).css('display', 'inline-block');
     }*/

    $('#hangman_' + hangman_status).hide();
    hangman_status++;
    $('#hangman_' + hangman_status).show();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#input_text,#hint_text').keypress(function(event) {
    if (event.which == 13) {
        $('#start').trigger('click');
    }
});