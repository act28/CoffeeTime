angular.module('starter.services', [])

        /**
         * A simple example service that returns some data.
         */
        .factory('Coffees', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var coffees = [
                {id: 0, name: 'Fershizzle', pic: 'img/coffee-dead.jpg'},
                {id: 1, name: 'Fershnoogle', pic: 'img/coffee-kill.jpg'},
                {id: 2, name: 'Fershnokered', pic: 'img/coffee-shaking.jpg'},
                {id: 3, name: 'Fershnickered', pic: 'img/stupid-faster.jpg'},
                {id: 4, name: 'Fershnozzled', pic: 'img/valium-latte.jpg'},
                {id: 5, name: 'Fershnigger', pic: 'img/squirrel-coffee.jpg'}
            ];

            return {
                all: function () {
                    return coffees;
                },
                get: function (coffeeId) {
                    // Simple index lookup
                    return coffees[coffeeId];
                }
            }
        })

