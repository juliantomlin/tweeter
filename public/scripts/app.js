$(document).ready(function() {


  loadTweets();

  function makeSafe(str) {                                     //disables the use of XSS in tweet bodies
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function loadTweets(){                                      //loads all the tweets from the db
    $.getJSON('/tweets', function( data ) {
      renderTweets(data)
    })
  }

  function renderTweets (tweets) {                             //loops through all the tweet objects and renders one at a time
    for (tweet in tweets) {
      $('#tweets').prepend(createTweetElement(tweets[tweet]))
    }
  }

  function timeConverter(UNIX_timestamp){                      //convert timestamp into date string
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year ;
    return time;
  }

  function howLongAgo (past) {                                //returns a time based on how long ago the tweet was made from the current time
    let hour = Math.floor(((+ new Date()) - past)/3.6e+6)
    if (hour > 24) {
      return timeConverter(past)
    }
    else if (hour === 1) {
      return `made ${hour} hour ago`
    }
    else if (hour > 1) {
      return `made ${hour} hours ago`
    }
    else {
      let minute = Math.floor(((+ new Date()) - past)/60000)
      if (minute === 1) {
        return `made ${minute} minute ago`
      }
      else if (minute > 1) {
        return `made ${minute} minutes ago`
      }
      else {
        return `made a few seconds ago`
      }
    }
  }

  function createTweetElement(data) {                                       //renders the tweet article
    const safe = `<p>${makeSafe(data.content.text)}</p>`
    let $tweet = $('<article>').addClass('tweet')

    let overlay = $('<div>').addClass('overlay').appendTo($tweet)
    let header = $('<header>').appendTo(overlay)
    let avatarAndName = $('<div>').appendTo(header)
    let avatar = $('<img>').addClass('avatar').attr('src', data.user.avatars.small).appendTo(avatarAndName)
    let name = $('<h3>').append(data.user.name).appendTo(avatarAndName)
    let handle = $('<h5>').append(data.user.handle).appendTo(header)

    let body = $('<div>').addClass('content').appendTo(overlay)
    let text = $('<p>').append(safe).appendTo(body)

    let footer = $('<footer>').appendTo(overlay)
    let time = $('<h6>').append(howLongAgo(data.created_at)).appendTo(footer)
    let icons = $('<div>').addClass('icons').appendTo(footer)
    let flag = $('<i>').addClass('fas fa-flag').appendTo(icons)
    let retweet = $('<i>').addClass('fas fa-retweet').appendTo(icons)
    let heart = $('<i>').addClass('fas fa-heart').appendTo(icons)

    return $tweet
  }

  $('#tweetform').on('submit', function(event){                   //handle the form post event
    $('.err-empty').removeClass('true')
    $('.err-long').removeClass('true')
    event.preventDefault()
    let data = $(this).serialize()
    if (data.length < 146){
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: data
      }).then(
      (res) => {
        console.log('Success', data, data.length)
        loadTweets();
        $("form")[0].reset()
        $(".counter").text(140)
      },

      (err) => {
        console.log('Error')
        $('.err-empty').addClass('true')
        })
      }

    else {
      $('.err-long').addClass('true')
    }
  })
});