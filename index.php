<?php
$title = "Harry Copeman - Product Designer";
include ("_include/header.php");
?>

<div class="profile">

		<div class="side right animated fadeIn"></div>

		<div class="side left animated fadeIn">
			<div class="copy">
  
				<p><strong>
					<script language="JavaScript"> 
					var myDate = new Date(); 
					  
					  
					/* hour is before noon */
					if ( myDate.getHours() < 12 )  
					{ 
					    document.write("Good Morning!"); 
					} 
					else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
					if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 ) 
					{ 
					    document.write("Good Afternoon!"); 
					} 
					else  /* the hour is after 5pm, so it is between 6pm and midnight */
					if ( myDate.getHours() > 17 && myDate.getHours() <= 24 ) 
					{ 
					    document.write("Good Evening!"); 
					} 
					else  /* the hour is not between 0 and 24, so something is wrong */
					{ 
					    document.write("I'm not sure what time it is!"); 
					} 
					</script></strong>




<br><br>I’m Harry Copeman, a product designer at <a href="https://www.facebook.com/">Facebook</a>, working out of London.<br><br>

I've also helped <a href="https://www.dropbox.com/">Dropbox</a> improve the universal experience of <a href="https://www.mailboxapp.com/">Mailbox</a>, I've worked with <a href="https://seatgeek.com/" target="_blank">SeatGeek</a> to simplify their application, and I've supported <a href="http://www.switchapp.com">Switch</a> as they give people jobs. <br><br>

On the side, I like to run a couple of projects such as <a href="http://coffeeguides.co/">Coffee Guides</a>. You can see my full portfolio <a href="http://harrycopeman.com/portfolio/">here</a>.<br><br>

Feel free to drop me an <a href="mailto:harry.copeman@gmail.com">email</a>, or <a href="https://twitter.com/harrycopeman">tweet me</a>.</p>

			</div>
		</div>

		
</div>


<?php include ("_include/footer.php"); ?>


