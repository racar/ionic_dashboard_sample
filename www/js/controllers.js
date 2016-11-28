angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
  .controller('PresupuestoCtrl', function($scope,$http){

    $http.get('https://api.spark.io/devices/DEVICEID/VARIABLE?access_token=ACCESSTOKEN').then(function(resp){
      console.log('Success', resp); // JSON object
    }, function(err){
      console.error('ERR', err);
    })

  })
  .controller('ContabilidadCtrl',function ($scope){})
  .controller('TesoreriaCtrl',function ($scope){})
  .controller('AdquisicionesCtrl',function ($scope) {})
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


