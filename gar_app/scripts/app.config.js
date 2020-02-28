var app = angular.module("gApp", ['ngRoute', 'angularjs-dropdown-multiselect', 'ui.grid', 'ui.grid.edit', 'ui.grid.grouping']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/dashboard/dash-home.html",
            controller: "dashHomeController"
        })
        .when("/bom", {
            templateUrl: "views/bom/bom-home.html",
            controller: "bomHomeController"
        })
});