/**
 * Perform an elastic search
 */
app.factory('ElasticSearch', function ($http) {
	return {
		search: function (param, callback) {
			$http.get('/search?q=' + param)
			.success(callback);
		}
	};
});

app.directive('swCourseSearch', function ($filter, $http, ElasticSearch, $timeout) {

	function link (scope, element, attrs) {
		scope.search = {
			term: ''
		}
		scope.results = [];
		scope.mouseInBox = false;
		scope.courseSelectedIndex = 0;
		scope.visible = false;

		$("#sw-search").qtip({
			content: {
				text: 'Start here by typing the name of a USC course'
			},
			position: {
				my: 'right top',
				at: 'bottom right'
			},
			hide: {
				delay: 5000
			}
		});
		$("#sw-search").qtip('toggle', true);

		/*
		 * Takes an elastic search object, constructs an appropriate $course object and performs the callback
		 */
		function doCallback (es) {
			var courseObject = {};
			courseObject.department = es._source.department;
			courseObject.id = es._source.common;
			courseObject.units = es._source.units;
			courseObject.name = es._source.name;
			courseObject.number = es._source.number;

			scope.selectCallback({
				course: courseObject
			});
		}

		function performSearch () {
			ElasticSearch.search(scope.search.term, function (data, status) {
				scope.results = data;
				scope.courseSelectedIndex = 0;
			});
		}

		scope.courseSearchChanged = function () {
			if (scope.search.term.length > 0) {
				// set a timeout so we don't search every character
				$timeout.cancel(scope.timeout_promise);
				scope.timeout_promise = $timeout(function () {
					performSearch();
				}, 0);
			} else {
				scope.results = [];
			}
			scope.visible = scope.search.term.length > 0;

			// hide the tip
			$("#sw-search").qtip('toggle', false);
		};

		scope.keypressed = function ($event) {
			if ($event.keyCode === 40) {
				if (scope.courseSelectedIndex < scope.results.length - 1) {
					scope.courseSelectedIndex++;
				}
			} else if ($event.keyCode == 38) {
				if (scope.courseSelectedIndex > 0) {
					scope.courseSelectedIndex--;
				}
			} else if ($event.keyCode == 13) {
				scope.courseEnterPressed();
			}
		};

		scope.courseEnterPressed = function () {
			doCallback(scope.results[scope.courseSelectedIndex]);
			scope.search.term = '';
			scope.results = [];
			scope.visible = false;
		}

		scope.courseHover = function (ind) {
			scope.courseSelectedIndex = ind;
		}

	}

	return {
		link: link,
		restrict: 'E',
		scope: {
			'selectCallback': '&onCourseSelect'
		},
		templateUrl: 'js/directives/course_search.html'
	};

});