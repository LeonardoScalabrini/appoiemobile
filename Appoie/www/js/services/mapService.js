app.service('mapService', function ($http) {

	this.salvar = function (post)
	{
		return $http.post('http://192.168.0.106:9092/publicacao/salvar', post);
	}

	this.getMarkers = function ()
	{
		return $http.get('http://192.168.0.106:9092/publicacao/marcadores');
	}

	this.getIcons = function ()
	{
		return $http.get('http://192.168.0.106:9092/publicacao/icones');
	}

	this.getPostMin = function (id) {
		return $http.get('http://192.168.0.106:9092/publicacao/previa/' + id);
	}

});