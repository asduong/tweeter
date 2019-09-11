$(document).ready(function () {
  $(".tweet-area").on("input", function () {
    let val = 140 - $(this).val().length;
    if (val < 0) {
      $($('.counter').text(val)).css("color", "red");
    } else {
      $($('.counter').text(val)).css("color", "");
    }
  });
});

// $(".tweet-area").keyup(counter);
// $(".tweet-area").keydown(counter);
// function counter() {
//   let textCounter = 140;
//   if (textCounter < 0) {
//     $(".counter")
//   }
// }

// $(".tweet-area").on("keydown", function () {
//   let val = $(".counter").val();
//   console.log(val);
// });