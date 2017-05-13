



window.onload = function() {
  $("#start").on("click", trivia.start);
  $("#reset").on("click", trivia.reset);
  
  $("#answer1").on("click", function(){
  	trivia.chooseAnswer(0);
  });
  $("#answer2").on("click", function(){
  	trivia.chooseAnswer(1);
  });
  $("#answer3").on("click", function(){
  	trivia.chooseAnswer(2);
  });
  $("#answer4").on("click", function(){
  	trivia.chooseAnswer(3);
  });
trivia.reset();
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// Our trivia object
var trivia = {

	maxTime : 5,
	currentTime : 30,
	numCorrect : 0,
	numWrong : 0,
	numUnanswered : 0,
	currentQuestion : -1,
	questions: [
		{
			question: "Question: Which of the traditional five senses are dolphins believed not to possess?",
			answers: ["Smell", "taste", "touch", "sight"],
			correct: 0		
		},
		
		{
			question: "Question: A flamboyance is a group of what animal?",
			answers: ["seaguls", "turkeys", "flamingos", "alligators"],
			correct: 2		
		},
		
		{
			question: "Question: What is a group of whales called?",
			answers: ["A squad", "A band", "A pack", "A pod"],
			correct: 3		
		},

		{
			question: "Question: What is the proper term for a group of parrots?",
			answers: ["Pandemonium", "Brigade", "A pack", "A pod"],
			correct: 0		
		},

		{
			question: "Question: What animal has the largest ears?",
			answers: ["Basset Hound", "African Elephant", "Long-eared Rabbit", "Fennec Fox"],
			correct: 1		
		},

		{
			question: "Question: How many hearts does an octopus have?",
			answers: ["1", "2", "3", "4"],
			correct: 2		
		},

		{
			question: "Question: What are baby beavers called?",
			answers: ["Kids", "Pups", "Kittens", "Pins"],
			correct: 2		
		},

		{
			question: "Question: Which animal has the longest tongue relative to its total size?",
			answers: ["Pangolin", "Hummingbird", "Anteater", "Chameleon"],
			correct: 3		
		},



	],


  reset: function() {
  	$("#reset").hide();
  	$("#answers").hide();
  	$("#questions").hide();
  	$("#time-left").hide();
  	$("#results").hide();
  	$("#start").show();
  	trivia.currentQuestion = -1;
  	trivia.numCorrect = 0;
  	trivia.numWrong = 0;
  	trivia.numUnanswered = 0;


    

  },
  start: function() {
  	$("#start").hide();
  	$("#questions").show();
  	$("#time-left").show();
  	
  	trivia.nextQuestion();
    // DONE: Use setInterval to start the count here.
    
  },
  chooseAnswer: function(answer) {
  	if(answer === trivia.questions[trivia.currentQuestion].correct){
  		trivia.numCorrect++;
  		$("#questions").html("Correct!");


  	}
  	else if(answer === -1){
  		trivia.numUnanswered++;
  		$("#questions").html("YOU RAN OUT OF TIME!!! <br/><br/> The correct answer is " + trivia.questions[trivia.currentQuestion].answers[trivia.questions[trivia.currentQuestion].correct] + ".");

  	}
  	else {
		trivia.numWrong++;
  		$("#questions").html("WRONG!!! <br/><br/> The correct answer is " + trivia.questions[trivia.currentQuestion].answers[trivia.questions[trivia.currentQuestion].correct] + ".");
  	}
    // DONE: Use clearInterval to stop the count here.
    clearInterval(intervalId);
   $("#answers").hide();
   setTimeout(trivia.nextQuestion, 1000);
  },
  nextQuestion: function() {
  	//reset timer
  	trivia.currentTime = trivia.maxTime;

  	if(trivia.currentQuestion === trivia.questions.length-1){
  		trivia.gameOver();
  	}
  	else {

	  	//change question
	  	var currentQuestion = trivia.questions[++trivia.currentQuestion];
	  	$("#questions").html(currentQuestion.question)
	  	//change answers and timer
	  	$("#answer1").html(currentQuestion.answers[0]);
	  	$("#answer2").html(currentQuestion.answers[1]);
		$("#answer3").html(currentQuestion.answers[2]);
		$("#answer4").html(currentQuestion.answers[3]);
		 $("#answers").show();
	  	//start timer
	  	trivia.count();
	    intervalId = setInterval(trivia.count, 1000);
    }
  },

  gameOver: function() {
  	$("#answersCorrect").html("Correct Questions: " + trivia.numCorrect);
  	$("#answersWrong").html("Wrong Questions: " + trivia.numWrong);
  	$("#unanswered").html("Unanswered Questions: " + trivia.numUnanswered);
  	$("#results").show();
  	$("#reset").show();
  },
  count: function() {
	//check if timer is at 0.
	if(trivia.currentTime === 0) {
		trivia.chooseAnswer(-1);
		//display time is up screen.
	}
    // DONE: decrement time by 1.
	$("#time-left").html(trivia.currentTime--);
  
  },
  
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};