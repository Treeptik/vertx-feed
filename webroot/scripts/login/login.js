(function() {
  'use strict';
  
  vertxFeedsApp
    .component('login', Login());


  function Login() {
    return {
      templateUrl: 'scripts/login/login.html',
      bindings: {
      },
      controller: [
        '$scope',
        'UserService',
        LoginCtrl
      ],
      controllerAs: 'login',
    };
  }

  function LoginCtrl($scope, UserService) {

    var vm = this;
    vm.logout = logout;

    vm.$onInit = function () {
      vm.token = UserService.getToken();
    }

    $scope.$on('login', function(e, data){
      vm.token = data;
    });
    
    ////////////////////////////////////////////////////
    
    function logout() {
      UserService.logout()
        .then(function() {
        vm.token = null;
      });
    }

  }
}());
