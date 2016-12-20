app.controller('appConfigCtrl', function($scope, $window, dataFactory) {

  $scope.getData = function(){
    dataFactory.getAppConfig().then(function(response) {
      if(response.data && response.data.config){
        $scope.selectedNewApp = null;
        $scope.newAppConfig = {};
        $scope.appList = objectList(response.data.config);
        $scope.config = response.data.config;
        console.log("CONFIG", $scope.config);
      } else {
        console.log("No config data!");
      }

      if(response.data && response.data.schedules){
        $scope.schedules = response.data.schedules;
        console.log($scope.schedules);
      } else {
        console.log("No schedule data!");
      }
    }, function(err) {
      console.log(err.data);
    });
  };
  $scope.getData();

  $scope.saveAppConfig = function(status){
    if(status === 'new') {
      // Add new app config object to existing config
      Object.keys($scope.newAppConfig).forEach(function(key) { $scope.config[key] = $scope.newAppConfig[key]; });
    }

    dataFactory.saveAppConfig($scope.config).then(function() {
      $scope.getData();
      }, function(err) {
      console.log(err.data);
    });
  };

  $scope.getTypeof = function(obj){
    var type = typeof obj;
    if (type === 'object'){
      if(Array.isArray(obj)) type = 'array';
    }
    return type;
  };

  $scope.removeArrItem = function(app, key, option){
    var index = $scope.config[app][key].indexOf(option);
    if (index > -1) {
      $scope.config[app][key].splice(index, 1);
    } else {
      console.log("Error removing option " + option);
    }
  };

  $scope.addArrItem = function(app, key, option){
    $scope.config[app][key].push(option);
  };

});

function objectList(o){
  var newApp = [],
    existingApp = [];

  Object.keys(o).forEach(function(key) {
    if(o[key] !== null && typeof o[key] === 'object'){
      var empty = isEmptyObject(o[key]);
      if(empty){
        newApp.push(key);
      } else {
        existingApp.push(key);
      }
    }
  });

  return { newApp: newApp, existingApp: existingApp };
}

function isEmptyObject(o) {
  return Object.keys(o).every(function(x) { return !o[x]; });
}
