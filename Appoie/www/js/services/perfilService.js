app.service('perfilService', function ($http) {

	this.alterarPerfil = function (usuario)
	{
		return $http.post("http://localhost:9092/usuario/auth", usuario);
		//return $http.put("http://192.168.107.53:9092/usuario/auth", usuario);

	};

});