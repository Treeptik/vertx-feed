(function() {
  'use strict';
  
  vertxFeedsApp
    .component('registerPage', RegisterPage());


  function RegisterPage() {
    return {
      templateUrl: 'scripts/registerPage/registerPage.html',
      bindings: {
      },
      controller: [
        '$state',
        'UserService',
        RegisterPageCtrl
      ],
      controllerAs: 'registerPage',
    };
  }

  function RegisterPageCtrl($state, UserService) {

    var vm = this;
    vm.password = '';
    vm.username = '';

    vm.register = register;

    function register (username, password) {
      UserService.register(username, password)
        .then(function(data) {
          $state.go('login')
        })
    }
  }
}());
