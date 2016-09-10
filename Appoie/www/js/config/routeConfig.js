app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MapCtrl'
  })

  .state('app.mapa', {
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mapa');
})