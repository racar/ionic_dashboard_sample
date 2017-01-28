angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('PresupuestoCtrl', function($scope,$http){
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
//Fin selector año
//

$http.get("http://201.149.19.142:8081/ApiArco/api/Empresa").success(function(resp){
  console.log('Success', resp); // JSON object
 $scope.empresas = resp;

}).error(function(err,status){
  console.error('ERR', err);
});



    $scope.changeEmpresa = function(){
      var total_devengado = 0,total_ejercido = 0,total_pagado = 0;
      $http.get("http://201.149.19.142:8081/ApiArco/api/Area?param={EmpresaId:"+$scope.empresa+"}").success(function(resp){
        console.log('Success', resp); // JSON object
       $scope.areas = resp;

      }).error(function(err,status){
        console.error('ERR', err);
      });

    }


    $scope.meses = [
      { "MesId":1,"MesNombre":"Enero"},
      { "MesId":2,"MesNombre":"Febrero"},
      { "MesId":3,"MesNombre":"Marzo"},
      { "MesId":4,"MesNombre":"Abril"},
      { "MesId":5,"MesNombre":"Mayo"},
      { "MesId":6,"MesNombre":"Junio"},
      { "MesId":7,"MesNombre":"Julio"},
      { "MesId":8,"MesNombre":"Agosto"},
      { "MesId":9,"MesNombre":"Septiembre"},
      { "MesId":10,"MesNombre":"Octubre"},
      { "MesId":11,"MesNombre":"Noviembre"},
      { "MesId":12,"MesNombre":"Diciembre"}
    ]

    $http.get("http://201.149.19.142:8081/ApiArco/api/Capitulo").success(function(resp){
      console.log('Success', resp); // JSON object
     $scope.capitulos = resp;

    }).error(function(err,status){
      console.error('ERR', err);
    });

    $scope.changeCapitulo = function(){

      $http.get("http://201.149.19.142:8081/ApiArco/api/Concepto?param={CapituloId:"+$scope.capituloid+"}").success(function(resp){
        console.log('Success', resp); // JSON object
       $scope.conceptos = resp;

      }).error(function(err,status){
        console.error('ERR', err);
      });

    }

    $scope.changeConcepto = function(){

      $http.get("http://201.149.19.142:8081/ApiArco/api/Partida?param={ConceptoId:"+$scope.conceptoid+"}").success(function(resp){
        console.log('Success', resp); // JSON object
       $scope.partidas = resp;

      }).error(function(err,status){
        console.error('ERR', err);
      });

    }

    $scope.ordenes = [
      {"OrdenId":"Autorizado","OrdenNombre":"Autorizado"},
      {"OrdenId":"Modificado","OrdenNombre":"Modificado"},
      {"OrdenId":"PorEjercer","OrdenNombre":"PorEjercer"},
      {"OrdenId":"Comprometido","OrdenNombre":"Comprometido"},
      {"OrdenId":"Devengado","OrdenNombre":"Devengado"},
      {"OrdenId":"Ejercido","OrdenNombre":"Ejercido"},
      {"OrdenId":"Pagado","OrdenNombre":"Pagado"}
    ]

    $scope.consultar = function () {
      var total_autorizado = 0,total_modificado = 0,total_porejercer =0,
      total_comprometido = 0,total_devengado = 0,total_ejercido = 0,
      total_pagado = 0;

//http://201.149.19.142:8081/ApiArco/api/Presupuesto?param={EmpresaId:1,EjercicioFiscalAnio:2016,MesInicio:1,MesFin:12,AreaId:1,CapituloId:0,ConceptoId:0,PartidaId:0,Numero:0,Orden:0}
//http://201.149.19.142:8081/ApiArco/api/Presupuesto?param={"EmpresaId":1,"EjercicioFiscalAnio":2016,"MesInicio":1,"MesFin":12,"AreaId":1001,"CapituloId":0,"ConceptoId":0,"PartidaId":0,"Numero":"1","Orden":"Ejercido"}
      $http.get("http://201.149.19.142:8081/ApiArco/api/Presupuesto?param={EmpresaId:"+$scope.empresa+",EjercicioFiscalAnio:"+$scope.current+",MesInicio:"+$scope.mesinicio+",MesFin:"+$scope.mesfin+",AreaId:"+$scope.areaid+",CapituloId:"+$scope.capituloid+",ConceptoId:"+$scope.conceptoid+",PartidaId:"+$scope.partidaid+",Numero:"+$scope.numero+",Orden:'"+$scope.orden+"'}").success(function(resp){
        console.log('Success', resp); // JSON object

          for(var i=0; i<resp.length; i++){
            var obj = resp[i];
             total_autorizado += obj['Autorizado'];
             total_modificado += obj['Modificado'];
             total_porejercer += obj['PorEjercer'];
             total_comprometido += obj['Comprometido'];
             total_devengado += obj['Devengado'];
             total_ejercido += obj['Ejercido'];
             total_pagado += obj['Pagado'];


          }

        $scope.labels = ['Presupuesto']; //['1','2','3','4','5'];

        $scope.series = [['Autorizado'],['Modificado'],['Por Ejercer'],['Comprometido'],['Devengado'],['Ejercido'],['Pagado']];

        $scope.data = [
          //['5','5','5','5','5'],['7','7','7','7','7'],['8','8','8','8','8']
          [total_autorizado],[total_modificado],[total_porejercer],[total_comprometido],[total_devengado],[total_ejercido],[total_pagado]
        ];

        $scope.ColorBar = ['#009933', '#FF6600','#990000'];

        $scope.options = {
          legend: { display: true,labels:{fontSize:7}

                  },
          responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
          scales: {
              yAxes: [
                  {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'left'
                  }],
              xAxes: [
                   {

                          display: false
                    }]
          }
      }

        $scope.rowCollection = resp;

      }).error(function(err,status){
        console.error('ERR', err);
      });

    }



// **********************************************************************
//  ***************************CONTABILIDAD******************************
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
      $scope.ColorBar = ['#009933', '#FF6600','#990000'];

      $scope.labels = ['Pólizas'];

      $scope.series = [['Asentadas'],['Canceladas'],['Registradas']];

      $scope.data = [[total_polizas_asentadas],[total_polizas_canceladas],[total_polizas_registradas]];

      $scope.tipoPoliza = ['Todas','Diario','Ingreso','Egreso'];

      $scope.rowCollection = resp;

      $scope.selectedName = 'Todas'

      $scope.selectedOrigen = 'Todas'

      $scope.options = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }],
            xAxes: [
                 {

                        display: false
                  }]
        }
    }




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
      $scope.data = [polizas_asentadas,polizas_canceladas,polizas_registradas];


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
        $scope.labels = ['Pólizas'];

        $scope.series = [['Asentadas'],['Canceladas'],['Registradas']];

        $scope.data = [[total_polizas_asentadas],[total_polizas_canceladas],[total_polizas_registradas]];

        $scope.tipoPoliza = ['Todas','Diario','Ingreso','Egreso'];

        $scope.tipoOrigen = ['Todas','Automática','Manual'];

        $scope.rowCollection = resp;

        $scope.selectedName = 'Todas'

        $scope.selectedOrigen = 'Todas'

        $http.get("http://201.149.19.142:8081/ApiArco/api/Empresa").success(function(resp){
          console.log('Success', resp); // JSON object
         $scope.empresas = resp;

        }).error(function(err,status){
          console.error('ERR', err);
        });




      }).error(function(err,status){
        console.error('ERR', err);
      });


   })
