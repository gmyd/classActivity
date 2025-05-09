// Function to check the user input for the exercise
function checkExercise() {
    let answer = document.querySelector("textarea").value;
    let feedback = document.getElementById("feedback");
    if (answer.trim() === "Large") {
        feedback.innerHTML = "✅ Correct!";
        feedback.style.color = "#27ae60";
    } else {
        feedback.innerHTML = "❌ Try Again!";
        feedback.style.color = "#e74c3c";
    }
}

// Game Questions Array
let questions = [
    {question: "What is the output of console.log(5 > 3)?", answer: "true"},
    {question: "How do you declare a variable in JavaScript?", answer: "let x;"}
];
let index = 0;

// Function to load questions
function loadQuestion() {
    if (index < questions.length) {
        $("#question").text(questions[index].question);
    } else {
        alert("Game Over! Check the leaderboard!");
        window.location.href = 'leaderboard.html';
    }
}

// Event Listener for Submit Button
$("#submit").click(function(){
    let userAnswer = $("#answer").val().trim();
    if(userAnswer === questions[index].answer) {
        alert("Correct!");
        index++;
        $("#answer").val("");
        loadQuestion();
    } else {
        alert("Wrong answer, try again!");
    }
});

// Initial Load of the First Question
loadQuestion();

// Contact Form Submission with Feedback
$(document).ready(function(){
    $("#contactForm").on("submit", function(event){
        event.preventDefault(); // Prevent default form submission

        // Form validation (basic)
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var comment = $("#comment").val().trim();
        
        if (name === "" || email === "" || comment === "") {
            $("#feedback").html("<p style='color: red;'>Please fill out all fields!</p>");
            return;
        }
        
        // Check if email is valid
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            $("#feedback").html("<p style='color: red;'>Please enter a valid email address!</p>");
            return;
        }

        // Display feedback after form submission
        $("#feedback").html("<p style='color: green;'>Thank you for your comment!</p>");
        
        // After 3 seconds, update the feedback message
        setTimeout(function() {
            $("#feedback").html("<p style='color: green;'>Your comment has been submitted successfully!</p>");
        }, 3000); // Delay for 3 seconds before changing message
    });
});
