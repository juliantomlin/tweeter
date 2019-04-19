$(document).ready(function() {
  $('button.comp').click(function (){
    $('section.new-tweet').slideToggle("fast", function (){     //shows the compose tweet area and puts the textarea in focus
      $('textarea').select()
      document.documentElement.scrollTop = 0;
    })
  })
})