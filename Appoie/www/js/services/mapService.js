app.service('mapService', function ($http) {

	this.salvar = function (post)
	{

		//return $http.post('http://192.168.107.53:9092/publicacao/salvar', post);
		return $http.post('http://localhost:9092/publicacao/salvar', post);


	}

	this.getMarkers = function ()
	{

		//return $http.get('http://192.168.107.53:9092/publicacao/marcadores');
		return $http.get('http://localhost:9092/publicacao/marcadores');

	}

	this.getIcons = function ()
	{

		return $http.get('http://localhost:9092/publicacao/icones');
		//return $http.get('http://192.168.107.53:9092/publicacao/icones');


	}

	this.getPostMin = function (id) {

		//return $http.get('http://192.168.107.53:9092/publicacao/previa/' + id);
		return $http.get('http://localhost:9092/publicacao/previa/' + id);

	}
	
	this.getPostMax = function(id){
		return $http.get('http://localhost:9092/publicacao/previa/' + id);
		//return $http.get('http://192.168.107.53:9092/publicacao/detalhada/' + id);

	}

	this.apoiar = function (id) 
	{
		//return $http.post('http://192.168.107.53:9092/publicacao/apoiar/' + id);
		return $http.post('http://localhost:9092/publicacao/apoiar/' + id);

	}

});