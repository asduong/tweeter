/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create Tweets Dynamically
const createTweetElement = (tweetData) => {
  const $tweet = `<article class="main-container">
        <header class="header-container">
          <span class="username"><img class="resize" src="${tweetData.user.avatars}">${tweetData.user.name}</span>
          <span class="at-handle">${tweetData.user.handle}</span>
        </header>
        <div class="tweet border-bottom">
          ${escape(tweetData.content.text)}
        </div>
        <footer class="footer-container">
          <span class="date">${tweetData.created_at}</span>
          <span class="symbols"><i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i></span>
        </footer>
      </article>
  `;
  return $tweet;
};

// Using createTweetElement function to render each tweet passed in
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

// Rendering all of the tweets using AJAX Get
const loadtweets = () => {
  $.ajax({
    url: `/tweets`,
    method: 'GET'
  }).then(data => {
    renderTweets(data);
  });
};

// Rendering all of the new tweets using AJAX Get
const newTweet = () => {
  $.ajax({
    url: `/tweets`,
    method: 'GET',
    dataType: 'JSON'
  }).then(function (data) {
    $("#tweets-container").prepend(createTweetElement(data[data.length - 1]));
  });
};

// Escaping html tags to avoid XSS
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



$(document).ready(() => {
  $("#new-tweet").on('submit', (event) => {
    event.preventDefault();
    const input = $("#new-tweet").serialize();
    if (input.length > 145) {
      $(".error-text").slideDown().text("Maximum of 140 characters, please delete the extra characters.");
    } else if (input.length === 5 || input === null) {
      $(".error-text").slideDown().text("This cannot be empty, please add some content in your Tweet.");
    } else {
      $(".error-text").slideUp();
      $.ajax({
        url: `/tweets`,
        method: 'POST',
        data: input,
        success: function () {
          newTweet();
          $(".tweet-area").val("");
        }
      });
    }
  });

  // Arrow in Navbar to toggle the area where user writes their tweets
  $(".arrow").click(function () {
    $("#new-tweet").slideToggle("slow", function () {});
  });
  loadtweets();
});