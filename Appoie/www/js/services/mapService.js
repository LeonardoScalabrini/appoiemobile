app.service('mapService', function ($http) {

	this.salvar = function (post)
	{
		return $http.post('/publicacao/salvar', post);
	}

	this.getMarkers = function ()
	{
		return $http.get('publicacao/marcadores');
	}

	this.getIcons = function ()
	{
		return $http.get('publicacao/icones');
	}

	this.getPostMin = function (id) {
		return $http.get('publicacao/previa/' + id);
	}

});