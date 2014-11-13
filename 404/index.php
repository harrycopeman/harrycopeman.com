<?php
$title = "404 - Harry Copeman";
$id = "404";
include ("../include/header.php");
?>

    <div class="lost">
      <div class="span">
        <div class="loop-12">
          <div class="loop-12">
            <h1 class='page-title'>Oops!</h1>
            <script language="JavaScript">
            function random_imglink(){
            var myimages=new Array()
            myimages[1]="../core/imgs/404/one.gif"
            myimages[2]="../core/imgs/404/two.gif"
            myimages[3]="../core/imgs/404/three.gif"
            myimages[4]="../core/imgs/404/four.gif"
            myimages[5]="../core/imgs/404/five.gif"

            var ry=Math.floor(Math.random()*myimages.length)
            if (ry==0)
            ry=1
            document.write('<img src="'+myimages[ry]+'" border=0>')
            }
            random_imglink()
            </script>
            <div id="ad"></div>
            <p>It appears that something's gone wrong and now you're lost!
            <br><br>I think the best thing for us both, is that you stop searching for forbidden treasures and <a href="http://harrycopeman.com">go home</a>.</p>
          </div>
        </div>
      </div>
    </div>





<?php include ("../include/footer.php"); ?>
