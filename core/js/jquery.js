// Randomize 404
var images = ['../imgs/404/one.gif', '../imgs/404/two.gif', '../imgs/404/three.gif', '../imgs/404/four.gif', '../imgs/404/five.gif'];

$('.lost-image').css({'background-image': 'url(../imgs/404/' + images[Math.floor(Math.random() * images.length)] + ')'});





// Scrolling on collection
$(".digital-link").click(function() {
    var offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#digital").offset().top + offset
    }, 100);
});
// Scrolling on collection
$(".lifestyle-link").click(function() {
    var offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#lifestyle").offset().top + offset
    }, 100);
});
// Scrolling on collection
$(".physical-link").click(function() {
    var offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#physical").offset().top + offset
    }, 100);
});





// Dececting active link menu
(function() {
    var nav = document.getElementById('nav'),
        anchor = nav.getElementsByTagName('a'),
        current = window.location.pathname.split('/')[1];
        for (var i = 0; i < anchor.length; i++) {
        if(anchor[i].href == current) {
            anchor[i].className = "active";
        }
    }
})();

//




$(document).ready(function(){
    
    var getMax = function(){
        return $(document).height() - $(window).height();
    }
    
    var getValue = function(){
        return $(window).scrollTop();
    }
    
    if('max' in document.createElement('progress')){
        // Browser supports progress element
        var progressBar = $('progress');
        
        // Set the Max attr for the first time
        progressBar.attr({ max: getMax() });

        $(document).on('scroll', function(){
            // On scroll only Value attr needs to be calculated
            progressBar.attr({ value: getValue() });
        });
      
        $(window).resize(function(){
            // On resize, both Max/Value attr needs to be calculated
            progressBar.attr({ max: getMax(), value: getValue() });
        });   
    }
    else {
        var progressBar = $('.progress-bar'), 
            max = getMax(), 
            value, width;
        
        var getWidth = function(){
            // Calculate width in percentage
            value = getValue();            
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }
        
        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        }
        
        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            // Need to reset the Max attr
            max = getMax();
            setWidth();
        });
    }
});















$(document).ready(function(){
  
  $('#flat').addClass("active");
  $('#progressBar').addClass('flat');
    
  $('#flat').on('click', function(){
    $('#progressBar').removeClass().addClass('flat');
    $('a').removeClass();
    $(this).addClass('active');
    $(this).preventDefault();
  });

  $('#single').on('click', function(){
    $('#progressBar').removeClass().addClass('single');
    $('a').removeClass();    
    $(this).addClass('active');
    $(this).preventDefault();    
  });

  $('#multiple').on('click', function(){
    $('#progressBar').removeClass().addClass('multiple');
    $('a').removeClass();    
    $(this).addClass('active');
    $(this).preventDefault();    
  });

  $('#semantic').on('click', function(){
    $('#progressBar').removeClass().addClass('semantic');
    $('a').removeClass();    
    $(this).addClass('active');
    $(this).preventDefault();
    alert('hello');
  });

  $(document).on('scroll', function(){

      maxAttr = $('#progressBar').attr('max');
      valueAttr = $('#progressBar').attr('value');
      percentage = (valueAttr/maxAttr) * 100;
      
      if(percentage<49){
        document.styleSheets[0].addRule('.semantic', 'color: red');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: red');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: red');
      }
      else if(percentage<98){
        document.styleSheets[0].addRule('.semantic', 'color: orange');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: orange');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: orange');
      }
      else {
        document.styleSheets[0].addRule('.semantic', 'color: green');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: blue');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: blue');
      }      
  });
  
});




