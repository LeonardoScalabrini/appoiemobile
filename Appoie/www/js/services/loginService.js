app.service('loginService', function ($http) {

	this.logar = function (usuario)
	{
		return $http.post("http://localhost:8080/usuario/auth", usuario);
		//return $http.post("http://192.168.107.53:8080/usuario/auth", usuario);
	};

	this.recuperarSenha = function ()
	{
		// Requisição para recuperação de senha.
	};
	
});