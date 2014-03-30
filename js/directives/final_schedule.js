app.directive('swFinalSchedule', function () {
	function link (scope, element, attrs) {
		scope.days = [
			["Wednesday", "Dec 10"],
			["Thursday", "Dec 11"],
			["Friday", "Dec 12"],
			["Saturday", "Dec 13"],
			["Sunday", "Dec 14"],
			["Monday", "Dec 15"],
			["Tuesday", "Dec 16"],
			["Wednesday", "Dec 17"]
		];

		scope.times = [
			"8-10 AM",
			"11-1 PM",
			"2-4 PM",
			"4:30-6:30 PM",
			"7-9 PM"
		];

		scope.exams = loadExams();
		//scope.exams = [];

		/*
		var meeting = {
		            "startTime": [
		                15, 
		                30
		            ], 
		            "days": [
		                0, 
		                1, 
		                0, 
		                1, 
		                0, 
		                0, 
		                0
		            ], 
		            "endTime": [
		                17, 
		                50
		            ]};
		*/
		/*
		var section =  {
            "location": "The inner circle of Hell", 
            "status": "Open", 
            "courseTitle": "Principles of Software Development", 
            "sectionNumber": "29931", 
            "type": "lecture", 
            "meetings": [
                {
                    "startTime": [
                        8, 
                        00
                    ], 
                    "days": [
                        0, 
                        1, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0
                    ], 
                    "endTime": [
                        19, 
                        20
                    ]
                }
            ]
        };
        */

		scope.examAtLocation = function (col, row) {
			for (var i = scope.exams.length - 1; i >= 0; i--) {
				var this_exam = scope.exams[i];
				if (this_exam.column == col && this_exam.row == row) {
					return this_exam;
				}
			};
			return false;
		}

		/*
		Goes through the sections provided to this directive, computes their exam time, and adds them to the grid.
		*/
		function loadExams () {
			exams = [];
			for (var i = 0; i <= scope.lectureSections.length - 1; i++) {
				thisLecture = scope.lectureSections[i];
				columnRowLocation = processSection(thisLecture);
				console.log(columnRowLocation);
				newExam = {"name": thisLecture.courseTitle, "column": columnRowLocation[0], "row": columnRowLocation[1]};
				exams.push(newExam);
			};
			return exams;
		}

		function processSection (section) {
			// determine if the section is categorized as MWF or TTH
			console.log("Processing...");
			console.log(section);
			console.log(section.meetings);


			var meeting = firstMeeting(section.meetings);
			var days = meeting.days;
			var fday = firstDay(days);

			// Check if there are any exceptions for this section
			console.log("First check for exceptions...");
			var exception = checkException(section);
			if (exception) {
				return exception;
			}

			if (fday == 0 || fday == 2 || fday == 4) {	// first meeting day is MWF
				console.log("Determined it is a MWF");
				return processDaySet(meeting, MWFconditions);
			}
			if (fday == 1 || fday == 3 || fday == 5) {	// first meeting day is TTh
				console.log("Determined it is a TTh");
				return processDaySet(meeting, TTHconditions);
			}
		}

		/*
		Checks a meeting against a given list of conditions. Typically either MWFconditions or TTHconditions.
		Returns an array in the style of [column, row] if a match is found. False otherwise.
		*/
		function processDaySet (meeting, conditions) {
			// go through every condition in the given conditions list
			for (var i = 0; i < conditions.length; i++) {
				var thisCondition = conditions[i];
				var conditionsList = thisCondition['conditions'];
				if (checkCondition(meeting, conditionsList)) {
					return [thisCondition['column'], thisCondition['row']];
				}
			};
			return false;
		}

		/*
		Checks if any microcondition matches this meeting
		*/
		function checkCondition (meeting, condition) {
			// go through each microcondition
			for (var i = 0; i < condition.length; i++) {
				thisMicrocondition = condition[i];
				if (checkMicrocondition(meeting, thisMicrocondition)) {
					return true;
				}
			};
			return false;
		}

		/*
		Checks if a microcondition matches a meeting
		*/
		function checkMicrocondition (meeting, microcondition) {
			match = true;
			for (key in microcondition) {
				microcondition_value = microcondition[key];
				if (key in meeting) {
					meeting_value = meeting[key];
					match = match && JSON.stringify(meeting_value) === JSON.stringify(microcondition_value);
				}
			}
			return match;
		}

		/*
		Checks if a section matches any exception
		*/
		function checkException (meeting) {
			for (var i = 0; i < exceptions.length; i++) {
				var thisException = exceptions[i];
				if (thisException.id === meeting.id) {
					return [thisException.column, thisException.row];
				}
			};
			return false;
		}

		/*
		Returns the index of the first day of a given day array
		*/
		function firstDay (dayArray) {
			for (var i = 0; i <= dayArray.length - 1; i++) {
				day = dayArray[i];
				if (day) {
					return i;
				}
			}
			return -1;
		}

		/*
		Returns the first meeting from a given array of meetings
		*/
		function firstMeeting (meetingArray) {
			var firstMeeting = meetingArray[0];
			var dayToBeat = firstDay(firstMeeting.days);
			for (var i = 1; i < meetingArray.length; i++) {
				var thisMeeting = meetingArray[i];
				var days = thisMeeting.days;
				if (firstDay(days) <= dayToBeat) {
					firstMeeting = thisMeeting;
				}
			};
			return firstMeeting;
		}
	}

	return {
		link: link,
		restrict: 'E',
		templateUrl: 'js/directives/final_schedule.html',
		scope: {
			lectureSections: '=sections'
		}
	};
});