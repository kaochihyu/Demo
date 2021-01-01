//滑下來變阿
$(window).scroll(function(evt) {
  if ($(window).scrollTop()<= 0) {
    $("nav.navbar").addClass("at_top");
  } else {
    $("nav.navbar").removeClass("at_top");
  }
});

function detect_step(step_id, x, up, down) {
  var stepPlace = $(step_id).offset().left + $(step_id).width() / 2;
  if (Math.abs(stepPlace - x) < 50) {
    $(step_id).attr("src", up)
  } else {
    $(step_id).attr("src", down)
  }
}

$(window).mousemove(function(evt) {
  var pagex = evt.pageX;
  var pagey = evt.pageY;
  
  var x = pagex - $("#section_about").offset().left;
  var y = pagey - $("#section_about").offset().top;
  
  $(".r3icon").css("transform", "translate(" + (y / 10) + "px)");
  $(".r3text").css("transform", "translate(" + (y / 14) + "px)");
  $("#circle1").css("transform", "translate(" + (y / -20) + "px)");
  $("#circle2").css("transform", "translateX(" + (y / -22) + "px)");
  
  
  $(".sqr1").css("transform", "translateX(" + (x / -26) + "px)");
  $(".sqr2").css("transform", "translateX(" + (x / -14) + "px)");
  $(".sqr3").css("transform", "translateX(" + (x / -15) + "px)");
  $(".sqr4").css("transform", "translateX(" + (x / -12) + "px)");
  $(".sqr5").css("transform", "translateX(" + (x / -16) + "px)");
  
  $(".l1text").css("transform","translateX(" + (y / 6) + "px)");
  $(".l2text, .l3text").css("transform", "translateX(" + (y / 14) +"px)");
  
  var spotlightplace = $("#spotlight").offset().left + $("#spotlight").width() / 2;
  var spotlighttop = $("#spotlight").offset().top;
  
  if (pagex < spotlightplace - 50) {
    $("#spotlight").attr("src","https://i.postimg.cc/ht8b7c7M/spotlight-left.png")
  } else if (pagex > spotlightplace + 50) {
    $("#spotlight").attr("src","https://i.postimg.cc/26W4rYm4/spotlight-right.png")
  } else {
    $("#spotlight").attr("src","https://i.postimg.cc/XqMkCJxH/spotlight-top.png")
  }
  
  if (pagex < spotlightplace - 50 && pagey < spotlighttop) {
    $("#spotlight").attr("src","https://i.postimg.cc/nLz28NCk/spotlight-lefttop.png")
  }

  if (pagex > spotlightplace + 50 && pagey < spotlighttop) {
    $("#spotlight").attr("src","https://i.postimg.cc/PrTms07w/spotlight-righttop.png")
  }
  
  if (y < 0 || y > $("#section_about").outerHeight()) {
    $("#shoes").css("opacity", 0);
  } else {
    $("#shoes").css("opacity", 1);
  }
  
  $("#shoes").css("left", x + "px");
  $("#shoes").css("top", y + "px");
  
  detect_step("#step_blue", pagex, "https://i.postimg.cc/760420cJ/tapstep-06.png", "https://i.postimg.cc/dQbQ3STt/tapstep-03.png");
  detect_step("#step_pink", pagex, "https://i.postimg.cc/m2MdWV9H/tapstep-07.png", "https://i.postimg.cc/kGx0BskB/tapstep-08.png");
  detect_step("#step_red", pagex, "https://i.postimg.cc/T1vDVj3z/tapstep-10.png", "https://i.postimg.cc/K8c68nQ8/tapstep-09.png");
})