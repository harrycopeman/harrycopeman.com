<?php
$title = "Pennypot - Harry Copeman";
include ("../../include/header.php");
?>


    <div class="span">
      <div class="loop-12">
        <h1 class="case-header">Pennypot</h1>
        <h2 class="case-subhead">A Small Personal Project - <a href="http://pennypot.co">pennypot.co</a><br><br><a href="https://medium.com/@harrycopeman/designing-pennypot-f323f8517c4b">Read the Original</a></a></h2>
      </div>
    </div>

        <div class="span">
          <div class="loop-12">

            <p class="case-caption">The idea of this little app came from a personal problem of mine, I spend too much money. On the stupid things too, like a luxury chocolate brownie to go with my overpriced pie. That nice, overpriced, Rapha jersey that I’ve been drooling over for sometime, will never be mine at this rate.</p>

            <div class="break"></div>


            <p class="case-caphead">The Idea</p>
            <p class="case-caption">This would be an app that helped people save, no additional features; just a quick, tiny app that would let you drop in some cash everytime you got paid, and it would give you a big thumbs up when you eventually reached your goal. Perhaps no-one will even use this thing, but if it gets me my nice jersey I’ve been eying up for a while, then its a success. I thought about adding extra functionality, but that would defeat the whole idea behind Pennypot.</p>

            <blockquote class="case-quote">One feature, this should be pretty easy.</blockquote><br>


            <p class="case-caphead">Exploring</p>
            <p class='case-caption'>I wanted this app to be just one page, with all settings and gestures set just off the homepage; on a widget, or accessible in one swipe or button. This way, we could keep the app as light as possible, giving users the thought that it would only take a second to add a little cash to their goals.<br><br>

            At this stage of a project, I enjoy spilling all of my thoughts into an art board so I can visually identify and fix issues with the ideas in my head.</p>

            <p class="case-caphead">Version 1</p>
            <p class='case-caption'>My first round of designed where based on the idea that images would encourage users to put more money towards their goal, because they’d be reminded of what they’re truly saving for every time they open up the app. By displaying large, beautiful images, I could also create a very personal experience for each user.</p>

            <div class="case-image-hold">
              <img class="case-image" src="../../core/imgs/work/pennypot/v1.png"/>
              <p class="case-image-caption">Version 1</p>
            </div>

            <p class="case-caption">However, it soon became apparent that having so many settings and images, would require much more leg work, and was completely unnecessary. First up, there’s no need for accounts here. This design would also rely on quality photography to look remotely good. And version 2 was suddenly born.</p>

            <p class="case-caphead">Version 2</p>
            <p class='case-caption'>My vision at this stage was to keep things light, and to use self explanitory gestures. I’m in love with Mailbox’s swipe system, so it’s a feature I was keen to include. I also explored how images could keep users inspired, and the possibility of having a dark interface. A dark interface is possibly something I’d like to add as an aditional feature down the line, but for now I simply want to build something, and keep it lightweight.</p>

            <div class="case-image-hold">
              <img class="case-image" src="../../core/imgs/work/pennypot/1.png"/>
              <p class="case-image-caption">Version 2</p>
            </div>

            <p class='case-caption'>From early artboards I drew a few conclusions. First up, progress bars seemed like the most obvious way to show how close users where to reaching a goal. I also wanted to show users the exact amount they have towards their goal, so they could always push themselves that little bit more. There’s also some friendly hidden widgets, like a big tick once youy reach a goal. Version 2 seemed like the much smarter direction to take, so I continued to refine these screens.</p>

            <p class="case-caphead">Version 2.5</p>
            <p class='case-caption'>After setting some early foundations for the app, I began digging deeper, by identifying problems and solving them bit by bit.</p>

            <p class="case-caphead">Swipes</p>
            <p class='case-caption'>These would be a very important, if not the most important feature of the application. I needed to design a flow that would be quick enough for users to open the app, then quickly swipe and throw in some money — without feeling like its a chore. Otherwise, people wouldnt use Pennypot.</p>

            <div class="case-image-hold">
              <img class="case-image" src="../../core/imgs/work/pennypot/swipes.png"/>
              <p class="case-image-caption">My final decision was based upon a simple swiping gesture from a the same side, with easy icons explaining the users interactions. With the majority of the population right handed, I decided to run with left to right swipe.</p>
            </div>

            <p class="case-caphead">Settings</p>
            <p class='case-caption'>These would be a very important, if not the most important feature of the application. I needed to design a flow that would be quick enough for users to open the app, then quickly swipe and throw in some money — without feeling like its a chore. Otherwise, people wouldnt use Pennypot.</p>

          </div>
        </div>

        <div class='span'>
          <div class='loop-12'>
            <p class="case-caphead">Prototypes</p>
            <p class="case-caption">Further sketches also lead to some quick HTML & JS prototypes. The two videos below demonstrate some early ideas for the 'Tips + Tricks' and 'Getting Started' sections. We needed a way to cut down on long articles, and instead create an intuitive experience. Scroll indicators seemed like a smart solution as they allow users to quickly point to a section if they wished.</p>

            <div class='loop-6'>
              <video id="slideshow" width="100%" controls>
                <source src="../../core/video/slideshow.ogg" type="video/ogg">
                <source src="../../core/video/slideshow.mp4" type="video/mp4">
                <object data="../../core/video/slideshow.mp4" width="100%">
                  <embed width="100%" src="../../core/video/slideshow.swf">
                </object>
              </video>
            </div>
            <div class='loop-6'>
              <video width="100%" controls>
                <source src="../../core/video/pointer.ogg" type="video/ogg">
                <source src="../../core/video/pointer.mp4" type="video/mp4">
                <object data="../../core/video/pointer.mp4" width="320" >
                  <embed width="100%" src="../../core/video/pointer.swf">
                </object>
              </video>
            </div>
          </div>
        </div>

        <div class='span'>
          <div class='loop-12'>

            <p class='case-caphead'>Designing</p>
            <p class='case-caption'>It was time to start piecing together our final designs. With some help from Ryan Putman on this amazing set of icons, we had a page to be pretty excited about. We also brought the sites other pages up to scratch with the help section.</p>

            <div class="case-image-hold">
              <img class="case-image" src="../../core/imgs/work/mailbox/help.png"/>
              <p class="case-image-caption">Illustrations by <a href="https://twitter.com/RypeArts">Ryan Putnam</a></p>
            </div>

            <p class='case-caption'>With some help from <a target='_blank' href='https://twitter.com/RypeArts'>Ryan Putnam</a> on an amazing set of icons, we had a page to be pretty excited about. We also finished off all internal pages.</p>

            <div class='break'></div>

            <p class='case-caphead'>Illustrations</p>
            <p class='case-caption'>To walk new users through the application our idea was to provide them with a 'Tips + Tricks' and 'Getting Started' section. Both articles would require a set of illustrations to make the Mailbox help section as clear as day. The previous icons where looking pretty dated so I updated the whole set.</p>

            <div class="case-image-hold">
              <img class="case-image" src="../../core/imgs/work/mailbox/illos.png"/>
              <p class="case-image-caption">Before & After</a></p>
            </div>

            <p class='case-caphead'>Development</p>
            <p class='case-caption'>With the help of <a target='_blank' href='https://twitter.com/kevinewe\'>Kevin</a> I also put the code together for the new help section. By using AJAX we make it easy for the user operations team to add further languages down the line. The rest of the site was HTML, CSS and JavaScript.</p>

            <img class="case-image" src="../../core/imgs/work/mailbox/code.png"/>

            <div class='break'></div>

            <p class='case-caphead'>Note</p>
            <p class='case-caption'>The website and desktop app are now <a href="http://www.mailboxapp.com">live</a>. I'd like to say a huge thank you to everyone involved with this project. <a target='_blank' href='https://twitter.com/soleio'>Soleio</a>, <a target='_blank' href='https://twitter.com/lizarmistead'>Liz</a>, <a target='_blank' href='https://twitter.com/belindapreno'>Belinda</a>, <a target='_blank' href='https://twitter.com/kevinewe'>Kev</a>, <a target="_blank" href="https://twitter.com/RypeArts">Ryan</a>, <a href="https://twitter.com/gentry" target="_blank">Gentry</a> and everyone else, it was a pleasure!<br><br>

            <a href="http://www.mailboxapp.com/help">mailboxapp.com/help</a></p>


            <a href="../"><p class='back-project'>Back to projects</p></a>

          </div>
        </div>


<?php include ("../../include/footer.php"); ?>