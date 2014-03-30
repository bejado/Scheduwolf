function FinalScheduleCtrl ($scope, $http, $modalInstance, sections) {
	$scope.sections = sections;

	$scope.closeDialog = function () {
		$modalInstance.close();
	}
}