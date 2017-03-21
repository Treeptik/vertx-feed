(function() {
  'use strict';

  vertxFeedsApp
    .component('homePage', HomePage());

  function HomePage() {
    return {
      templateUrl: 'scripts/homePage/homePage.html',
      bindings: {
      },
      controller: [
        HomePageCtrl
      ],
      controllerAs: 'homePage',
    };
  }

  function HomePageCtrl() {

    var vm = this;
   
  }
}());
