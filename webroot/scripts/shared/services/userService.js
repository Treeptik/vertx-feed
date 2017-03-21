(function () {
    'use strict';

vertxFeedsApp
.factory ( 'UserService', UserService );

UserService.$inject = [
'$rootScope',
'$resource',
'CONFIG'
];


function UserService ( $rootScope, $resource, CONFIG ) {
    return {
        login: login,
        logout: logout,
        register: register,
        getToken: getToken
    };


    ///////////////////////////////////////////////////////

    function login ( username, password ) {
        var data = {
            username: username,
            password: password
        }

        var login = $resource (CONFIG.BASE_URL + '/api/login',
        data,
        { 'post': { 
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformResponse: function ( data, headers ) {
                localStorage.setItem('user', data);
                var response = {};
                response.data = JSON.parse(data);
                response.headers = headers ();
                $rootScope.$broadcast('login', response.data.accessToken);
                return response;
            } }
        });
        return login.post ().$promise;
    }

    function logout ( ) {

        return $resource(CONFIG.BASE_URL + '/api/logout?accessToken='+getToken()).save(
            {}
        ).$promise
        .then(function() {
            localStorage.removeItem('user');
        });
    }

    function register ( username, password ) {
        var data = {
            username: username,
            password: password
        }

        var register = $resource (CONFIG.BASE_URL + '/api/register',
        data,
        { 'post': { 
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformResponse: function ( data, headers ) {
                var response = {};
                response.data = JSON.parse(data);
                response.headers = headers ();
                return response;
            } }
        });
        return register.post().$promise;
    }

    function getToken() {
        var token = JSON.parse(localStorage.getItem('user'));
        if(token) {
            return token.accessToken
        }
        return null;
    }

}
}) ();