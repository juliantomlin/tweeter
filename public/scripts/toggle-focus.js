$(document).ready(function() {
  $('.tweet').on('mouseover', function (){
    $( '.overlay' ).addClass('focus')
    $( '.icons' ).addClass('focus')
  })
  $('.tweet').on('mouseout', function (){
    $( '.overlay' ).removeClass('focus')
    $( '.icons' ).removeClass('focus')

  })
})