var app = angular.module('tostie-library', ['ngRoute','ui.bootstrap','bootstrapLightbox']);

app.config(function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        .when("/ingredient", {
            templateUrl : "Views/ingredient.html",
            controller: "IngredientController"
        })
        .when("/sauce", {
            templateUrl : "views/sauce.html",
            controller: "SauceController"
        })
        .when("/tosties", {
            templateUrl : "views/tostie.html",
            controller: "TostieController"
        })
        .otherwise({
            redirectTo: "/tosties"
        });
});