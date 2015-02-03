// Randomize 404
var images = ['../imgs/404/one.gif', '../imgs/404/two.gif', '../imgs/404/three.gif', '../imgs/404/four.gif', '../imgs/404/five.gif'];

$('.lost-image').css({'background-image': 'url(../imgs/404/' + images[Math.floor(Math.random() * images.length)] + ')'});






$(document).ready(function(){
resizeDiv();
});

window.onresize = function(event) {
resizeDiv();
}

function resizeDiv() {
vpw = $(window).width();
vph = $(window).height();
$(".right").css({"height": vph + "px"});
}