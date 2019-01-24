/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  function renderTweets(tweets) {
    if($(".tweet").val() === undefined){

      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      tweets.forEach((tweet) => {
        const addTweet = createTweetElement(tweet);
        $('#tweets-container').prepend(addTweet);
      });
    } else {

      //just add new tweet instead of reloading all
      const newTweet = createTweetElement(tweets[tweets.length - 1]);
      $('#tweets-container').prepend(newTweet);
    }
  }

  //function used to prevent XSS
  function escape(str) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
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
          <p class="tweet-content">${escape(tweetObj.content.text)}</p>
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

    //check if message is valid
    const counter = +$(this).children(".counter")['0'].textContent;
    const errorPara = $('.new-tweet-form .error-message');
    if(counter < 0) {
      errorPara.hide()
      errorPara.text('To many characters!');
      errorPara.slideDown("medium");
    } else if(counter === 140) {
      errorPara.hide()
      errorPara.text('Tweet area is empty');
      errorPara.slideDown("medium");
    } else {
      errorPara.hide();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      })
      .done(function() {

        //reset compose tweet inputs after tweet is created
        $(".new-tweet-form textarea")[0].value = '';
        $(".new-tweet-form .counter").text(140);

        loadTweets();
        console.log("data saved");
      })
      .fail(function() {
        console.log( "error saving tweet" );
      });
    }
  });

  //compose button handle function
  $("#nav-bar button").on("click", function(event) {
    $("main .new-tweet").slideToggle('fast', function() {

      //focus on textarea when anamation completes
      $(".new-tweet-form textarea").focus();
    });
  });
});
