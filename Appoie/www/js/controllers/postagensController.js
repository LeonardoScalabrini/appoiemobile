app.controller('postagensController', function($scope, $ionicPopup, $rootScope, mapService, $cordovaGeolocation, $state) {

	var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};
  $scope.icones = [];


    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        var mapOptions = {
          center: posicaoAtual,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var mapPostagens = new google.maps.Map(document.getElementById("mapPostagens"), mapOptions);  


        var bluedot = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#6495ED',
          fillOpacity: 5,
          scale: 8,
          strokeColor: '#fff',
          strokeWeight: 1.5
        }
  
        var myloc = new google.maps.Marker({
          clickable: false,
          icon: bluedot,
          shadow: null,
          zIndex: 999,
          map: mapPostagens
        });

        ;

        setInterval(function() { 
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
          var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          myloc.setPosition(latLng);
        }, function(error) {
          // ...
        });
          {
           enableHighAccuracy: true
          }
        }, 5000);


        if ($scope.icones.length == 0)
        {
          mapService.getIcons().then(function (response) {

            $scope.icones = response.data;
            console.log($scope.icones);

            mapService.getMarkers().then(function (response) {
            
              $scope.marcadores = response.data;
              $scope.initMarkers();
                    
            }, function (response) {

          
            });

          }, function (response) {

          });

        }


        $scope.initMarkers = function()
        {
          var marcador;

          for (var i = 0; i < $scope.marcadores.length; i++) {
          
            (function(i){
                setTimeout(function(){

                marcador = {};
                marcador = $scope.marcadores[i];
                $scope.setMarkers(marcador);

              }, 250 * i)
             })(i);
          }

        }

        $scope.setMarkers= function(marcador)
        {
          var icone = new Image();

          for (var i = 0; i < $scope.icones.length; i++)
          {
            if($scope.icones[i].categoria == marcador.categoria)
              icone.src = $scope.icones[i].foto;
          }   

          if (icone.src == "") return;
        
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(marcador.lat, marcador.lng),
            map: $scope.map,
            icon: icone.src,
            animation: google.maps.Animation.DROP,
            draggable: false
          });

          mapService.getPostMin(marcador.idPublicacao).then(function(response) {
                  
            $scope.postMin = response.data;
            idPublicacao = $scope.postMin.idPublicacao;
            console.log($scope.postMin);

            var infowindow = new google.maps.InfoWindow({
              content: '<md-card id="iw-container" ng-controller="mapController">'

                        + '<div class="iw-title">'+ $scope.postMin.titulo +'</div>'

                        + '<div class="iw-content">'
                        +   '<img class="img-publicacao" src="'+ $scope.postMin.foto +'" alt="">'
                        +   '</div>'

                        + '<div class="iw-footer">'
                        +   '<div layout="row">'

                        +     '<div flex class="apoiar">'

                        +       '<img src="/img/logo-apoiar.png">'
                        +       '<p>Apoiar</p>'
                    
                        +     '</div>'

                        +     '<div flex class="qtdApoiadores">'
                        +       '<p>'+ $scope.postMin.qtdApoiadores +' Apoiadores</p>'
                        +     '</div>'

                        +   '</div>'
                        +   '</div>'

                        + '<div class="iw-btn-modal">'
                        +   '<div layout="row">'

                        +     '<div flex class="show-modal">'
                        +       '<md-button class="md-button md-raised md-primary">VER MAIS</md-button>'
                        +     '</div>'

                        +   '</div>'
                        +   '</div>'
                        +'</md-card>'            

            });
                
            marker.addListener('click', function() {
              infowindow.open($scope.map, marker);
            });

            google.maps.event.addListener(infowindow, 'domready', function() {

              var iwOuter = $('.gm-style-iw');
              var iwBackground = iwOuter.prev();

              // Remover o div da sombra do fundo
              iwBackground.children(':nth-child(2)').css({'display' : 'none'});

              // Remover o div de fundo branco
              iwBackground.children(':nth-child(4)').css({'display' : 'none'});
              iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px'});

              var iwCloseBtn = iwOuter.next();
              var indicador = iwOuter.prev();

              indicador.css({
                zIndex: 1
              })

              // Aplica o efeito desejado ao botão fechar
              iwCloseBtn.css({
                opacity: '1', // por padrão o botão fechar tem uma opacidade de 0.7
                right: '28px', 
                top: '8px', // reposicionamento do botão
                border: '1px solid #48b5e9', // aumento da borda do botão e nova cor
                'border-radius': '13px', // efeito circular
                'box-shadow': '0 0 5px #3990B9' // efeito 3D para salientar o botão
              });

              // A API aplica automaticamente 0.7 de opacidade ao botão após o evento mouseout.
              // Esta função reverte esse evento para o valor desejado.
              iwCloseBtn.mouseout(function(){
                $(this).css({opacity: '1'});
              });

              var btnApoiar = iwOuter.find('.apoiar > p');
              var imgApoiar = iwOuter.find('.apoiar > img');

              btnApoiar.on('click', function(event) {

                event.preventDefault();

                if (!$(this).hasClass('apoiado'))
                {
                  // mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

                  // }, function (response) {

                  // });
                }
                else
                {
                  // mapService.apoiar($scope.postMin.idPublicacao).then(function (response) {

                  // }, function (response) {

                  // });
                }
                  

              });

            });

          }, function(response) {

          });      
          
        }
         
    });

});