//*************************************************************************
//***************************** TESORERIA***********************************
.controller('TesoreriaCtrl',function ($scope,$http){
  $scope.consultar = function () {
    var total_importe_max = 0,total_importe_min = 0,total_importe = 0;
    var importe_max = [], importe_min = [], importe = [];
    var etiquetas = [];

    $http.get("http://201.149.19.142:8081/ApiArco/api/Proveedor?param={EmpresaId:"+$scope.empresa+"}").success(function(resp){
      console.log('Success', resp); // JSON object

        for(var i=0; i<resp.length; i++){
          var obj = resp[i];
           total_importe_max += obj['ImporteMaximo'];
           total_importe_min += obj['ImporteMinimo'];
           total_importe += obj['Importe'];
           //data_arreglo[i] = [obj['ImporteMaximo'],obj['ImporteMinimo'],obj['Importe']]
           importe_max[i] = obj['ImporteMaximo'];
           importe_min[i] = obj['ImporteMinimo'];
           importe[i] = obj['Importe'];

           etiquetas[i] = obj['nombre']

        }

      $scope.labels = etiquetas; //['1','2','3','4','5'];

      $scope.series = ['Importe Máximo','Importe Mínimo','Importe'];

      $scope.data = [
        //['5','5','5','5','5'],['7','7','7','7','7'],['8','8','8','8','8']
        importe_max,importe_min,importe
      ];

      $scope.ColorBar = ['#009933', '#FF6600','#990000'];

      $scope.options = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }],
            xAxes: [
                 {

                        display: false
                  }]
        }
    }

      $scope.rowCollection = resp;

    }).error(function(err,status){
      console.error('ERR', err);
    });

  }

  $http.get("http://201.149.19.142:8081/ApiArco/api/Empresa").success(function(resp){
    console.log('Success', resp); // JSON object
   $scope.empresas = resp;

  }).error(function(err,status){
    console.error('ERR', err);
  });





})
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
         $scope.series = [['Devengado'],['Ejercido'],['Pagado']];

         $scope.labels = ['Ordenes'];

         $scope.data = [[total_devengado],[total_ejercido],[total_pagado]];

         $scope.rowCollection = resp;

       }).error(function(err,status){
         console.error('ERR', err);
       });

     }

     $http.get("http://201.149.19.142:8081/ApiArco/api/Empresa").success(function(resp){
       console.log('Success', resp); // JSON object
      $scope.empresas = resp;

     }).error(function(err,status){
       console.error('ERR', err);
     });


     $scope.options = {
       legend: { display: true },
       responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
       scales: {
           yAxes: [
               {
                   id: 'y-axis-1',
                   type: 'linear',
                   display: true,
                   position: 'left'
               }],
           xAxes: [
                {

                       display: false
                 }]
       }
   }

     $scope.changeEmpresa = function(){
       var total_devengado = 0,total_ejercido = 0,total_pagado = 0;
       $http.get("http://201.149.19.142:8081/ApiArco/api/Area?param={EmpresaId:"+$scope.empresa+"}").success(function(resp){
         console.log('Success', resp); // JSON object
        $scope.areas = resp;

       }).error(function(err,status){
         console.error('ERR', err);
       });

     }


})
//***************************************************************************
//*****************************RECURSOS HUMANOS*****************************

