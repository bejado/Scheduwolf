function SaveScheduleCtrl ($scope, $modalInstance, sectionNumbers) {
	$scope.numbersOutput = '';

	for (var key in sectionNumbers) {
		$scope.numbersOutput += key + '\n';

		var sectionsArray = sectionNumbers[key].sections;
		for (var i = 0; i < sectionsArray.length; i++) {
			$scope.numbersOutput += sectionsArray[i] + '\n';
		}

		$scope.numbersOutput += '\n';
	}

	$scope.closeDialog = function () {
		$modalInstance.close();
	}
	
}