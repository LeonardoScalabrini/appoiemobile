app.service('mapService', function ($http) {

	this.salvar = function (post)
	{
		return $http.post('/publicacao/salvar', post);
	}

});