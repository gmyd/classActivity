$(document).ready(function() {
    $("#birthday").datepicker({
        changeMonth: true,  
        changeYear: true,  
        yearRange: "1900:2025" 
      });
  
    var languages = [
      "JavaScript",
      "Python",
      "Java",
      "C",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Swift",
      "Go",
      "TypeScript"
    ];
  
    $("#language").autocomplete({
      source: languages
    });
  });
  