(function() {
  'use strict';
  
  vertxFeedsApp
    .component('subscriptionPage', SubscriptionPage());


  function SubscriptionPage() {
    return {
      templateUrl: 'scripts/subscriptionPage/subscriptionPage.html',
      bindings: {
      },
      controller: [
        'FeedService',
        '$http',
        SubscriptionPageCtrl
      ],
      controllerAs: 'subscriptionPage',
    };
  }

  function SubscriptionPageCtrl(FeedService, $http) {

    var vm = this;
    vm.fetchFeeds = fetchFeeds;
    vm.addSubscription = addSubscription;
    vm.unsubscribe = unsubscribe;
    vm.cancelPending = cancelPending;
    vm.savePending = savePending;
    vm.subscriptions = [];

    vm.$onInit = function () {
      fetchFeeds();
    }

    ////////////////////////////////////////////////////////////
    function fetchFeeds () {
      FeedService.subscriptionList()
        .then(function(data){
          vm.subscriptions = data.data;
        });
	  };

	  function addSubscription () {
      vm.pendingSubscription = {
        url:'', //http://your.feed.here
        color:'#000000'
      };
	  };

	  function cancelPending () {
		  vm.pendingSubscription = null;
	  };
	  
    function savePending (subscription) {
      FeedService.subscribe(subscription.url, subscription.color)
        .then(function(data){
          fetchFeeds();
          vm.pendingSubscription = null;
        });
	  };
    
	  function unsubscribe (feed) {
      FeedService.unsubscribe(feed.hash)
        .then(function() {
          fetchFeeds();
        })
        .catch(function() {
          console.error(error);
        })
    };
	
  }
}());
