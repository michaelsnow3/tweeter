/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  //sample tweet object
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach((tweet) => {
      const addTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(addTweet);
    })
}

  //function that takes in tweet and displays it in tweet container
  function createTweetElement(tweetObj) {

    //convert time in miliseconds to date
    const tweetDate = new Date(tweetObj.created_at);
    return $(`
      <article class="tweet">
        <header>
          <img class="userPic" src=${tweetObj.user.avatars.small}>
          <p class="name">${tweetObj.user.name}</p>
          <p class="handle">${tweetObj.user.handle}</p>
        </header>
        <p class="tweet-content">${tweetObj.content.text}</p>
        <footer>
          ${tweetDate.toDateString()}
          <img class="icons" src="/images/flag.png">
          <img class="icons" src="/images/refresh.png">
          <img class="icons" src="/images/heart.png">
        </footer>
      </article>
      `);
  }

  //AJAX POST request for new tweet form
  $('.new-tweet-form').on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    })
    .done(function(msg) {
      console.log("data saved");
    })
  });

 renderTweets(data);
});
