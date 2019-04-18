$(document).ready(function() {
  $('button.comp').click(function (){
    console.log('button')
    $( 'section.new-tweet' ).toggleClass('shrink')
  })
})