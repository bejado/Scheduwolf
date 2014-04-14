app.directive('swTooltip', function () {

	function link (scope, element, attrs) {
		$(element).qtip({
			content: {
				text: attrs['tip']
			},
			/*
			Don't auto show or hide the tip. We'll take care of that.
			*/
			show: {
				event: ''
			},
			hide: {
				event: ''
			}
		});

		/*
		Update the tip's visibility when the visible attribute changes
		*/
		scope.$watch('visible', function (newValue, oldValue) {
			$(element).qtip('toggle', newValue);
		});
	}

	return {
		restrict: 'A',
		link: link,
		scope: {
			visible: '='
		}
	};
});