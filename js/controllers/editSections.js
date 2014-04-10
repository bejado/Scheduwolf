function EditSectionsCtrl ($scope, course, $modalInstance) {

	initSections();

	function initSections () {
		sectionTypesObj = {}
		for (var i = 0; i < course.sections.length; i++) {
			var thisSection = course.sections[i];

			array = sectionTypesObj[thisSection.type];
			if (!array) {
				array = [thisSection];
				sectionTypesObj[thisSection.type] = array;
			} else {
				array.push(thisSection);
			}
		}

		$scope.sectionTypes = [];
		for (var key in sectionTypesObj) {

			$scope.sectionTypes.push({type: key, sections: sectionTypesObj[key]});
		}

		$scope.course = course;
	}

	$scope.closeDialog = function () {
		$modalInstance.close();
	}

	function selectAll (value) {
		console.log("all or none!");
		for (var i = 0; i < $scope.sectionTypes.length; i++) {
			var thisSectionType = $scope.sectionTypes[i];
			for (var j = 0; j < thisSectionType.sections.length; j++) {
				var thisSection = thisSectionType.sections[j];
				thisSection.checked = value;
			}
		}	
	}

	$scope.selectAll = function () {
		selectAll(true);
	}

	$scope.selectNone = function () {
		selectAll(false);
	}

	$scope.selectOpen = function () {
		for (var i = 0; i < $scope.sectionTypes.length; i++) {
			var thisSectionType = $scope.sectionTypes[i];
			for (var j = 0; j < thisSectionType.sections.length; j++) {
				var thisSection = thisSectionType.sections[j];

				thisSection.checked = (thisSection.canceled == "N" && thisSection.number_registered < thisSection.spaces_available);
			}
		}	
	}

}