var sampleResponse = {"sections":[{"location":"Cosmo\u0027s Apartment","status":"Closed","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10398","type":"discussion","meetings":[{"startTime":[13,0],"days":[1,0,0,0,0,0,0],"endTime":[13,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10394","type":"discussion","meetings":[{"startTime":[13,0],"days":[0,0,0,0,1,0,0],"endTime":[13,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Computer Graphics","sectionNumber":"30113","type":"discussion","meetings":[{"startTime":[15,0],"days":[0,0,0,0,1,0,0],"endTime":[15,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Closed","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10397","type":"discussion","meetings":[{"startTime":[13,0],"days":[0,0,1,0,0,0,0],"endTime":[13,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10392","type":"discussion","meetings":[{"startTime":[11,0],"days":[0,0,0,0,1,0,0],"endTime":[11,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10390","type":"lecture","meetings":[{"startTime":[11,0],"days":[0,1,0,1,0,0,0],"endTime":[12,20]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10396","type":"discussion","meetings":[{"startTime":[13,0],"days":[0,0,0,1,0,0,0],"endTime":[13,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Exploring Ethnicity Through Film","sectionNumber":"10393","type":"discussion","meetings":[{"startTime":[12,0],"days":[0,0,0,0,1,0,0],"endTime":[12,50]}]},{"location":"Cosmo\u0027s Apartment","status":"Open","courseTitle":"Computer Graphics","sectionNumber":"29979","type":"lecture","meetings":[{"startTime":[10,0],"days":[1,0,1,0,0,0,0],"endTime":[11,50]}]}],"solutions":[{"sections":["30113","10392","10390","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":10.6,"Class time on Friday":1.6666666666666679}},{"sections":["30113","10390","10393","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":10.8,"Class time on Friday":1.6666666666666679}},{"sections":["10394","30113","10390","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":11.0,"Class time on Friday":1.6666666666666679}},{"sections":["30113","10390","10396","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":11.4,"Class time on Friday":0.8333333333333339}},{"sections":["30113","10397","10390","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":11.4,"Class time on Friday":0.8333333333333339}},{"sections":["10398","30113","10390","29979"],"stats":{"Total class time":4.833333333333336,"Average start time":11.4,"Class time on Friday":0.8333333333333339}}]};
var noSolutionResponse = "";

test("Main", function() {
	// Create a new, empty solution object
	var solution = new Solution();

	throws( 
		function () {
			solution.getSchedule(6);
		}, 
		"Throws expection when attempting to access schedules before data has been loaded."
	);

	ok( solution.getScheduleCount() == 0, "Returns schedule count of 0 before data has been loaded." );

	// Create a solution object and verify that there are 6 loaded schedules.
	solution.loadData(sampleResponse);
	ok( solution.getScheduleCount() == 6, "Solution object returns correct amount of schedules." );

	throws( 
		function () {
			solution.getSchedule(6);
		}, 
		"Throws expection when attempting to access a schedule index too high."
	);

	throws( 
		function () {
			solution.getSchedule(-1);
		}, 
		"Throws expection when attempting to access a schedule index too low."
	);

});

test( "Different Responses", function () {

	// Create a new, empty solution object
	var solution = new Solution();

	ok( solution.getScheduleCount() == 0, "Returns schedule count of 0 when the server returns no data." );

});