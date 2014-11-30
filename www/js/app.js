// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                window.addEventListener('batterystatus', function (result) {
                    var batteryLevel = result.level; // (0 - 100)
                    var isPluggedIn = result.isPlugged ? 'On' : 'Off';
                    alert('CoffeeLevel is normal at ' + batteryLevel + '%. CoffeeMachine is ' + isPlugged);
                });
                window.addEventListener('batterylow', function (result) {
                    var batteryLevel = result.level; // (0 - 100)
                    var isPluggedIn = result.isPlugged ? 'On' : 'Off';
                    alert('CoffeeLevel is low at ' + batteryLevel + '%. CoffeeMachine is ' + isPlugged);
                });
                window.addEventListener('batterycritical', function (result) {
                    var batteryLevel = result.level; // (0 - 100)
                    var isPluggedIn = result.isPlugged ? 'On' : 'Off';
                    alert('CoffeeLevel is critical at ' + batteryLevel + '%. CoffeeMachine is ' + isPlugged);
                });
                //var div = document.getElementById("map_canvas");
                //var map = plugin.google.maps.Map.getMap(div);
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        url: "/tab",
                        abstract: true,
                        templateUrl: "templates/tabs.html"
                    })

                    // Each tab has its own nav history stack:

                    .state('tab.home', {
                        url: '/home',
                        views: {
                            'tab-home': {
                                templateUrl: 'templates/tab-home.html',
                                controller: 'HomeCtrl'
                            }
                        }
                    })

                    .state('tab.find', {
                        url: '/find',
                        views: {
                            'tab-find': {
                                templateUrl: 'templates/tab-find.html',
                                controller: 'FindCtrl'
                            }
                        }
                    })
                    .state('tab.coffee', {
                        url: '/coffee',
                        views: {
                            'tab-coffee': {
                                templateUrl: 'templates/tab-coffee.html',
                                controller: 'CoffeeCtrl'
                            }
                        }
                    })
                    .state('tab.coffee-detail', {
                        url: '/coffee/:coffeeId',
                        views: {
                            'tab-coffee': {
                                templateUrl: 'templates/coffee-detail.html',
                                controller: 'CoffeeDetailCtrl'
                            }
                        }
                    })

                    .state('tab.about', {
                        url: '/about',
                        views: {
                            'tab-about': {
                                templateUrl: 'templates/tab-about.html',
                                controller: 'AboutCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/tab/home');
        })


