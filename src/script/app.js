let app = angular.module('app', []);

app.run((TasksService) => {
	TasksService.loadTasks();
});

app.factory('TaskFactory', () => {
	return function(data) {
		this.id = typeof data.id === 'undefined' ? 0 : data.id;
		this.title = typeof data.title === 'undefined' ? '' : data.title;
		
		if (typeof data.priority === 'undefined') {
			this.priority = "Normal";
		} else if (data.priority == 1) {
			this.priority = "High";
		} else if (data.priority == 2) {
			this.priority = "Normal";
		} else if (data.priority == 3) {
			this.priority = "Low";
		}
	};
});

app.service('TasksService', function($http, TaskFactory) {
	this.tasks = [];

	let data = [
		{
			"id": 0,
			"title": "Go to work",
			"priority": 1
		},
		{
			"id": 1,
			"title": "Go to the gym",
			"priority": 2
		},
		{
			"id": 3,
			"title": "Go to the store",
			"priority": 3
		}
	];

	this.loadTasks = () => {
		for (let i = 0; i < data.length; i++) {
			this.tasks.push(new TaskFactory(data[i]));
		}
	}

	this.remove = (task) => {
		for (let i = 0; i < this.tasks.length ; i++) {
			if (task.id == this.tasks[i].id) {
				this.tasks.splice(i, 1);
				return;
			}
		}
	};

	this.add = (data) => {
		if (typeof data.id === 'undefined') data.id = this.tasks.length;
		this.tasks.push(new TaskFactory(data));
	};

	this.clear = () => {
		this.tasks = [];
	};
});

app.controller('AppCtrl', ($scope, TasksService) => {
	$scope.tasks = TasksService.tasks;
});

app.controller('TasksCtrl', (TasksService, $scope) => {
	$scope.task = {};

	$scope.remove = (task) => {
		TasksService.remove(task);
	};

	$scope.add = () => {
		TasksService.add($scope.task);
		$scope.task = {};
	};

});

app.controller('ToolsCtrl', (TasksService, $scope) => {
	$scope.clear = () => {
		TasksService.clear();
	};
});
