(function() {
  'use strict';
  
  vertxFeedsApp
    .component('feedPage', FeedPage());


  function FeedPage() {
    return {
      templateUrl: 'scripts/feedPage/feedPage.html',
      bindings: {
      },
      controller: [
        'FeedService',
        FeedPageCtrl
      ],
      controllerAs: 'feedPage',
    };
  }

  function FeedPageCtrl(FeedService) {

    var vm = this;
    vm.entries = [];

    vm.$onInit = function () {
      fetchFeeds();
    }

    ///////////////////////////////////////////////////

  function addFeedEntries (entries, subscription) {
    vm.entries = vm.entries.concat(entries.map(function(entry) {
      entry.feed = subscription;
      return entry;
    }));
		console.log("Nb entries : " + vm.entries.length);
	};

	function connectToEventBus () {
		var eb = new vertx.EventBus("http://localhost:9000/eventbus");
		eb.onopen = function(){
			for (var i = 0; i < vm.subscriptions.length; i++) {
				var subscription = vm.subscriptions[i];
				console.log("register reader for : " + subscription.hash + " on the event bus");
				eb.registerHandler(subscription.hash, function(entries){
					addFeedEntries(entries, subscription);
				});
			}
		};
	};
	
  function getFeedEntries (feed) {
		FeedService.entryList(feed.hash)
      .then(function(entries) {
        addFeedEntries(entries.data, feed);
        connectToEventBus();
      })
	};

	function fetchFeeds () {
		FeedService.subscriptionList()
      .then(function(data){
        data = data.data
        vm.subscriptions = data;
        angular.forEach(vm.subscriptions, function(subscription) {
          getFeedEntries(subscription);
        });
      });
	};

  }
}());
