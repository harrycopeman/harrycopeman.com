<?php
$title = "Harry Copeman";
include ("_include/header.php");
?>

<section class="full">
	<div class="span">
		<div class="loop-12">

				<p>
						<script language="JavaScript"> 
						var myDate = new Date(); 
						  
						/* hour is before noon */
						if ( myDate.getHours() < 12 )  
						{ 
						    document.write("Morning!"); 
						} 
						else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
						if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 ) 
						{ 
						    document.write("Afternoon!"); 
						} 
						else  /* the hour is after 5pm, so it is between 6pm and midnight */
						if ( myDate.getHours() > 17 && myDate.getHours() <= 24 ) 
						{ 
						    document.write("Evening!"); 
						} 
						else  /* the hour is not between 0 and 24, so something is wrong */
						{ 
						    document.write("Hello!"); 
						} 
						</script>

						I'm Harry, a product designer. <br><br>
						My job is to help both small and large companies identify problems, and solve them through new products or ventures. This means I spend a lot of my time researching, prototyping and testing my designs. I also like to ask why a lot, to ensure that products are been built to the right standards and for the right reasons.<br><br></p>

						<h2>Work</h2>
						<p>I'm currently at <a href="https://www.facebook.com/">Facebook</a> London where I design tools for businesses in Emerging Markets. I also help to build internal and external <a href="https://facebook.github.io/design/devices.html">design resources</a> for teams and individuals. Previous to this, I contracted for a variety of companies including <a href="https://www.dropbox.com/">Dropbox</a>, <a href="http://www.mailboxapp.com/">Mailbox</a>, <a href="https://seatgeek.com/">SeatGeek</a> and <a href="http://switchapp.com/">Switch</a>.<br><br>
						I also enjoy scratching my own itches, which is why I'm building <a href="https://twocards.co/">TwoCards</a>, a simple way to send invoices and get paid on time.<br><br></p>

						<h2>Contact</h2>
						<p>I'm always looking to grab a coffee with others. You can find me on <a href="https://twitter.com/harrycopeman">Twitter</a>, or email me on <a href="mailto:harry.copeman@gmail.com">harry.copeman@gmail.com</a>.</p>







			</div>
		</div>
	</div>
</section>


<?php include ("_include/footer.php"); ?>