.controller('RecursosCtrl',function ($scope,$http) {
  $scope.consultar = function () {
    var total_autorizadas = 0,total_ocupadas = 0,total_disponibles = 0;
    $http.get("http://201.149.19.142:8081/ApiArco/api/Nomina?param={EmpresaId:"+$scope.empresa+",AreaId:"+$scope.area+"}").success(function(resp){
      console.log('Success', resp); // JSON object
        rta = resp
        for(var i=0; i<resp.length; i++){
          var obj = resp[i];
           total_autorizadas += obj['PosicionesAutorizadas'];
           total_ocupadas += obj['PosicionesOcupadas'];
           total_disponibles += obj['PosicionesDisponibles'];


        }
      $scope.labels = ['Posiciones'];

      $scope.series = [['Autorizadas'],['Ocupadas'],['Disponibles']];

      $scope.data = [[total_autorizadas],[total_ocupadas],[total_disponibles]];

      $scope.colorbar = ['#6699ff', '#66cc33', '#990033'];

      $scope.rowCollection = resp;

    }).error(function(err,status){
      console.error('ERR', err);
    });

  }

  $http.get("http://201.149.19.142:8081/ApiArco/api/Empresa").success(function(resp){
    console.log('Success', resp); // JSON object
   $scope.empresas = resp;

  }).error(function(err,status){
    console.error('ERR', err);
  });


  $scope.options = {
    legend: { display: true },
    responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
    scales: {
        yAxes: [
            {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
            }],
        xAxes: [
             {

                    display: false
              }]
    }
}

  $scope.changeEmpresa = function(){
    var total_devengado = 0,total_ejercido = 0,total_pagado = 0;
    $http.get("http://201.149.19.142:8081/ApiArco/api/Area?param={EmpresaId:"+$scope.empresa+"}").success(function(resp){
      console.log('Success', resp); // JSON object
     $scope.areas = resp;

    }).error(function(err,status){
      console.error('ERR', err);
    });

  }

})
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
