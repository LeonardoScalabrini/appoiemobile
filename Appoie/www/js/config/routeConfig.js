app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MapCtrl'
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

    .state('app.sobre', {
      url: '/sobre',
      views: {
        'menuContent': {
          templateUrl: 'templates/sobre.html'
        }
      }
    })

    .state('app.postar', {
      url: '/postar',
      views: {
        'menuContent': {
          templateUrl: 'templates/postar.html'
        }
      }
    })

    .state('app.postagens', {
      cache: false,
      url: '/postagens',
      views: {
        'menuContent': {
          templateUrl: 'templates/postagens.html',
          controller: 'visualizacaoController'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/postagens');
})