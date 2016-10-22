app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuController'
  })

  .state('app.mapa', {
      cache: false,
      url: '/mapa',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapa.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.configuracoes', {
      url: '/configuracoes',
      views: {
        'menuContent': {
          templateUrl: 'templates/configuracoes.html'
        }
      }
    })

    .state('app.minhasPostagens', {
      url: '/minhasPostagens',
      views: {
        'menuContent': {
          templateUrl: 'templates/minhasPostagens.html'
        }
      }
    })

    .state('app.perfil', {
      url: '/perfil',
      views: {
        'menuContent': {
          templateUrl: 'templates/perfil.html',
          controller: 'perfilController'
        }
      }
    })

    .state('app.alterarEmail', {
      url: '/perfil/alterarEmail',
      views: {
        'menuContent': {
          templateUrl: 'templates/alterarEmail.html',
          controller: 'perfilController'
        }
      }
    })

    .state('app.alterarSenha', {
      url: '/alterarSenha',
      views: {
        'menuContent': {
          templateUrl: 'templates/alterarSenha.html',
          controller: 'perfilController'
        }
      }
    })

    .state('app.postar', {
      url: '/postar',
      views: {
        'menuContent': {
          templateUrl: 'templates/postar.html',
          controller: 'postarController'
        }
      }
    })

    .state('app.postagens', {
      cache: true,
      url: '/postagens',
      views: {
        'menuContent': {
          templateUrl: 'templates/postagens.html',
          controller: 'postagensController'
        }
      }
    })

     .state('login', {
        url: "/login",
          templateUrl: "templates/login.html",
          controller : "loginController"        
      })    
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/postagens');
 $urlRouterProvider.otherwise('/login');
})