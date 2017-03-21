(function() {
  'use strict';
  
  vertxFeedsApp
    .component('loginPage', LoginPage());


  function LoginPage() {
    return {
      templateUrl: 'scripts/loginPage/loginPage.html',
      bindings: {
      },
      controller: [
        '$state',
        'UserService',
        LoginPageCtrl
      ],
      controllerAs: 'loginPage',
    };
  }

  function LoginPageCtrl($state, UserService) {

    var vm = this;
    
    vm.login = login;

    function login (username, password) {
      UserService.login(username, password)
        .then(function(data) {
          $state.go('home')
        })
    }
  }
}());
