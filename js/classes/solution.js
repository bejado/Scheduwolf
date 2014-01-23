/**
 * A Solution object. The constructor takes data from the server, which should be a
 * JSON dictionary with two keys: "sections" and "schedules".
 */
function Solution (data) {

	/***************
	 private methods
	 ***************/

	/****************
	 public interface
	 ****************/

	/**
	 * Loads data into the Solution object. Expects a JSON dicitonary with two keys: "sections" and "schedules"
	 * Constructs Schedule objects from the given raw schedule data.
	 */
	this.loadData = function (data) {
		var raw_schedules = data.solutions;		// TODO right now, the server calls it "solutions", but it sould be called "schedules" to stay consistent. I need to change this.
		var raw_sections = data.sections;

		// Go through the provided data, create Schedule objects, and add them to our list.
		for (var i = 0; i < raw_schedules.length; i++) {
			var thisSchedule = raw_schedules[i];
			var newSchedule = new Schedule(thisSchedule);
			this.schedules.push(newSchedule);
		}
	}

	/**
	 * Returns the number of schedules in this solution.
	 */
	this.getScheduleCount = function () {
		return this.schedules.length;
	}

	/**
	 * Returns a Schedule object representing the schedule at index num.
	 */
	this.getSchedule = function (num) {
		if (num < this.schedules.length && num >= 0) {
			return this.schedules[num];
		} else {
			throw "Schedule index out of bounds.";
		}
	}

	/***********
	 constructor
	 ***********/

	this.schedules = [];

	if (data) {
		this.loadData(data);
	}

}