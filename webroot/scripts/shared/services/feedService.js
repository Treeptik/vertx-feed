(function () {
    'use strict';

vertxFeedsApp
.factory ( 'FeedService', FeedService );

FeedService.$inject = [
'$resource',
'CONFIG',
'UserService'
];


function FeedService ( $resource, CONFIG, UserService ) {
    return {
        subscriptionList: subscriptionList,
        unsubscribe: unsubscribe,
        subscribe: subscribe,

        entryList: entryList
    };


    ///////////////////////////////////////////////////////

    function subscriptionList () {
        // var list = $resource('http://localhost:9000/api/feeds?accessToken='+UserService.getToken())
        // return list.query().$promise;
        var subscribe = $resource (CONFIG.BASE_URL + '/api/feeds?accessToken='+UserService.getToken(),
        {},
        { 'query': { 
            method: 'GET',
            isArray: false,
            transformResponse: function ( data, headers ) {
                var response = {};
                response.data = JSON.parse(data);
                response.headers = headers ();
                return response;
            } }
        });
        return subscribe.query().$promise;
    }

    function unsubscribe ( hash ) {
        return $resource(CONFIG.BASE_URL + '/api/feeds/'+hash+'?accessToken='+UserService.getToken())
            .delete()
            .$promise;
    }

    function subscribe ( url, color ) {
        var data = {
            url: url,
            color: color
        }
        return $resource(CONFIG.BASE_URL + '/api/feeds?accessToken='+UserService.getToken()).save(
            JSON.stringify ( data )
        ).$promise;
    }

    function entryList (hash) {
        // var list = $resource('http://localhost:9000/api/feeds?accessToken='+UserService.getToken())
        // return list.query().$promise;
        var entry = $resource (CONFIG.BASE_URL + '/api/feeds/'+hash+'/entries?accessToken='+UserService.getToken(),
        {},
        { 'query': { 
            method: 'GET',
            isArray: false,
            transformResponse: function ( data, headers ) {
                var response = {};
                response.data = JSON.parse(data);
                response.headers = headers ();
                return response;
            } }
        });
        return entry.query().$promise;
    }

}
}) ();