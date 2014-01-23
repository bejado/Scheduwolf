<?php
	/* These are our valid username and passwords */
	$pass = 'deathtowebreg';

	if (isset($_COOKIE['password'])) {
		if ($_COOKIE['password'] != md5($pass)) {
			header('Location: login.html');
		} else {
			// They're in
		}
	} else {
		header('Location: login.html');
	}
?>

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
	</style>

</head>
<body ng-controller="SchedulesCtrl">
	<div class="container">
		<div class="row">
			<div class="page-header">
				<h1>Scheduwolf
				<small>Discover the perfect USC schedule.</small></h1>
			</div>
		</div>
		<div class="row">
			<div collapse="isCollapsed" class="col-xs-4">
				<h3>Choose Courses & Priorities</h3>
				<tabset>
					<tab heading="Courses">
						<div ng-include="'partials/course.html'"></div>
					</tab>
					<tab heading="Priorities">
						<div ng-include="'partials/priorities.html'"></div>
					</tab>
				</tabset>
				<hr>
				<div ng-include="'partials/save.html'"></div>
			</div>
			<div class="col-xs-8" ng-include="'partials/schedules.html'"></div>
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
	<script type="text/javascript" src="js/directives/schedule.js"></script>
	<script type="text/javascript" src="js/directives/priority_sorter.js"></script>
	<script type="text/javascript" src="js/directives/quick_course_lookup.js"></script>
</body>
</html>