<?php
$title = "Harry Copeman";
include ("_include/header.php");
?>

<section class="full">
	<div class="span">
		<div class="loop-12">

			<div class="intro">
				<h1>
					<strong>
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
					</strong>

						I’m Harry Copeman, a product designer at Facebook.

				</h1>

				<p><a href="https://twitter.com/harrycopeman">Twitter</a> / <a href="https://instagram.com/harrycopeman/">Photography</a> / <a href="mailto:harry.copeman@gmail.com">Email</a></p>
			</div>



			<div class="job" id="facebook">
				<h1>Facebook</h1>
				<p>Working on the business team, solving problems and creating solutions for clients across the world.</p>
			</div>

			<div class="job" id="mailbox">
				<h1>Mailbox / Dropbox</h1>
				<p>Helping launch Mailbox for Mac, including a site redesign and a set of user walkthroughs.</p>
			</div>

			<div class="job" id="coffee">
				<h1>Coffee Guides</h1>
				<p>A personal project, helping people to find the best coffee spots in their city.</p>
			</div>

			<div class="job" id="seatgeek">
				<h1>SeatGeek</h1>
				<p>Improving the experience for new users, to give them a better overall journey through the proccess.</p>
			</div>

			<div class="job" id="switch">
				<h1>Switch</h1>
				<p>Working on the business team, solving problems and creating solutions for clients across the world.</p>
			</div>




			</div>
		</div>
	</div>
</section>


<?php include ("_include/footer.php"); ?>