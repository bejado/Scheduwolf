/**
 * A Solution object. The constructor takes data from the server, which should be a
 * JSON dictionary with two keys: "sections" and "schedules".
 */
function Solution (data) {
	this.raw_schedules = data.schedules;
	this.raw_sections = data.sections;
	this.schedules = [];
	generateObjects();

	/****************
	 public interface
	 ****************/

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
		}
	}

	/***************
	 private methods
	 ***************/

	/**
	 * Constructs Schedule objects from the given raw schedule data.
	 */
	function generateObjects () {
		for (var i = 0; i < this.raw_schedules.length; i++) {
			var thisSchedule = this.raw_schedules[i];
			var newSchedule = new Schedule(thisSchedule);
			this.schedules.push(newSchedule);
		}
	}
}