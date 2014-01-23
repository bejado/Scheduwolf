var app = angular.module('scheduwolf', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])

app.factory("Courses", function() {
	return [];
});

app.factory('Sections', function ($http) {
	return {
		getSections: function (department, number, callback) {
			$http.get('/api/sections', {
				params : {
					'department': department,
					'number': number
				}
			}).success(callback);
		}
	};
});