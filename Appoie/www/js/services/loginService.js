app.service('loginService', function ($http) {

	this.logar = function (usuario)
	{
		return $http.post("http://localhost:9092/usuario/auth", usuario);
		//return $http.post("http://192.168.107.53:9092/usuario/auth", usuario);
	};

	this.recuperarSenha = function ()
	{
		// Requisição para recuperação de senha.
	};
	
	this.logarFacebook = function (usuario)
	{
		return $http.post("http://localhost:9092/usuarioFacebook/salvar", usuario);
		//return $http.post("http://192.168.1.104:9092/usuarioFacebook/salvar", usuario);
	};

});