angular.module('starter.controllers', [])

        .controller('HomeCtrl', function ($scope, $cordovaBatteryStatus, $cordovaDialogs, $cordovaVibration) {
            $scope.coffeeState = 'Unknown';
            $scope.batteryLevel = 'Unknown';
            $scope.isPluggedIn = 'Unknown';

            $cordovaBatteryStatus.$on('batterystatus', function (result) {
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged ? 'On' : 'Off'; // bool
                $scope.coffeeState = $scope.batteryLevel > 70 ? 'Holding' : 'Discharging';
                $cordovaDialogs.alert('Coffee level is at a bearable ' + $scope.batteryLevel + '%', 'CoffeeAlert', 'OK')
                        .then(function () {

                        });
            });
            $cordovaBatteryStatus.$on('batterycritical', function (result) {
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged ? 'On' : 'Off'; // bool
                $scope.coffeeState = 'Critical';
                $cordovaVibration.vibrate(50);
                $cordovaDialogs.alert('Coffee level is critical at ' + $scope.batteryLevel + '%. Immediate intervention required!', 'CoffeeAlert', 'OK')
                        .then(function () {
                        });

            });
            $cordovaBatteryStatus.$on('batterylow', function (result) {
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged ? 'On' : 'Off'; // bool
                $scope.coffeeState = 'Low';
                $cordovaVibration.vibrate(100);
                $cordovaDialogs.alert('Coffee level is low ' + $scope.batteryLevel + '%. Refill at nearest coffee machine ASAP.', 'CoffeeAlert', 'OK')
                        .then(function () {
                        });
            });
        })

        .controller('FindCtrl', function ($scope, Coffees, $cordovaGeolocation) {
            $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function (position) {
                        //$scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                        $scope.lat = position.coords.latitude;
                        $scope.lng = position.coords.longitude;
                        $scope.accuracy = position.coords.accuracy;
                    }, function (err) {
                        alert('Unable to get location: ' + err);
                    });
        })

        .controller('CoffeeCtrl', function ($scope, Coffees) {
            $scope.coffees = Coffees.all();
        })

        .controller('CoffeeDetailCtrl', function ($scope, $stateParams, Coffees, $cordovaCamera) {
            $scope.coffee = Coffees.get($stateParams.coffeeId);
            $scope.takePhoto = function (sourceType) {
                var opts = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: sourceType,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 400,
                    targetHeight: 400,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };
                $cordovaCamera.getPicture(opts).then(function (imageURI) {
                    $scope.coffee.pic = "data:image/jpeg;base64," + imageURI;
                }, function (err) {
                    alert('Failed to upload image - ' + err);
                });
            };
            $scope.cameraUpload = function () {
                $scope.takePhoto(Camera.PictureSourceType.CAMERA);
            };
            $scope.libraryUpload = function () {
                $scope.takePhoto(Camera.PictureSourceType.PHOTOLIBRARY);
            };
        })

        .controller('AboutCtrl', function ($scope, $cordovaDevice) {
            $scope.cordova = $cordovaDevice.getCordova();
            $scope.model = $cordovaDevice.getModel();
            $scope.platform = $cordovaDevice.getPlatform();
            $scope.uuid = $cordovaDevice.getUUID();
            $scope.version = $cordovaDevice.getVersion();
        });



