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
      cache: false,
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