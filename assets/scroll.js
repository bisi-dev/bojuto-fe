var slideStep = 400;
var scrolling = true;

$(".lefty").on("click", function (event) {
  event.preventDefault();
  $(".profile-block-wrapper").animate({
    scrollLeft: "-=" + slideStep + "px",
  });
});

$(".righty").on("click", function (event) {
  event.preventDefault();
  $(".profile-block-wrapper").animate({
    scrollLeft: "+=" + slideStep + "px",
  });
});

$(".profile-block-wrapper").scroll(function () {
  var $width = $(".profile-block-wrapper").outerWidth();
  var $scrollWidth = $(".profile-block-wrapper")[0].scrollWidth;
  var $scrollLeft = $(".profile-block-wrapper").scrollLeft();

  var offset = 50;

  if ($scrollLeft >= $width + 50) {
    console.log("right end");
  }
  if ($scrollLeft === 0) {
    console.log("left end");
  }
});
