// <article class='tweet'>
// <div class='overlay'>
//   <header>
//     <div>
//       <img class='avatar' src="/images/avatar.png">
//       <h3> USER NAME and Avatar </h3>
//     </div>
//     <h5> @UserName </h5>
//   </header>
//   <div class='content'>
//     <p> This is a tweet!</p>
//   </div>
//   <footer>
//     <h6> 10 days ago</h6>
//     <div class='icons'>
//       <i class="fas fa-flag"></i>
//       <i class="fas fa-retweet"></i>
//       <i class="fas fa-heart"></i>
//     </div>
//   </footer>
// </div>
// </article>


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 function makeSafe(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


 const loadTweets = function () {
  $.getJSON('/tweets', function( data ) {
    renderTweets(data)
  })
 }

const renderTweets = function (tweets) {
  for (tweet in tweets) {
    $('#tweets').prepend(createTweetElement(tweets[tweet]))
    // console.log(createTweetElement(tweets[tweet]))
  }
}


const createTweetElement = function (data) {
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
        let time = $('<h6>').append(Date(data.created_at).slice(0,21)).appendTo(footer)
        let icons = $('<div>').addClass('icons').appendTo(footer)
          let flag = $('<i>').addClass('fas fa-flag').appendTo(icons)
          let retweet = $('<i>').addClass('fas fa-retweet').appendTo(icons)
          let heart = $('<i>').addClass('fas fa-heart').appendTo(icons)

  return $tweet
}

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

// var $tweet = createTweetElement(tweetData);

$(document).ready(function() {
  loadTweets()
})

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
