app.config(function ($routeProvider) {
    $routeProvider.
      when('/', {
          title: 'Login',
          templateUrl: 'Example26_Elogin.html?v=1.0',
          controller: 'EmployeeLoginCtrl'
      }).
    when('/List', {
        title: 'Home',
        templateUrl: 'Example26_EList.html?v=1.0',
        controller: 'EmployeeListCtrl',
        resolve: { init: function () { checkLogin();} }

    }).
    when('/Add', {
        title: 'Home',
        templateUrl: 'Example26_EAdd.html?v=1.0',
        controller: 'EmployeeDetailCtrl',
        resolve: { load: function () { checkLogin(); } }

    }).
   
      when('/:empId', {
          title: 'Employee Detail',
          templateUrl: 'Example26_EDetail.html?v=1.0',
          controller: 'EmployeeDetailCtrl',
          resolve: { load: function () { checkLogin(); } }
      }).
    when('/Edit/:empId', {
        title: 'Employee Edit',
        templateUrl: 'Example26_EEdit.html?v=1.0',
        controller: 'EmployeeDetailCtrl',
        resolve: { load: function () { checkLogin(); } }
    }).
      otherwise({
          redirectTo: '/'
      });   
});

app.run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
