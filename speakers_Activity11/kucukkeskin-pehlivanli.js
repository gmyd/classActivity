"use strict";

$(document).ready(function() {
    $("#nav_list a").click(function(evt) {
        evt.preventDefault(); 

        let fileName = $(this).attr("title") + ".json";

        $.ajax({
            url: "json_files/" + fileName,
            dataType: "json",
            success: function(data) {
                let speaker = data.speakers[0];

                let html = `<h1>${speaker.title}</h1>
                            <img src="${speaker.image}" alt="${speaker.speaker}">
                            <h2>${speaker.month}<br>${speaker.speaker}</h2>
                            <p>${speaker.text}</p>`;

                $("main").empty().append(html);
            },
            error: function(xhr, status, error) {
                $("main").html("<p>An error occurred. Please try again.</p>");
                console.log("Hata:", status, error);
            }
        });
    });
});
