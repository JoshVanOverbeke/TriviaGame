
$( document ).ready(function() {

    var questions = [{
                ques: "How many sonnets did William Shakespeare write?",
                ans: ["154", "108", "136", "167"],
                name: "shakespeare",
                correct: "154",
                divClass: ".shakespeare"
            },
            {
                ques: "What year did the Lincoln penny debut?",
                ans: ["1898", "1897", "1909", "1902"],
                name: "penny",
                correct: "1909",
                divClass: ".penny"
            },
            {
                ques: "Where were cats once the most honored?",
                ans: ["USA", "France", "Greece", "Egypt"],
                name: "cats",
                correct: "Egypt",
                divClass: ".cats"
            },
            {
                ques: "In a quarter-mile race, which animal can be expected to win?",
                ans: ["lion", "pronghorn antelope", "giraffe", "quarter horse"],
                name: "race",
                correct: "pronghorn antelope",
                divClass: ".race"
            },
            {
                ques: "What is a fandango?",
                ans: ["a dance", "a food", "a hat", "a grass skirt"],
                name: "fandango",
                correct: "a dance",
                divClass: ".fandango"
            },
        ] // end questions object
    
    var labels = ["first", "second", "third", "forth"];
    
    // click to start then display quesions
    var startGame = $("#start-btn").on('click', function() {
        $(this).parent().hide();
        $('.container').show();
        countdown(30);
        questionDisplay();
    });
    
    // function for displaying questions
    var questionDisplay = function() {
        $(".questions :not('#sub-but')").empty();
        // loops through the 10 questions 
        for (var j = 0; j < 5; j++) {
            $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
            $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
            // loops through answers for each radio button
            for (var i = 0; i <= 3; i++) {
                $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
            }
            $('.questions').prepend('<hr />');
        }
    }
    
    
    // function for countdown timer
    var countdown = function(seconds) {
    
        var timer = setInterval(function() {
            seconds = seconds - 1;
            $("#time-remain").html(seconds);
    
            if (seconds <= 0) {
                $('.container').fadeOut(500);
                var correctAnswers = 0;
                var wrongAnswers = 0;
                var unAnswered = 0;
    
                // loop through correctArray & radioName to match html elements & answers
                for (var i = 0; i < 5; i++) {
    
                    if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
    
                        correctAnswers++;
                        console.log("this is correct! number:" + i)
                    } else {
                        wrongAnswers++;
                        console.log("this is wrong! number:" + i)
                    };
                }
                $('#correctTimesUp').append(correctAnswers);
                // display wrongAnswers
                $('#wrongTimesUp').append(wrongAnswers);
                $('#timesUp').fadeIn(1000).show();
    
                // alert("Times Up!");
                clearInterval(timer);
                return;
            }
        }, 1000);
    
        // click event for submit button to stop timer
        $('#sub-but').on('click', function() {
            clearInterval(timer);
        })
    }; // end countdown
    
    
    // function to grade quiz once submit button is clicked
    var gradeQuiz = $('#sub-but').on('click', function() {
    
        var correctAnswers = 0;
        var wrongAnswers = 0;
        var unAnswered = 0;
    
        // loop through correctArray & radioName to match html elements & answers
        for (var i = 0; i < 5; i++) {
    
            if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
    
                correctAnswers++;
            } else {
                wrongAnswers++;
            };
        };
    
        // once submit is clicked...
        // tests
        // stop timer
        countdown();
        // fade out questions
        $('.container').fadeOut(500);
        // show answerScreen
        $('#answerScreen').show();
        // display correctAnswers
        $('#correctScreen').append(correctAnswers);
        // display wrongAnswers
        $('#wrongScreen').append(wrongAnswers);
    
    }); // end gradeQuiz
    
    })