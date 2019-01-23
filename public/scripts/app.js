/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  //sample tweet object
  tweetData = {
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
  }


  //function that takes in tweet and displays it in tweet container
  function createTweetElement(tweetObj) {
    const article = $('<article class="tweet"></article>');

    //create header and add image name and handle components
    const header = $("<header></header>");

    header.append(`<img class="userPic" src=${tweetObj.user.avatars.small}>`)
    header.append(`<p class="name">${tweetObj.user.name}</p>`)
    header.append(`<p class="handle">${tweetObj.user.handle}</p>`)

    header.appendTo(article);

    //add tweet content to article
    article.append(`<p class="tweet-content">${tweetObj.content.text}</p>`);

    //create footer and add time created and add the time created and the icons
    const footer = $("<footer></footer>");

    footer.append(tweetObj.created_at);
    footer.append('<img class="icons" src="/images/flag.png">');
    footer.append('<img class="icons" src="/images/refresh.png">');
    footer.append('<img class="icons" src="/images/heart.png">');

    article.append(footer);

    return article;
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
