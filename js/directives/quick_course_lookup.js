app.factory('Departments', function ($http) {
	return {
		getDepartments: function (callback) {
			$http.get('/api/departments')
			.success(callback);
		}
	};
});

app.directive('swQuickCourseLookup', function ($filter, $http, Departments) {

	function link (scope, element, attrs) {
		Departments.getDepartments(function (data, status) {
			scope.allDepartments = data;
		});
		scope.allCourses = [];
		scope.filteredDepartments = [];
		scope.filteredCourses = [];
		scope.search = {term: ''};
		scope.selectedDepartment = '';
		scope.selectedCourse = {};
		scope.showNumberSelect = false;
		scope.coursesLoadingSpinner = false;
		scope.showQuickCourseLookup = false;

		function filterDepartments () {
			if (scope.search.term == '') {
				scope.filteredDepartments = [];
				return;	
			}

			// Remove all whitespace from the search string
			var searchTerm = scope.search.term.replace(/\s+/g, '');

			// Apply the filter
			var searchCourse = searchTerm.replace( /\d+/g, '');
			scope.filteredDepartments = $filter('filter')(scope.allDepartments, function (value) {
				return value.code.substring(0, searchCourse.length).toLowerCase() == searchCourse.toLowerCase();
			});
		}

		function filterCourses () {
			// Remove all whitespace from the search string
			var searchTerm = scope.search.term.replace(/\s+/g, '');

			var searchNumber;
			if (scope.showNumberSelect) {
				searchNumber = searchTerm.replace( /^\D+/g, '');
				scope.filteredCourses = $filter('filter')(scope.allCourses, function (value) {
					return value.number.substring(0, searchNumber.length).toLowerCase() == searchNumber.toLowerCase();
				});
			}
		}

		function initLookup () {
			scope.search.term = '';
			scope.filteredDepartments = [];
			scope.selectedDepartment = '';
			scope.filteredCourses = '';
			scope.showNumberSelect = false;
			scope.showQuickCourseLookup = false;
			scope.selectedCourse = {};
		}

		function doCallback (department, number) {
			var courseObject = courseObjectForNumber(number);
			courseObject.id = department + ' ' + number;
			courseObject.department = department;
			courseObject.number = number;

			// Call the callback
			scope.selectCallback({
				course: courseObject
			});
		}

		function courseObjectForNumber(number) {
			for (var i = 0; i < scope.filteredCourses.length; i++) {
				var thisCourse = scope.filteredCourses[i];
				if (thisCourse.number == number) {
					return thisCourse;
				}
			}
		}

		scope.courseInputChanged = function () {
			scope.showQuickCourseLookup = true;

			filterDepartments();

			// If we're down to just one course, go into number select mode
			if (scope.filteredDepartments.length == 1) {

				if (!scope.showNumberSelect) {

					scope.selectedDepartment = scope.filteredDepartments[0].code;

					// Load the courses data from the server
					scope.coursesLoadingSpinner = true;
					$http.get('/api/courses', {
						params : {
							'department': scope.selectedDepartment
						}
						}).
						success( function (data, status) {
							scope.coursesLoadingSpinner = false;
							scope.allCourses = data;
							filterCourses();
						}).
						error( function (data, status, headers, config) {
							alert("Oh no! There was a server error :(");
						});

					scope.showNumberSelect = true;

				}

			} else {
				scope.showNumberSelect = false;
				scope.allCourses = [];
			}

			filterCourses();

			if (scope.filteredCourses.length == 1) {
				scope.selectedCourse = scope.filteredCourses[0];
			}
		};

		scope.enterPressed = function () {
			if (scope.selectedCourse.number != '' && scope.selectedDepartment != '') {
				doCallback(scope.selectedDepartment, scope.selectedCourse.number);
				initLookup();
			}
		}

		scope.searchFocus = function () {
			scope.showQuickCourseLookup = true;
		}

		scope.searchLoseFocus = function (event) {
			scope.showQuickCourseLookup = false;
		}

		scope.buttonFocus = function () {
			scope.showQuickCourseLookup = true;
		}

		scope.courseAddClicked = function (courseNumber, courseName) {
			doCallback(scope.selectedDepartment, courseNumber);
			initLookup();
		}

	}

	return {
		link: link,
		restrict: 'E',
		scope: {
			'selectCallback': '&onCourseSelect'
		},
		templateUrl: 'js/directives/quick_course_lookup.html'
	};

});