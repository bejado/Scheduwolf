app.directive('swSchedule', function() {

	function link (scope, element, attrs) {
		// Calendar variables
		var state = 0;	// 0 - normal, 1 - selected a section
		var globalTip = true;
		var viewingAlternativeSectionsFor;
		var prettyColors = true;

		// Initialize calendar
		$(element).fullCalendar( {
				editable: true,
				weekends: false,
				defaultView: 'agendaWeek',
				allDaySlot: false,
				minTime: '8:00am',
				maxTime: '11:00pm',
				columnFormat: 'dddd',
				titleFormat: '',
				aspectRatio: 1.0,
				buttonText: {
					prev: '',
					next: ''
				},
				eventRender: function (event, element) {
					if (event.hasAlternatives) {
						element.append("<span style='position: absolute; display: block; right: 1%; top: 2.5%' class='glyphicon glyphicon-time'></span>");
					}
				},
				eventClick: function(event) {
					eventClick(event);
				},
				dayClick: function() {
					dayClick();
				},
				eventAfterRender: function(event, element) {
					if (event.low) {
						element.css('opacity', '.3');
					} else {
						element.css('opacity', '1');
					}
					if (event.hasAlternatives) {
						element.css('border-color', 'black');
						element.css('border-width', '2px');
					}
					element.css('transition', 'opacity .2s');
					element.css('color', 'black');

					
					if (globalTip) {
						// Create qtip content
						var qtipContent = "";
						qtipContent += "<b style='font-size: 14px;'>" + event.section.courseTitle + "</b><br>";
						if (event.section.location.length > 2) qtipContent += "Location: " + event.section.location + "<br>";
						if (event.section.instructor) qtipContent += "Professor: " + event.section.instructor + "<br>";
						if (event.section.type) qtipContent += "Section type: " + event.section.type + "<br>";
						qtipContent += "Section number: " + event.section.sectionNumber;
						
						element.qtip({
								content: qtipContent,
								position: {
									target: 'mouse',
									adjust: {x: 5, y: 5},
									viewport: $(window)
								},
								style: {
									classes: 'qtip-tipsy'
								}
						});
					}
				}
			} );
		$(element).fullCalendar('next');

		// (d, m, y) represents the Monday of the next week
		var date = new Date();
		var day = date.getDate() + 7 - (date.getDay() - 1);
		var month = date.getMonth();
		var year = date.getFullYear();

		var sectionArray = scope.solutionObject.sections;
		var solutionArray = scope.solutionObject.solutions;

		/**
		 * Call this function to display a solution on the calendar.
		 * solution should be a dictionary containing sections and stats
		 * If highSection is set, every section will be low except the high section.
		 * Fill dditionalSections with any other sections to be rendered.
		 */
		function displaySolution(solution, sectionArray, highSection, additionalSections) {

			// First let's clear any events currently on the calendar
			$(element).fullCalendar('removeEvents');
			
			// Clear any qtips
			$(".qtip").remove();
			
			// We're going to go through the solution and create an array of events
			// to put on our calendar
			var calendarEvents = [];

			// When we need a new color for a new course, we'll choose one from our list using this index
			//var newColorIndex = 0;

			// Each course will be mapped to a unique color
			//var colorDictionary = {};

			// Go through each section in the solution
			for (var i = 0; i < solution.sections.length; i++) {

				// The solution is a dictionary. One of the entries is "sections", which is an array of section numbers
				var thisSectionNumber = solution.sections[i];

				// Now we need to look up the section in our array of sections
				// I should probably make this a dictionary...
				var thisSection;
				for (var s = 0; s < sectionArray.length; s++) {
					if (sectionArray[s].sectionNumber == thisSectionNumber) {
						thisSection = sectionArray[s];
					}
				}

				// Decide which color to use
				/*
				courseTitle = thisSection.courseTitle;
				var color = "";
				if (courseTitle in colorDictionary) {
					console.log("were in");
					color = colorDictionary[courseTitle];
				} else {
					console.log("not in");
					newColor = colors[newColorIndex];
					colorDictionary[courseTitle] = newColor;
					color = newColor;
					newColorIndex++;
				}
				*/
				color = thisSection.color;
				
				// Check to see if the section is on our low sections list
				var lowValue = false;
				if (highSection) {
					lowValue = true;
					if (thisSectionNumber == highSection)
						lowValue = false;
				}
				
				// Check to see if the section has alternatives
				var hasAlternatives = false;
				if (calculateAlternativeSections(solution.sections, thisSectionNumber).length > 0)
					hasAlternatives = true;

				// Go through each day of the week
				for (var d = 0; d < 7; d++) {
				
					// Go through each meeting
					for (var meet = 0; meet < thisSection.meetings.length; meet++) {
						var thisMeeting = thisSection.meetings[meet];
						
						if (thisMeeting.days[d] == true) {
							calendarEvents.push({title: thisSection.courseTitle + ": " + thisSection.type,
												start: new Date(year, month, day + d, thisMeeting.startTime[0], thisMeeting.startTime[1]),
												end: new Date(year, month, day + d, thisMeeting.endTime[0],thisMeeting.endTime[1]),
												allDay: false,
												editable: false,
												id: thisSection.sectionNumber,
												section: thisSection,
												color: color,
												low: lowValue,
												hasAlternatives: hasAlternatives});
						}
					}
				}
			}
			
			// Go through each section in additionalSections
			if (additionalSections) {
				for (var i = 0; i < additionalSections.length; i++) {
			
					// The solution is just an array of section numbers
					var thisSectionNumber = additionalSections[i];

					// Now we need to look up the section in our array of sections
					// I should probably make this a dictionary...
					var thisSection;
					for (var s = 0; s < sectionArray.length; s++) {
						if (sectionArray[s].sectionNumber == thisSectionNumber) {
							thisSection = sectionArray[s];
						}
					}
					
					// Choose a color for the section
					/*
					if (prettyColors) {
						var colorIndex = i > colors.length - 1 ? colors.length - 1 : i;
						var theColor = colors[colorIndex];
					} else {
						var theColor = 'rgb(' + String(100 + i * 70) + ',0,0)';
					}
					*/

					// Go through each day of the week
					for (var d = 0; d < 7; d++) {
					
						// Go through each meeting
						for (var meet = 0; meet < thisSection.meetings.length; meet++) {
							var thisMeeting = thisSection.meetings[meet];
							
							if (thisMeeting.days[d] == true) {
								calendarEvents.push({title: thisSection.courseTitle + ": " + thisSection.type,
													start: new Date(year, month, day + d, thisMeeting.startTime[0], thisMeeting.startTime[1]),
													end: new Date(year, month, day + d, thisMeeting.endTime[0], thisMeeting.endTime[1]),
													allDay: false,
													editable: false,
													id: thisSection.sectionNumber,
													color: "grey",
													low: false,
													alternative: true});
							}
						}
					}

				}
			}
	
			// Add the events to the calendar
			$(element).fullCalendar('addEventSource', calendarEvents);
			
		}

		function calculateAlternativeSections(solution, section) {
			var solutionMinusSection = [];
			for (var i = 0; i < solution.length; i++) {
				if (solution[i] != section)
					solutionMinusSection.push(solution[i]);
			}
			
			
			var alternativeSolutions = [];
			for (var i = 0; i < solutionArray.length; i++) {
				var thisSolution = solutionArray[i].sections;
				var count = thisSolution.length;
				for (var j = 0; j < solutionMinusSection.length; j++) {		// for every item in solutionMinusSection
					for (var k = 0; k < thisSolution.length; k++) {			// see if it exists in thisSolution
						if (thisSolution[k] == solutionMinusSection[j])
							count--;										// if so, decrease the count
					}
				}
				if (count == 1)												// if the count is only 1, we have found a valid solution
					alternativeSolutions.push(thisSolution);
			}
			
			var finalSolutions = [];
			for (var i = 0; i < alternativeSolutions.length; i++) {
				if (!sameItems(alternativeSolutions[i],solution))
					finalSolutions.push(alternativeSolutions[i]);
			}
			
			var finalSolutionsSansSection = [];
			for (var i = 0; i < finalSolutions.length; i++) {
				var thisFinalSolution = finalSolutions[i];
				finalSolutionsSansSection.push( thisFinalSolution.filter(function(element){
					for (var j = 0; j < solutionMinusSection.length; j++) {
						if (element == solutionMinusSection[j])
							return false;
					}
					return true;
				}) );
			}
			
			return finalSolutionsSansSection;
		}

		function getNewViewingSolution(solution, currentSection, newSection) {
			newSolution = [];
			for (var i = 0; i < solution.length; i++) {
				if (solution[i] == currentSection)
					newSolution.push(newSection);
				else
					newSolution.push(solution[i]);
			}
			
			for (var i = 0; i < solutionArray.length; i++) {
				if (sameItems(solutionArray[i].sections, newSolution))
					return i;
			}
		}

		/**
		 * Called when one of the calendar events is clicked.
		 * Transitions the calendar to view alternate sections.
		 */
		function eventClick (event) {
			// If we're in normal mode
			if (state == 0) {	
				globalTip = false;
				viewingAlternativeSectionsFor = event.id;
				var addlSections = calculateAlternativeSections(solutionArray[scope.currentSchedule.index].sections, event.id);
				displaySolution(solutionArray[scope.currentSchedule.index], sectionArray, event.id, addlSections);
				state = 1;
				
			} 
			// If we're already viewing alternative sections
			else if (state == 1) {
				globalTip = true;
				if (event.alternative) {
					scope.$apply(function () {
						scope.currentSchedule.index = getNewViewingSolution(solutionArray[scope.currentSchedule.index].sections, viewingAlternativeSectionsFor, event.id);					
					})
				} else {
					displaySolution(solutionArray[scope.currentSchedule.index], sectionArray);
				}
				state = 0;
			}
		}

		function dayClick () {
			globalTip = true;
			state = 0;
			displaySolution(solutionArray[scope.currentSchedule.index], sectionArray);
		}

		function sameItems(A, B) {
			count = B.length;
			// Go through every item in A
			for (var i = 0; i < A.length; i++) {
				var item = A[i];
				// see if that item exists in B
				for (var j = 0; j < B.length; j++) {
					if (B[j] == item)
						count--;
				}
			}
			return count == 0;
		}

		scope.$watch('currentSchedule.index', function (value) {
			if (solutionArray) {
				displaySolution(solutionArray[scope.currentSchedule.index], sectionArray, false, []);
			}
		});

		scope.$watch('solutionObject', function (value) {
			sectionArray = scope.solutionObject.sections;
			solutionArray = scope.solutionObject.solutions;
			if (solutionArray) {
				displaySolution(solutionArray[scope.currentSchedule.index], sectionArray, false, []);
			}
		})

	}

	return {
		restrict: 'E',
		scope: {
			solutionObject : '=solution',
			currentSchedule : '='
		},
		link: link
	};
});