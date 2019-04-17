
$(document).ready(function() {
  $("textarea").on("keypress input propertychange paste cut change", function() {

    let lettersLeft = (140 - $(this).val().length)
    let counterObject = $(".counter").text((140 - $(this).val().length))
    counterObject.text(lettersLeft)

    if (lettersLeft < 0){
      counterObject.css({color: 'red'})
    } else {
      counterObject.css({color: 'black'})
    }
  })
})