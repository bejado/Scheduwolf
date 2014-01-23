app.directive('swPrioritySorter', function($timeout) {

	function postLink (scope, element, attrs) {

		// The timeout is necessary to ensure the ng-repeat has been compiled before we apply .sortable
		$timeout(function () {
			element.find("#sortable").sortable({
				update: function (event, ui) {
					scope.$apply( function () {
						scope.priorities = element.find("#sortable").sortable( "toArray" );
						scope.update = true;
					});
				}
			});
		}, 0);

	}

	return {
		restrict: 'E',
		link: postLink,
		scope: {
			'priorities': '=',
			'update': '='
		},
		templateUrl: "js/directives/priority_sorter.html"
	};
});