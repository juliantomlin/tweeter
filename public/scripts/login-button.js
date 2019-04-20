$(document).ready(function() {
  $('button.login').click(function (){
    $('.loginArea').slideToggle('fast')
  })

  $('button.logout').click(function() {
    $('button.logout').slideToggle("fast", function() {
      $.ajax({
      url: '/logout',
      method: 'POST'
      })
    $('.loggedin p').toggleClass('shown')
    })
  })

})