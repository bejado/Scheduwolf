<!DOCTYPE html>
<html ng-app="scheduwolf">
<head>
	<title>Scheduwolf</title>

	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/fullcalendar.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.qtip.css">

	<style>
		.nav, .pagination, .carousel a { cursor: pointer; }
		* {
			font-family: "proxima-nova";
		}
		.modal-dialog{
			width: 1050px;
		}
	</style>
	<link rel="icon" type="image/png" href="img/favicon.png">

	<!-- typekit -->
	<script type="text/javascript" src="//use.typekit.net/ozf2pgy.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

</head>
<body>

	<div class="navbar navbar-inverse navbar-static-top" role="navigation" style="background-color: #666666; margin: 0px">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.php" style="font-size: 30px;">
	          <!-- <img src="img/wolf.png" class="img-rounded" width="30" style="display: inline-block; vertical-align: middle;"> -->
	          <div style="display: inline-block; position: relative; top:10px; font-size: 30px">
	          	<span style="color: white; font-weight: bold;">Scheduwolf <sup style="font-size: 15px">Beta</sup></span>
	          	<span style="color: white; font-size: 20px;">
	          		Discover the perfect USC schedule.
	          	</span>
	          </div>
          </a>
        </div>
      </div>
    </div>
    <div class="navbar navbar-inverse navbar-static-top" role="navigation">
    	<div class="container">
	      	<div class="collapse navbar-collapse">
	 			<ul class="nav navbar-nav">
	 				<li><a href="index.php">Home</a></li>
	 				<li><a href="about.html">About</a></li>
					<li class="active"><a href="#">Feedback</a></li>
					<li><a href="terms.html">Terms of Service</a></li>
	 			</ul>
	        </div>
        </div>
      </div>

	<div class="container">
		<div class="row">
			<h1>Thank you!</h1>
			<p>
				<?php
					// grab the post variables from the form
					$email = $_POST['email'];
					$comments = $_POST['comments'];

					// connect to mysql
					$con = mysqli_connect('localhost', 'root', 'limegr33n', 'comments');

					// perform the insertion
					mysqli_query($con, "INSERT INTO comments (email, comments) VALUES ('$email', '$comments')");

					echo "Thank you for the feedback!";
				?>
			</p>
		</div>
	</div>

	<script type="text/javascript" src="js/lib/jquery.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/lib/angular.min.js"></script>
	<script type="text/javascript" src="js/lib/angular-resource.min.js"></script>
	<script type="text/javascript" src="js/lib/angular-route.min.js"></script>
	<script type="text/javascript" src="js/lib/angular-animate.min.js"></script>
	<script type="text/javascript" src="js/lib/fullcalendar.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery.qtip.js"></script>
	<script type="text/javascript" src="js/lib/ui-bootstrap-tpls-0.9.0.min.js"></script>

	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/controllers/schedules.js"></script>
	<script type="text/javascript" src="js/controllers/saveSchedule.js"></script>
	<script type="text/javascript" src="js/controllers/editSections.js"></script>
	<script type="text/javascript" src="js/controllers/finalSchedule.js"></script>
	<script type="text/javascript" src="js/directives/schedule.js"></script>
	<script type="text/javascript" src="js/directives/priority_sorter.js"></script>
	<script type="text/javascript" src="js/directives/course_search.js"></script>
	<script type="text/javascript" src="js/directives/tooltip.js"></script>
	<script type="text/javascript" src="js/directives/conditions.js"></script>
	<script type="text/javascript" src="js/directives/final_schedule.js"></script>
</body>
</html>