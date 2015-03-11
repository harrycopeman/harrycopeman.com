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




<br><br>I’m Harry Copeman, a product designer based in Hull, soon to be joining the team at <a href="https://www.facebook.com/">Facebook</a> in London; where I'll be working with the incredible Business Solutions team.<br><br>

Previous to this, I freelanced for some incredible teams including <a href="https://www.dropbox.com/">Dropbox</a>, where I helped them improve the universal experience of <a href="http://www.mailboxapp.com/" target="_blank">Mailbox</a>; a lightweight tool allowing you to keep on top of your inbox.<br><br>

 I’ve also worked with teams like <a href="https://seatgeek.com/" target="_blank">SeatGeek</a>, and various small startups across the world. You can see my full portfolio <a href="portfolio">here</a>.<br><br>

Feel free to drop me an <a href="mailto:harry.copeman@gmail.com">email</a>, or <a href="https://twitter.com/harrycopeman">tweet me</a>.</p>

			</div>
		</div>

		
</div>


<?php include ("_include/footer.php"); ?>


