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

	<!-- start Mixpanel --><script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
	for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
	mixpanel.init("4d8c62c5601dffed6e64de29712d6706");</script><!-- end Mixpanel -->

	<!-- start UserVoice -->
	<script>
		// Include the UserVoice JavaScript SDK (only needed once on a page)
		UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/MzXuNfpuyX9WHfubJtTFnA.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

		//
		// UserVoice Javascript SDK developer documentation:
		// https://www.uservoice.com/o/javascript-sdk
		//

		// Set colors
		UserVoice.push(['set', {
		  accent_color: '#448dd6',
		  trigger_color: 'white',
		  trigger_background_color: '#6aba2e'
		}]);

		// Identify the user and pass traits
		// To enable, replace sample data with actual user traits and uncomment the line
		UserVoice.push(['identify', {
		  //email:      'john.doe@example.com', // User’s email address
		  //name:       'John Doe', // User’s real name
		  //created_at: 1364406966, // Unix timestamp for the date the user signed up
		  //id:         123, // Optional: Unique id of the user (if set, this should not change)
		  //type:       'Owner', // Optional: segment your users by type
		  //account: {
		  //  id:           123, // Optional: associate multiple users with a single account
		  //  name:         'Acme, Co.', // Account name
		  //  created_at:   1364406966, // Unix timestamp for the date the account was created
		  //  monthly_rate: 9.99, // Decimal; monthly rate of the account
		  //  ltv:          1495.00, // Decimal; lifetime value of the account
		  //  plan:         'Enhanced' // Plan name for the account
		  //}
		}]);

		// Add default trigger to the bottom-right corner of the window:
		UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

		// Or, use your own custom trigger:
		//UserVoice.push(['addTrigger', '#id', { mode: 'contact' }]);

		// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
		UserVoice.push(['autoprompt', {}]);
	</script>

</head>
<body ng-controller="SchedulesCtrl">
	<!-- Facebook like button -->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=160601030784759";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

	<div class="navbar navbar-inverse navbar-static-top" role="navigation" style="background-color: #666666; margin: 0px">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" style="font-size: 30px;">
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
	 				<li class="active"><a href="#">Home</a></li>
	 				<li><a href="about.html">About</a></li>
					<li><a href="feedback.html">Feedback</a></li>
					<li><a href="terms.html">Terms of Service</a></li>
	 			</ul>
	        </div>
        </div>
      </div>

	<div class="container">
		<div class="row">
			<div collapse="isCollapsed" class="col-xs-4">
					<div ng-include="'partials/course.html'"></div>
				<div ng-show="testSolution.solutions.length" ng-include="'partials/save.html'"></div>
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
	<script type="text/javascript" src="js/lib/angular-cookies.min.js"></script>
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
<footer>
	<!-- <a href="https://mixpanel.com/f/partner"><img src="//cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics" /></a> -->
</footer>
</html>