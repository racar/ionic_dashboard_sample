angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('PresupuestoCtrl', function($scope,$http){
    alert('Iniciando llamada...');
  })
.controller('ContabilidadCtrl',function($scope,$http){

// Selector de año
  var date = new Date();
  $scope.current = date.getFullYear();
  var start = $scope.current - 10;  // Minus 10 years from current year
  var end = $scope.current + 10;  // Plus 10 years to current year
  $scope.yearArray = [];

  for(var i=start;i<=end;i++)
  {
     	$scope.yearArray.push(i);
  }

  $scope.changeInYear = function () {
      date.setFullYear($scope.current);
      $scope.budgetYear = date;
  }

  $scope.consultar = function () {
    //pendiente refactorizar
    total_polizas_asentadas = 0;
    total_polizas_canceladas = 0;
    total_polizas_registradas = 0;
    empresa = $scope.empresa
    $http.get("http://201.149.19.142:8081/ApiArco/api/ContabilidadTipoOrigen?param={EmpresaId:"+$scope.empresa+",EjercicioFiscalAnio:"+$scope.current+"}").success(function(resp){
      console.log('Success', resp); // JSON object
        rta = resp
        for(var i=0; i<resp.length; i++){
          var obj = resp[i];
           total_polizas_asentadas += obj['Asentadas'];
           total_polizas_registradas += obj['Registradas'];
           total_polizas_canceladas += obj['Canceladas'];


        }
      $scope.labels = ['Asentadas','Canceladas','Registradas'];

      $scope.series = ['Pólizas'];

      $scope.data = [[total_polizas_asentadas,total_polizas_registradas,total_polizas_canceladas]];

      $scope.tipoPoliza = ['Todas','Diario','Ingreso','Egreso'];

      $scope.rowCollection = resp;

      $scope.selectedName = 'Todas'

      $scope.selectedOrigen = 'Todas'




    }).error(function(err,status){
      console.error('ERR', err);
    });




  }

// Fin selector de año

$scope.updateG1 = function(poliza,origen){
    var polizas_asentadas = 0, polizas_registradas = 0, polizas_canceladas = 0;
      for(var i=0; i<rta.length; i++){
        var obj = rta[i];
        if(poliza == 'Todas' && origen == 'Todas'){
          polizas_asentadas = total_polizas_asentadas;
          polizas_registradas = total_polizas_registradas;
          polizas_canceladas = total_polizas_canceladas;
        }else if(obj['TipoPoliza'] == poliza && origen == 'Todas'){
         polizas_asentadas += obj['Asentadas'];
         polizas_registradas += obj['Registradas'];
         polizas_canceladas += obj['Canceladas'];
       }else if(obj['Origen'] == origen && poliza == 'Todas'){
         polizas_asentadas += obj['Asentadas'];
         polizas_registradas += obj['Registradas'];
         polizas_canceladas += obj['Canceladas'];
       }else if(obj['Origen'] == origen && obj['TipoPoliza'] == poliza){
         polizas_asentadas += obj['Asentadas'];
         polizas_registradas += obj['Registradas'];
         polizas_canceladas += obj['Canceladas'];
       }
      }
      $scope.data = [[polizas_asentadas,polizas_registradas,polizas_canceladas]];


}
   var total_polizas_asentadas = 0,total_polizas_canceladas = 0,total_polizas_registradas = 0;
   var empresa = $scope.empresa
   var rta
      $http.get("http://201.149.19.142:8081/ApiArco/api/ContabilidadTipoOrigen?param={EmpresaId:"+$scope.empresa+",EjercicioFiscalAnio:"+$scope.current+"}").success(function(resp){
        //console.log('Success', resp); // JSON object
          rta = resp
          for(var i=0; i<resp.length; i++){
            var obj = resp[i];
             total_polizas_asentadas += obj['Asentadas'];
             total_polizas_registradas += obj['Registradas'];
             total_polizas_canceladas += obj['Canceladas'];


          }
        $scope.labels = ['Asentadas','Canceladas','Registradas'];

        $scope.series = ['Pólizas'];

        $scope.data = [[total_polizas_asentadas,total_polizas_registradas,total_polizas_canceladas]];

        $scope.tipoPoliza = ['Todas','Diario','Ingreso','Egreso'];

        $scope.tipoOrigen = ['Todas','Automática','Manual'];

        $scope.rowCollection = resp;

        $scope.selectedName = 'Todas'

        $scope.selectedOrigen = 'Todas'



      }).error(function(err,status){
        console.error('ERR', err);
      });


   })
.controller('TesoreriaCtrl',function ($scope){})
//***************************************************************************
//*****************************ORDENES DE COMPRA*****************************
.controller('AdquisicionesCtrl',function ($scope,$http) {

     $scope.consultar = function () {
       var total_devengado = 0,total_ejercido = 0,total_pagado = 0;
       $http.get("http://201.149.19.142:8081/ApiArco/api/OrdenCompra?param={EmpresaId:"+$scope.empresa+",AreaId:"+$scope.area+"}").success(function(resp){
         console.log('Success', resp); // JSON object
           rta = resp
           for(var i=0; i<resp.length; i++){
             var obj = resp[i];
              total_devengado += obj['Devengado'];
              total_ejercido += obj['Ejercido'];
              total_pagado += obj['Pagado'];


           }
         $scope.labels = ['Devengado','Ejercido','Pagado'];

         $scope.series = ['Ordenes'];

         $scope.data = [[total_devengado,total_ejercido,total_pagado]];

         $scope.rowCollection = resp;

       }).error(function(err,status){
         console.error('ERR', err);
       });

     }


})
.controller('RecursosCtrl',function ($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
