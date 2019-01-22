$(document).ready(function() {
  let tweetTextarea = $("main section form textarea");

  tweetTextarea.on("input", function(event) {
    let changedTextarea = $(this);

    //select the counter using sibling function
    let textareaCounter = $($(this).siblings("span"));
    let charsLeft = 140 - changedTextarea.val().length;

    //add class that changes font colour to red if counter is negative
    if(charsLeft < 0){
      textareaCounter.addClass("charLimit");
    } else {
      textareaCounter.removeClass("charLimit");
    }

    textareaCounter.html(charsLeft);
  });
});