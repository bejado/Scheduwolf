app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

function SchedulesCtrl ($scope, $routeParams, $http, $filter, $modal, Sections) {
	$scope.currentSchedule = {index: 0};
	$scope.testSolution = {};
	$scope.courses = [];
	$scope.newCourse = {name:""};
	$scope.priorities = {priorities: ["No class on Friday", "Later start times", "Less overall class time", "Days of class per week"]};
	$scope.needsUpdate = {val: true};
	$scope.totalUnits = 0;
	$scope.impossible = false;
	$scope.unexplainedError = false;
	$scope.noClasses = [];

	/*
	pretty colors to use
	*/
	var colors = ['#E74C3C', '#F1C406', '#2ECC71', '#3498DB', '#9B59B6'];
	var colorsInUse = [];
	var colorDictionary = {};

	/*
	Adds color information to the sections object from the API.
	Matches course titles to color.
	*/
	function injectColor (sections) {
		for (var i = sections.length - 1; i >= 0; i--) {
			var this_section = sections[i];
			this_section['color'] = colorDictionary[this_section['courseTitle']];
		}
	}

	function assignNewColor (course) {
		// choose a freely available pretty color
		newColor = colors[0];
		colors.splice(0,1);		// remove the first color from the color stack
		console.log(colors);
		colorsInUse.push(colors);

		course['color'] = newColor;
		colorDictionary[course.name] = newColor;
	}

	function freeColor (color) {
		colors.push(color);
		index = colorsInUse.indexOf(color);
		if (index > -1) {
			colorsInUse.splice(index, 1);
		}
	}

	function updateTotalUnits () {
		var newTotal = 0;
		for (var i = 0; i < $scope.courses.length; i++) {
			var thisCourse = $scope.courses[i];
			newTotal += thisCourse.units;
		}
		$scope.totalUnits = newTotal;
	}

	$scope.nextSchedule = function () {
		$scope.currentSchedule.index++;
		mixpanel.track("Next schedule");
	}

	$scope.previousSchedule = function () {
		$scope.currentSchedule.index--;
		mixpanel.track("Previous schedule");
	}

	$scope.nextButtonEnabled = function () {
		if ($scope.testSolution.solutions) {
			if ($scope.currentSchedule.index >= $scope.testSolution.solutions.length - 1) {
				return false;
			}
			return true;
			}
		return false;
	}

	$scope.previousButtonEnabled = function () {
		if ($scope.testSolution.solutions) {
			if ($scope.currentSchedule.index <= 0) {
				return false;
			}
			return true;
			}
		return false;
	}

	$scope.updateSchedules = function () {
		// Extract the identifiers and section excludes from the course objects
		var courseIDs = [];
		var sectionExl = [];
		for (index = 0; index < $scope.courses.length; index++) {
			courseIDs.push($scope.courses[index].id);

			var sections = $scope.courses[index].sections;
			for (var s = 0; s < sections.length; s++) {
				thisSection = sections[s];
				if (!thisSection.checked) {
					sectionExl.push(thisSection.id);
				}
			}
		}

		// Turn the parameters into JSON objects
		var stringifiedCourses = JSON.stringify(courseIDs);
		var stringifiedPriorities = JSON.stringify($scope.priorities.priorities);
		var stringifiedSectionExl = JSON.stringify(sectionExl);

		// Make the GET request
		$http.get('/api/schedule', {
			params : {
				'courses': stringifiedCourses,
				'priorities': stringifiedPriorities,
				'exclude_sec': stringifiedSectionExl
			}
		}).
		success( function (data, status) {
			$scope.testSolution = data;
			injectColor($scope.testSolution.sections);
			$scope.currentSchedule.index = 0;
			$scope.needsUpdate.val = false;
			$scope.impossible = false;
			$scope.unexplainedError = false;
			$scope.noClasses = [];
		}).
		error( function (data, status, headers, config) {
			if (status == 409) {
				$scope.noClasses = data;
			} else if (status == 417) {
				$scope.impossible = true;
				$scope.testSolution = {};
			} else {
				//alert("Oh no! There was a server error :(");
				$scope.unexplainedError = true;
			}
		});
	}

	$scope.clearSolution = function () {
		$scope.testSolution = {};
	}

	$scope.courseSelected = function (course) {
		$scope.addCourse(course);
	}

	$scope.removeCourse = function ($course) {
		oldColor = $course['color'];
		freeColor(oldColor);

		var i = $scope.courses.indexOf($course);
		$scope.courses.splice(i, 1);
		$scope.needsUpdate.val = true;
		if ($scope.courses.length > 0) {
			$scope.updateSchedules();
		} else {
			$scope.testSolution = {};
		}
		updateTotalUnits();

		// MixPanel call
		mixpanel.track("Course remove");
	}	

	$scope.addCourse = function ($course) {
		var i = $scope.courses.indexOf($course);
		if (i == -1) {
			// if the course is not already in the bin

			// give the course a new color
			assignNewColor($course);

			// add the new course to the courses array
			$scope.courses.push($course);

			// MixPanel call
			mixpanel.track("Course add");

			// downlod the sections for the course
			Sections.getSections($course.department, $course.number, function (data, status) {
				$course.sections = data;
				var sections = $course.sections;
				for (var j = 0; j < sections.length; j++) {
					var thisSection = sections[j];
					thisSection.checked = true;
					// restricts sections to only those open
					/* JUST FOR DEBUGGIN
					 SWITCH THE < BACK TO A >= FOR PRODUCTION
					 */
					if (thisSection.canceled == "Y" || parseInt(thisSection.number_registered) >= parseInt(thisSection.spaces_available)) {
						thisSection.checked = false;
					}
				}

				// Make a call to the server to update the schedules
				$scope.updateSchedules();
			});
			updateTotalUnits();
		} else {
			alert("That course is already in your bin.");
		}
		$scope.newCourse.name = '';
		$scope.needsUpdate.val = true;
	}

	$scope.updateClass = function () {
		if ($scope.needsUpdate.val) {
			return "success";
		}
		return "default"
	}

	$scope.editCourseSections = function (course) {
		var modalInstance = $modal.open({
			templateUrl: "partials/editSections.html",
			controller: EditSectionsCtrl,
			resolve: {
				course: function () {
					return course;
				}
			}
		});
		modalInstance.result.then(function () {
			$scope.updateSchedules();
		}, function () {
			// nothing to do
		});
		$scope.updateSchedules();
		mixpanel.track("Edit course sections");
	}

	$scope.noClassesEditCourseSections = function (course) {

		for (var i = 0; i < $scope.courses.length; i++) {
			var thisCourse = $scope.courses[i];
			if (thisCourse.name == course) {
				//var thisCourse = $scope.editCourseSections(thisCourse);
				var foundCourse = thisCourse;
				//return;
				break;
			}
		};

		var sections = foundCourse.sections;
		for (var i = 0; i < sections.length; i++) {
			var thisSection = sections[i];
			thisSection.checked = true;
		};

		$scope.updateSchedules();

	}

	$scope.viewSectionNumbers = function () {
		if ($scope.testSolution != {}) {
			// Grab the section numbers
			var sectionNumbers = $scope.testSolution.solutions[$scope.currentSchedule.index].sections;
			var sections = $scope.testSolution.sections;
			var sectionNumbersMap = {}

			// MixPanel call
			mixpanel.track("View section numbers");

			// Go through each section number in the solution
			for (var i = 0; i < sectionNumbers.length; i++) {
				var thisSectionNumber = sectionNumbers[i];

				// Find the corresponding section object
				var foundId = -1;
				for (var j = 0; j < sections.length; j++) {
					if (sections[j].sectionNumber == thisSectionNumber) {
						foundId = j;
						break;
					}
				}

				// Store it in the map
				if (foundId != -1) {
					var foundSection = sections[foundId];

					// Is there already an entry?
					var thisMapObject = sectionNumbersMap[foundSection.courseTitle];

					if (thisMapObject) {
						thisMapObject.sections.push(foundSection.sectionNumber);
					} else {
						sectionNumbersMap[foundSection.courseTitle] = {sections: [ foundSection.sectionNumber ]};
					}
				}
			}

			var modalInstance = $modal.open({
				templateUrl: "partials/saveSchedule.html",
				controller: SaveScheduleCtrl,
				resolve: {
					sectionNumbers: function () {
						return sectionNumbersMap
					}
				}
			});
		}
	}

	$scope.viewFinalSchedule = function () {
		// Get a list of all the discussion sections for the current schedule
		var section_list = [];

		if ($scope.testSolution != {}) {
			// Grab the section numbers
			var sectionNumbers = $scope.testSolution.solutions[$scope.currentSchedule.index].sections;
			var sections = $scope.testSolution.sections;

			// MixPanel call
			mixpanel.track("View final schedules");

			// Go through each section number in the solution
			for (var i = 0; i < sectionNumbers.length; i++) {
				var thisSectionNumber = sectionNumbers[i];

				// Find the corresponding section object
				var foundId = -1;
				for (var j = 0; j < sections.length; j++) {
					if (sections[j].sectionNumber == thisSectionNumber) {
						foundId = j;
						break;
					}
				}

				// Add it to the list if it's a lecture section
				var foundSection = sections[foundId];
				if (foundSection.type == "lecture" || foundSection.type == "lecture-lab") {
					section_list.push(foundSection);
				}
			}
		}

		var modalInstance = $modal.open({
			templateUrl: "partials/finalSchedule.html",
			controller: FinalScheduleCtrl,
			resolve: {
				sections: function () {
					return section_list;
				}
			}
		});
	}
}