var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    $("display_results").onclick = displayResults;
    $("display_scores").onclick = displayScores;
    $("add").onclick = addScore;
    $("name").focus(); // başlangıçta name input'u odakta olsun
};

function displayResults() {
    var total = 0;
    var highest = scores[0];

    for (var i = 0; i < scores.length; i++) {
        total += scores[i];
        if (scores[i] > highest) {
            highest = scores[i];
        }
    }

    var average = (total / scores.length).toFixed(2);

    $("results").innerHTML = 
        "<h2>Results</h2>" +
        "<p>Average score is " + average + "</p>" +
        "<p>Highest score is " + highest + "</p>";
}

function displayScores() {
    var table = $("scores_table");
    
    
    table.innerHTML = 
		"<h2>Scores</h2>"+
        "<tr><th>Name</th><th>Score</th></tr>";

    for (var i = 0; i < names.length; i++) {
        var row = table.insertRow(-1); // sona satır ekle
        var nameCell = row.insertCell(0);
        var scoreCell = row.insertCell(1);
        nameCell.textContent = names[i];
        scoreCell.textContent = scores[i];
    }
	
}

function addScore() {
    var name = $("name").value.trim();
    var score = parseInt($("score").value);

    if (name === "" || isNaN(score) || score < 0 || score > 100) {
        alert("You must enter a name and a valid score");
    } else {
        names.push(name);
        scores.push(score);
        $("name").value = "";
        $("score").value = "";
        $("name").focus(); // yeni giriş için tekrar odağı name input'una getir
    }
}
