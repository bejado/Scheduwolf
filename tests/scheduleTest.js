var scheduleData = {
    "sections": [
        "30440",
        "30420",
        "30978",
        "30434"
    ],
    "stats": {
        "Total class time": 6.166666666666666,
        "Average start time": 12.333333333333334,
        "Class time on Friday": 2
    }
};

var sectionDict = [{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30966","type":"lab","meetings":[{"startTime":[9,0],"days":[0,0,0,0,1,0,0],"endTime":[11,50]}]},{"location":"Cosmo'sApartment","status":"Open","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30440","type":"lecture-lab","meetings":[{"startTime":[16,0],"days":[0,0,0,0,1,0,0],"endTime":[18,0]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30438","type":"lab","meetings":[{"startTime":[17,0],"days":[0,1,0,0,0,0,0],"endTime":[19,50]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30436","type":"lab","meetings":[{"startTime":[17,0],"days":[0,0,1,0,0,0,0],"endTime":[19,50]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30979","type":"lab","meetings":[{"startTime":[13,0],"days":[0,0,0,0,1,0,0],"endTime":[15,50]}]},{"location":"Cosmo'sApartment","status":"Open","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30420","type":"lecture","meetings":[{"startTime":[10,30],"days":[1,0,1,0,0,0,0],"endTime":[11,50]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30416","type":"lecture","meetings":[{"startTime":[9,30],"days":[0,1,0,1,0,0,0],"endTime":[10,50]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30978","type":"discussion","meetings":[{"startTime":[24,24],"days":[0,0,0,0,0,0,0],"endTime":[24,24]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30976","type":"lab","meetings":[{"startTime":[17,0],"days":[0,0,0,1,0,0,0],"endTime":[19,50]}]},{"location":"Cosmo'sApartment","status":"Closed","courseTitle":"IntroductiontoDigitalCircuits","sectionNumber":"30434","type":"lab","meetings":[{"startTime":[18,0],"days":[1,0,0,0,0,0,0],"endTime":[20,50]}]}];

var badData = {};
var badDict = [];

test("Constructor", function () {
	var schedule = new Schedule( );
	expect(0);
});

test("Main", function () {
	// Create a new, empty schedule object
	var schedule = new Schedule();

	throws(
		function () {
			schedule.getSection(3);
		},
		"Throws exception before schedule data has been loaded"
	);

	ok(schedule.getSectionCount() == 0, "Returns section count of 0 before data has been loaded.");

	// Load the data for the schedule object
	schedule.loadData(scheduleData, sectionDict);
	ok(schedule.getSectionCount() == 4, "Returns the correct amount of sections.");

	throws(
		function () {
			schedule.getSection(-1);
		},
		"Throws exception when accessing a negative index."
	);

	throws(
		function () {
			schedule.getSection(5);
		},
		"Throws exception when accessing out of bounds section."
	);
});

test("Bad Data", function () {
	throws (
		function () {
			var schedule = new Schedule(badData, sectionDict);
		},
		"Throws exception when given bad section data."
	);

	throws (
		function () {
			var schedule = new Schedule(scheduleData, badDict);
		},
		"Throws exception when given a bad section dictionary."
	)
});