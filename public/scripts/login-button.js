$(document).ready(function() {
  $('button.login').click(function (){
    $('button.logout').slideToggle("fast", function() {
    })
    $('.loggedin p').toggleClass('shown')
    $('.loginArea').slideToggle('fast')
  })
})

