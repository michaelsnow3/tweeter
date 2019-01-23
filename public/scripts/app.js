/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

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

  //function that fetches and loads tweets from /tweets to home page
  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
    })
    .done(function(data) {
      renderTweets(data);
    })
    .fail(function() {
      console.log( "error fetching tweets" );
    });
  }
  loadTweets();

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
    .fail(function() {
      console.log( "error saving tweet" );
    });
  });
});
