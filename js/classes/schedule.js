/**
 * A Schedule object.
 */
function Schedule (data, sections) {

	/****************
	 public interface
	 ****************/

	 /**
	  * Returns a Section object at the given index.
	  */
	 this.getSection = function (index) {
	 	// Check to make sure the index is in bounds
	 	if (index < 0 || index >= this.sections.length) {
	 		throw "Section index out of bounds."
	 		return;
	 	}

	 	return this.sections[index];		// TODO this needs to change, obviously
	 }

	 /**
	  * Returns the total number of sections in this schedule.
	  */
	 this.getSectionCount = function () {
	 	return this.sections.length;
	 }

	 this.loadData = function (data, sections) {

	 	// Verify the data source
 		this.sections = data.sections;
 		this.stats = data.stats;
 		this.sectionArray = sections;

 		if (!this.sections || this.sectionArray.length == 0) {
 			throw "Bad data given.";
 		}

	 }

	/***************
	 private methods
	 ***************/

	/***********
	 constructor
	 ***********/

	 this.sectionArray = [];
	 this.sections = [];
	 this.stats = {};

	 if (data && sections) {
	 	this.loadData(data, sections);
	 }

}