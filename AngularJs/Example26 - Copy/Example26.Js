var app = angular.module('myApp', ['ui.bootstrap', 'ngResource','ngRoute']);

var Emplyee = function () {
     empId = '';
     name = '';
     Salary = '';
     DOJ = '2010-01-01';

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
     $scope.DOJ ;

    $scope.emplyees = emplyeesData;
    $scope.emplyee = $scope.emplyees.filter(function (entry) {
        return entry.empId == $scope.empId;
    })[0];

    

    $scope.addEmplyee = function () {
        var e = new Emplyee();
        var v= getMax($scope.emplyees, 'empId')
       
        e.empId = v.empId + 1;
        e.name = $scope.name;
        e.Salary = $scope.Salary;
        e.DOJ = $scope.DOJ;

        $scope.emplyees.push(e);
        $scope.name = '';
        $scope.Salary = 0.0;
        $scope.DOJ = '';
        backButton();

    };

});

app.controller('EmployeeLoginCtrl', function ($scope, $routeParams) {
    $scope.UserID = '';
    $scope.Password = '';
    $scope.loginData = LoginData;

    $scope.showMessage = false;


        

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
    checkLogin();
    $scope.emplyees = emplyeesData;


    $scope.totalItems = $scope.emplyees.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.paginate = function (value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.emplyees.indexOf(value);
        return (begin <= index && index < end);
    };

    $scope.removeName = function (emp) {
        var i = $scope.emplyees.indexOf(emp);
        $scope.emplyees.splice(i, 1);
    };


});


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