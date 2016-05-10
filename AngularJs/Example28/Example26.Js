var app = angular.module('myApp', ['ui.bootstrap','angularUtils.directives.dirPagination', 'ngResource','ngRoute']);

var employee = function () {
     empId = '';
     name = '';
     Salary = '';
     DOJ = '';
     gender = '';
     Role = '';

}

function getMax(array, propName) {
    var max = 0;
    var maxItem = null;
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item[propName] > max) {
            max = item[propName];
            maxItem = item;
        }
    }

    return maxItem;
}

app.controller('EmployeeDetailCtrl', function ($scope, $routeParams) {
     $scope.empId =  $routeParams.empId;
     $scope.name = '';
     $scope.Salary = 0.0;
     $scope.DOJ;
     $scope.gender = '';
     $scope.Role = '';

     $scope.employees = employeesData;
     $scope.RoleList = RoleData;

     
    $scope.employee = $scope.employees.filter(function (entry) {
        return entry.empId == $scope.empId;
    })[0];


    $scope.RepositoryDataValue = RepositoryData;

    $scope.RepositoryDatafunction = function (Key) {
        var Value = $scope.RepositoryDataValue.filter(function (entry) {
            return entry.Key == Key;
        })[0];
        return Value.Value;
    };
    

    $scope.addemployee = function () {
        var e = new employee();
        var v= getMax($scope.employees, 'empId')
       
        e.empId = v.empId + 1;
        e.name = $scope.name;
        e.Salary = $scope.Salary;
        e.DOJ = $scope.DOJ;
        e.gender = $scope.gender;
        e.Role = $scope.Role;
        $scope.employees.push(e);
        
        backButton();

    };

});

app.controller('EmployeeLoginCtrl', function ($scope, $routeParams,$http) {
    $scope.UserID = '';
    $scope.Password = '';
    $scope.loginData = LoginData;

    $scope.showMessage = false;

    $scope.RepositoryDataValue = RepositoryData;

    $scope.RepositoryDatafunction = function (Key) {
       var Value =$scope.RepositoryDataValue.filter(function (entry) {
           return entry.Key == Key;
       })[0];
       return Value.Value;
    };


  

    $scope.LoginSubmit = function () {
     var   loginUser = $scope.loginData.filter(function (entry) {
         return entry.UserID == $scope.UserID && entry.Password == $scope.Password;
        })[0];

         if (!loginUser) {
            $scope.showMessage = true;            
        }
        else {           
            if (loginUser.UserID == $scope.UserID && loginUser.Password == $scope.Password) {
                srtLogin(loginUser.UserID);
                window.location = window.location + 'List';                 
            }
        }

    };

});

 

 

app.controller('EmployeeListCtrl', function ($scope) {
  
    $scope.employees = employeesData;


    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

 

    $scope.removeName = function (emp) {
        var i = $scope.employees.indexOf(emp);
        $scope.employees.splice(i, 1);
    };

    $scope.RepositoryDataValue = RepositoryData;

    $scope.RepositoryDatafunction = function (Key) {
        var Value = $scope.RepositoryDataValue.filter(function (entry) {
            return entry.Key == Key;
        })[0];
        return Value.Value;
    };


});

function goToDashBoard() {
    if (typeof (Storage) !== "undefined") {
        var valUser = localStorage.getItem("UserID");

        if (valUser !== null) {
            if (valUser !== "-1") {
                window.location = "/Example26/Example26.html#/List";
            }
        }
        

    }
}

function checkLogin() {
  
    if (typeof (Storage) !== "undefined") {
        var valUser = localStorage.getItem("UserID");
         
        if (valUser !==null) {
            if (valUser == "-1") {
                window.location = "/Example26/Example26.html";
            }
        }
        else {
            window.location = "/Example26/Example26.html";
        }

    }
}

function srtLogin(val) {

    if (typeof (Storage) !== "undefined") {
       localStorage.setItem("UserID", val);
    }
}

function srtLogout(val) {
        if (typeof (Storage) !== "undefined") {
        localStorage.setItem("UserID", val);
        window.location = "/Example26/Example26.html";
    }
}

function backButton() {
    window.history.back();
}