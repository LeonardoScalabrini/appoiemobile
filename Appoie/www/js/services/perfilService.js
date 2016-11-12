app.service('perfilService', function ($http) {

	this.alterarPerfil = function (usuario)
	{
		//return $http.post("http://localhost:8080/usuario/auth", usuario);
		return $http.put("http://localhost:9092/usuario/auth", usuario);

	};

});