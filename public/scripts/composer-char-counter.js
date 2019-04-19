
$(document).ready(function() {
  $("textarea").on("keypress input propertychange paste cut change", function() {

    let lettersLeft = (140 - $(this).val().length)
    let counterObject = $(".counter").text((140 - $(this).val().length))        //changes the counter object in the compose tweet footer inthe HTML to display character limit
    counterObject.text(lettersLeft)

    if (lettersLeft < 0){                                                       //changes color of the character counter
      counterObject.css({color: 'red'})
    } else {
      counterObject.css({color: 'black'})
    }
  })
})