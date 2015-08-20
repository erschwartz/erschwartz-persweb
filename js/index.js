function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

$(document).ready(
  
  $("li").click(function() {
    $("li").removeClass("active");
    $("li").removeClass("selected");
    $(this).addClass("active");
    $(this).addClass("selected");  
    $(this).children("a").css("background-color", "#2f2f37");
  })
);