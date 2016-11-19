app.controller('postagensController', function($scope, $ionicPopup, $rootScope, $ionicLoading, $cordovaGeolocation, $state, $compile, $ionicModal, mapService, $timeout) {
  
  var infoWindowAnterior;
  var tempID;
  var idPublicacao;
  var markerClicked;
	
  var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};

  $scope.icones = [];

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        getAddress(); 
        var mapOptions = {
          center: posicaoAtual,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        $scope.map = new google.maps.Map(document.getElementById("mapPostagens"), mapOptions);

        var bluedot = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#6495ED',
          fillOpacity: 5,
          scale: 8,
          strokeColor: '#fff',
          strokeWeight: 1.5
        }
  
        var localizacaoAtual = new google.maps.Marker({
          clickable: false,
          position: posicaoAtual,
          icon: bluedot,
          shadow: null,
          zIndex: 999,
          map: $scope.map
        });

        function atualizarPosicao(posicao){
          localizacaoAtual.setPosition(posicaoAtual);
        }

        setInterval(function() { 
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
          var posicao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          atualizarPosicao(posicao);
        }, function(error) {
          // ...
        });
          {
            enableHighAccuracy: true
          }
        }, 1);

        if ($scope.icones.length == 0)
        {
          mapService.getIcons().then(function (response) {
            $scope.icones = response.data;

            mapService.getMarkers().then(function (response) {
              $scope.marcadores = response.data;
              $scope.initMarkers();
            }, function (response) {

            });

          }, function (response) {

          });
        }


        $scope.doRefresh = function() {
          initMarkers();
          setMarkers();
        };

    
//-------------------ENDEREÇO ATUAL------------------

  function getAddress(){

           // This is making the Geocode request
           var geocoder = new google.maps.Geocoder();

           geocoder.geocode({ 'latLng': posicaoAtual }, function (results, status) {
           // This is checking to see if the Geoeode Status is OK before proceeding
           if (status == google.maps.GeocoderStatus.OK) {

               enderecoCompleto = results[0].formatted_address;
               $rootScope.cidadeAtual = results[0].address_components[4].long_name;
               $rootScope.estadoAtual = results[0].address_components[5].long_name;

              
           }
          });
        }

// ------------------INICIA OS MARKERS---------------        
        

        $scope.initMarkers = function()
        {
          var marcador;

          for (var i = 0; i < $scope.marcadores.length; i++) {
          
            (function(i){
                setTimeout(function(){

                marcador = {};
                marcador = $scope.marcadores[i];
                $scope.setMarkers(marcador);

              }, 100 * i)
             })(i);
          }

        }

// ------------------SETA OS ICONES DAS CATEGORIA NOS MAPAS---------------        

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

// ------------------CHAMA A INFOWINDOW--------------------        
          
          marker.addListener('click', function(){

            $ionicLoading.show({template: '<ion-spinner icon="android"></ion-spinner>'
                                        + '<h6 id="spinner">Carregando...</h6>'
                              });

            
            $timeout(function(){

              mapService.getPostMax(marcador.idPublicacao).then(function(response) {
                  $ionicLoading.hide();
                  $scope.postMax = response.data;
                  $ionicModal.fromTemplateUrl('modalPublicacao.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                  }).then(function(modal) {
                    $scope.modal = modal;
                  });
                  var htmlInfoWindow = '<div id="InfoWindow">'
                                +   '<div class="iw-title"> {{postMax.titulo}} </div>'

                                +   '<div class="iw-content item-image">'
                                +    '<img class="img-publicacao" ng-src="{{postMax.foto}" alt="">'
                                
                                +   '</div>'

                                +   '<div class="iw-footer">'
                                +    '<div class="row">'

                                +       '<div class="apoiar">'

                                +         '<p>Apoiar</p>'
                            
                                +       '</div>'

                                +       '<div class="qtdApoiadores">'
                                +         '<p> {{postMax.qtdApoiadores}} Apoiadores</p>'
                                +       '</div>'

                                +     '</div>'
                                +   '</div>'


                                +   '<div class="show-modal">'
                                +     '<button class="button button-block button-dark" ng-click="modal.show()"><h5>DETALHES</h5></button>'
                                +   '</div>'
                                +'</div>'            

                  var compilado = $compile(htmlInfoWindow)($scope)

                  var infowindow = new google.maps.InfoWindow({ 
                      content: compilado[0]
                  }); 

                  google.maps.event.addListener(infowindow, 'domready', function() {

            var iwOuter = $('.gm-style-iw');
            var iwBackground = iwOuter.prev();

            iwBackground.children(':nth-child(2)').css({'display' : 'none'});
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});
            iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px'});

          var iwCloseBtn = iwOuter.next();
          var indicador = iwOuter.prev();

          indicador.css({
            zIndex: 1
          })

          iwCloseBtn.css({
            opacity: '1',
            right: '28px', 
            top: '8px',
            border: '1px solid #c2c2c2',
            'border-radius': '13px',
            'box-shadow': '0 0 5px #c2c2c2'
          });

          iwCloseBtn.mouseout(function(){
            $(this).css({opacity: '1'});
          });

          var btnApoiar = iwOuter.find('.apoiar > p');


          if($scope.postMax.apoiado) {
            
            btnApoiar.addClass('apoiado');
            btnApoiar.html('Apoiado');
          }
          else {
            btnApoiar.removeClass('apoiado');
            btnApoiar.html('Apoiar');
          }

          btnApoiar.on('click', function(event) {

            event.preventDefault();

            if (!btnApoiar.hasClass('apoiado'))
            {
                  mapService.apoiar($scope.postMax.idPublicacao).then(function (response) {

                btnApoiar.addClass('apoiado');
                btnApoiar.html('Apoiado')
                //$(this).html('Apoiado');


                $scope.postMax.qtdApoiadores++;

               }, function (response) {

               });
            }
            else
            {
                 mapService.apoiar($scope.postMax.idPublicacao).then(function (response) {

                btnApoiar.removeClass('apoiado');
                btnApoiar.html('Apoiar')
                //$(this).html('Apoiado');


                                 $scope.postMax.qtdApoiadores--;

               }, function (response) {

               });


            } 

          });

        });

// ------------------FUNÇÃO RESPONSÁVEL POR FECHAR UMA INFOWINDOW AO CLICAR SOBRE OUTRO MARKER---------------        

                  if(infoWindowAnterior != null) {
                      if(infoWindowAnterior == infowindow) {
                        if(isInfoWindowOpen(infowindow)) { 
                          infoWindowAnterior = infowindow;
                          infowindow.close(); 
                        }
                        else{
                          infowindow.open($rootScope.map, marker);
                          infowindowAnterior = infowindow;
                        }
                      }
                      else {
                        infoWindowAnterior.close();
                        infoWindowAnterior = infowindow;
                        infowindow.open($rootScope.map, marker);    
                      }           
                  }   
                  else {
                    infoWindowAnterior = infowindow;
                    infowindow.open($rootScope.map, marker);
                  }  

              }, function(response){}); 

            });


          }, function(response) {

          });      
          
        }
         
    }, function(error){
      $state.go('app.connectionException');
  });

    isInfoWindowOpen = function(infoWindow){
      var map = infoWindow.getMap();
      return (map !== null && typeof map !== "undefined");
    }


});