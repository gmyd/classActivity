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


// ========== AJAX: Load local JSON data ==========
function loadLocalData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('localDataOutput');
            if (output) {
                output.innerHTML = `<p><strong>Language:</strong> ${data.language}</p>
                                    <p><strong>Difficulty:</strong> ${data.difficulty}</p>
                                    <p>${data.message}</p>`;
            }
        })
        .catch(error => console.error('Error fetching local data:', error));
}

// ========== AJAX: Fetch random quote from external API ==========
function loadExternalQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quoteEl = document.getElementById('quoteOutput');
            if (quoteEl) {
                quoteEl.innerHTML = `<blockquote>"${data.content}"</blockquote><p>- ${data.author}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            const quoteEl = document.getElementById('quoteOutput');
            if (quoteEl) {
                quoteEl.innerHTML = "Failed to load quote.";
            }
        });
}


document.addEventListener("DOMContentLoaded", function () {
    // Local JSON veri çekme
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("quoteContainer").innerText = data.quote || "No quote found.";
        })
        .catch(error => {
            console.error("Error loading local JSON:", error);
            document.getElementById("quoteContainer").innerText = "Failed to load local quote.";
        });

    // Harici API'den veri çekme
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById("externalQuote").innerText = data.content || "No quote received.";
        })
        .catch(error => {
            console.error("Error fetching external quote:", error);
            document.getElementById("externalQuote").innerText = "Failed to load external quote.";
        });
});