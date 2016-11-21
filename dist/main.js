var gulp = require('gulp');


gulp.paths = {
  src: 'www',
  js: ['gulpfile.js', 'gulp/**/*', 'www/*.js', 'www/**/*.js'],
  html: ['www/*.html', 'www/**/*.html'],
};

require('require-dir')('./gulp');
'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var prettify = require('gulp-jsbeautifier');

/**
 * Beautify HTML
 */
gulp.task('beautify-html', function () {
  gulp.src(paths.html, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc'
    }))
    .pipe(gulp.dest('.'));
});

/**
 * Beautify JS
 */
gulp.task('beautify', function () {
  gulp.src(paths.js, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});


// gulp.task('beautify:build', function () {
//  gulp.src(paths.html.concat(paths.js))
//   .pipe(prettify({
//    config: '.jsbeautifyrc',
//    mode: 'VERIFY_ONLY'
//   }));
// });
var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
 
});
var gulp = require('gulp');
var concat = require('gulp-concat');
var paths = gulp.paths;
var minify = require('gulp-minify');
 
gulp.task('concat-compress', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(minify({
        ext:{
            // src:'-all.js',
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['concat-compress']);


(function () {

  'use strict'

  angular.module('keyMS', [
    'keys-module',
    'popup-module',
    'keyMS.index-controller',
    'keyMS.common-service',
    '720kb.datepicker',
    'validation.match',
    'keyMS.router'
  ]);

})()
(function () {
  'use strict'

  angular.module('keyMS.index-controller', [])
    .controller('indexController', function ($scope, keyMSService) {
      var vm = this;
      vm.keyMSService = keyMSService;
      vm.openPopup = function (param) {
        vm.keyMSService.setPopupData();
        vm.keyMSService.isSecondaryEdit = false;
        vm.keyMSService.isEdit = false;
      }

      vm.openMenu = function () {
        vm.keyMSService.isMenuOpen = true;
      }

      vm.closeMenu = function () {
        vm.keyMSService.isMenuOpen = false;
      }

      vm.openAccordion = function () {
        angular.element('.menu-lists').slideToggle();
        angular.element('.menu-heading').toggleClass('up-arrow')
      }

    })
})()
(function () {

  'use strict'

  angular.module('keyMS.router', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when("/", {
          template: '<div class="key-title"><div class="logo-key">P</div><p>Primary Key</p><div class="add-btn" ng-if="!indexCtrl.keyMSService.isSecondary" ng-click="indexCtrl.openPopup()">Add+</div></div> <keys class="table-container"></keys>'
        })
        .when("/primarykey/:ID", {
          template: '<div class="key-title"><div class="logo-key">P</div><p>Primary Key</p><div class="add-btn" ng-click="indexCtrl.openPopup()">Add+</div><p class="count">No. of Primary keys added - {{indexCtrl.keyMSService.count}}</p></div> <keys table-heading="popupCtrl.heading" isSecondary="false" class="table-container"></keys>',
          controller: "popupController",
          controllerAs: "popupCtrl"
        })
        .when("/secondarykey/:ID", {
          template: '<div class="key-title"><div class="logo-key">S</div><p>Secondary Key</p><div class="add-btn" ng-click="indexCtrl.openPopup()">Add+</div></div> <keys table-heading="popupCtrl.heading" class="table-container"></keys>',
          controller: "popupController",
          controllerAs: "popupCtrl"
        })
    });

})()
(function () {

  'use strict'

  angular.module('keyMS.common-service', ['ngStorage'])
    .service('keyMSService', function ($localStorage) {

      var keyService = {};
      keyService.userData = [];
      keyService.isPopUpVisible = false;
      keyService.isPassPopup = false;
      keyService.index = "";
      keyService.isEdit = false;
      keyService.count = 0;
      keyService.isSecondary = false;
      keyService.isSecondaryEdit = false;
      keyService.parentIndex = "";
      keyService.isSecondaryDelete = false;
      keyService.isMenuOpen = false;

      keyService.getUserData = function () {
        if ($localStorage.userData) {
          keyService.userData = $localStorage.userData;
          keyService.count = $localStorage.userData.length;

        }
        return keyService.userData;
      }

      keyService.setUserData = function (data) {

        data.key = keyService.createRandomKey();

        if (keyService.isEdit) {
          keyService.userData[keyService.index].description =
            data.description;
          keyService.userData[keyService.index].activeon = data.activeon;
          keyService.userData[keyService.index].color = data.color;
          keyService.userData[keyService.index].expiry = data.expiry;
          $localStorage.userData = keyService.userData;
        } else {
          if (!data.primaryKey) {
            keyService.userData.push(data);
            $localStorage.userData = keyService.userData;
          }
        }

        keyService.count = keyService.userData.length;

        if (data.primaryKey && !keyService.isSecondaryEdit) {
          angular.forEach(keyService.userData, function (value,
            index) {
            if (value.key === data.primaryKey) {
              var secondaryKey = {
                key: data
                  .key,
                description: data
                  .description,
                activeon: data
                  .activeon,
                color: data
                  .color,
                expiry: data
                  .expiry,
                password: data
                  .password
              }
              if (!keyService.userData[
                  index].secondaryKey)
                keyService.userData[
                  index].secondaryKey = [];
              keyService.userData[
                  index].secondaryKey
                .push(
                  secondaryKey
                );
              $localStorage.userData =
                keyService.userData;
            }
          });
        }

        if (keyService.isSecondaryEdit) {
          keyService.userData[keyService.parentIndex].secondaryKey[
              keyService.index].description =
            data.description;;
          $localStorage.userData = keyService.userData;
        }
        if (!$localStorage.userData.length) {
          $localStorage.userData = keyService.userData;
        }

      }

      keyService.getPopupData = function () {
        return keyService.isPopUpVisible;
      }

      keyService.setPopupData = function (value) {
        if (value === "passPopup") {
          keyService.isPassPopup = true;
        }
        keyService.isPopUpVisible = true;
      }

      keyService.createRandomKey = function () {
        var text = "";
        var possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 9; i++)
          text += possible.charAt(Math.floor(Math.random() *
            possible.length));
        return text;
      }
      return keyService;
    });
})()
(function () {

  'use strict'

  angular.module('keys-module-directive', [])
    .component('keys', {
      bindings: {
        tableHeading: "="
      },
      controller: 'popupController',
      controllerAs: 'keysCtrl',
      templateUrl: 'components/keys/keys.html'
    })
})()
(function () {
  'use strict'

  angular.module('keys-module', [
    'keys-module-directive'
  ])

})()
(function () {

  'use strict'

  angular.module('keyMS.popup-controller', ['ngTable', 'ngStorage'])
    .controller('popupController', function ($scope, keyMSService, NgTableParams, $localStorage,
      $routeParams) {
      var vm = this;
      vm.newUserData = {};
      vm.keyMSService = keyMSService;
      vm.isSecondary = parseInt($routeParams.ID);
      vm.keyMSService.isSecondary = vm.isSecondary;

      vm.heading = ["Key", "Description", "Active On", "Expires On", "Actions"];
      if (vm.isSecondary) {
        vm.heading[0] = "Secondary Key"
      }

      console.log(vm.tableHeading)

      vm.submitForm = function () {
        keyMSService.setUserData(vm.newUserData);
        vm.checkKeyStatus(vm.newUserData);
        vm.closeModal();
      }

      vm.tableData = vm.keyMSService.getUserData();
      $scope.tableData = vm.tableData;
      vm.tableParams = new NgTableParams({
        page: 1,
        count: 4
      }, {
        total: 0,
        dataset: vm.tableData
      });

      $scope.$watch('tableData', function () {
        vm.tableParams.settings().$scope = $scope;
        vm.tableParams.reload();
      }, true);

      vm.closeModal = function () {
        keyMSService.isPopUpVisible = false;
        keyMSService.isPassPopup = false;
      }

      vm.checkKeyStatus = function (data) {
        var activeDate = data.activeon,
          expiryDate = data.expiry;
        vm.newUserData.color = vm.compareDates(expiryDate, activeDate);
        if (vm.keyMSService.isEdit) {
          vm.tableData[vm.keyMSService.index].color = vm.newUserData
            .color;
          vm.keyMSService.isEdit = false;
        }
      }

      vm.compareDates = function (expiry, active) {
        var today = new Date();
        var ddCurr = today.getDate();
        var mmCurr = today.getMonth() + 1; //January is 0!

        var yyyyCurr = today.getFullYear();
        if (ddCurr < 10) {
          ddCurr = '0' + ddCurr
        }
        if (mmCurr < 10) {
          mmCurr = '0' + mmCurr
        }
        var currDate = yyyyCurr + '/' + mmCurr + '/' + ddCurr;
        var today = new Date(currDate).getTime() / 1000;
        var expiryDate = new Date(expiry).getTime() / 1000;
        var activeDate = new Date(active).getTime() / 1000;
        if (today > activeDate && today < expiryDate) {
          return 'rgb(43, 255, 18)';
        }

        if (today < activeDate && today < expiryDate) {
          return 'rgb(234, 249, 0)';
        }

        if (today > expiryDate && today > activeDate) {
          return 'rgb(255, 66, 66)';
        }

        if (today === activeDate && today < expiryDate) {
          return 'rgb(43, 255, 18)';
        }

        if (today === activeDate && today === expiryDate) {
          return 'rgb(43, 255, 18)';
        }
        if (today > activeDate && today === expiryDate) {
          return 'rgb(43, 255, 18)';
        }


      }

      vm.submitPassForm = function () {
        var index = vm.keyMSService.index;
        var parentIndex = vm.keyMSService.parentIndex;

        //primary edit / delete
        if (vm.keyMSService.isEdit === true) {
          if (vm.passwordPop === vm.tableData[index].password) {
            vm.title = "Edit Key"
            vm.keyMSService.isPassPopup = false;
            vm.keyMSService.setPopupData();
            vm.newUserData.description = vm.tableData[index]
              .description;
            vm.newUserData.activeon = vm.tableData[index].activeon;
            vm.newUserData.expiry = vm.tableData[index].expiry;
          } else {
            vm.passwordIncorrect = true;
          }
        }

        if (vm.keyMSService.isDelete === true) {
          if (vm.passwordPop === vm.tableData[index].password) {
            vm.tableData.splice(index, 1);
            vm.keyMSService.isPassPopup = false;
            vm.keyMSService.isPopUpVisible = false;
            vm.passwordIncorrect = false;
          } else {
            vm.passwordIncorrect = true;
          }
        }

        // secondaryEdit / delete
        if (vm.keyMSService.isSecondaryEdit === true) {
          if (vm.passwordPop === vm.tableData[parentIndex].secondaryKey[
              index].password) {
            vm.title = "Edit secondary Key"
            vm.keyMSService.isPassPopup = false;
            vm.keyMSService.setPopupData();
            vm.newUserData.key = vm.tableData[parentIndex].secondaryKey[
              index].key;
            vm.newUserData.description = vm.tableData[
                parentIndex].secondaryKey[index]
              .description;
            vm.newUserData.activeon = vm.tableData[
                parentIndex].secondaryKey[index]
              .activeon;
            vm.newUserData.expiry = vm.tableData[
                parentIndex].secondaryKey[index]
              .expiry;
            vm.newUserData.primaryKey = vm.tableData[
              parentIndex].key;
          } else {
            vm.passwordIncorrect = true;
          }
        }

        if (vm.keyMSService.isSecondaryDelete === true) {
          if (vm.passwordPop === vm.tableData[parentIndex].secondaryKey[
              index].password) {
            vm.tableData[parentIndex].secondaryKey.splice(
              index, 1);
            vm.keyMSService.isPassPopup = false;
            vm.keyMSService.isPopUpVisible = false;
            vm.passwordIncorrect = false;
          } else {
            vm.passwordIncorrect = true;
          }
        }

      }

      vm.deleteRow = function (parentIndex, key) {
        vm.keyMSService.setPopupData("passPopup");
        vm.keyMSService.isEdit = false;
        vm.keyMSService.isDelete = true;
        vm.keyMSService.isSecondaryEdit = false;
        vm.keyMSService.isSecondaryDelete = false;
        if (parentIndex >= 0 && parentIndex !== "") {
          vm.keyMSService.parentIndex = parentIndex;
          vm.keyMSService.isSecondaryEdit = false;
          vm.keyMSService.isSecondaryDelete = true;
          vm.keyMSService.isEdit = false;
          vm.keyMSService.isDelete = false;
          angular.forEach(vm.tableData[parentIndex].secondaryKey,
            function (value, index) {
              if (key === value.key) {
                vm.keyMSService.index =
                  index;
              }
            })
        } else {
          angular.forEach(vm.tableData, function (value, index) {
            if (key === value.key) {
              vm.keyMSService.index =
                index;
            }
          })
        }
      }

      vm.editKey = function (parentIndex, key) {
        vm.keyMSService.setPopupData("passPopup");
        vm.keyMSService.isEdit = true;
        vm.keyMSService.isDelete = false;
        vm.keyMSService.isSecondaryEdit = false;
        vm.keyMSService.isSecondaryDelete = false;
        if (parentIndex >= 0 && parentIndex !== "") {
          vm.keyMSService.parentIndex = parentIndex;
          vm.keyMSService.isSecondaryEdit = true;
          vm.keyMSService.isEdit = false;
          vm.keyMSService.isDelete = false;
          vm.keyMSService.isSecondaryDelete = false;
          angular.forEach(vm.tableData[parentIndex].secondaryKey,
            function (value, index) {
              if (key === value.key) {
                vm.keyMSService.index =
                  index;
              }
            })
        } else {
          angular.forEach(vm.tableData, function (value, index) {
            if (key === value.key) {
              vm.keyMSService.index =
                index;
            }
          })
        }
      }

      vm.poulateData = function (key) {
        angular.forEach(keyMSService.userData, function (value, index) {
          if (key === value.key) {
            vm.newUserData.description =
              value.description;
            vm.newUserData.activeon = value
              .activeon;
            vm.newUserData.expiry = value.expiry;
          }
        });
      }

    })
})()
(function () {

  'use strict'

  angular.module('popup-module-directive', [])
    .component('popup', {
      bindings: {
        title: "@"
      },
      controller: 'popupController',
      controllerAs: 'popupCtrl',
      templateUrl: "components/popup/popup.html",

    })
})()
(function () {
  'use strict'

  angular.module('popup-module', [
    'keyMS.popup-controller',
    'popup-module-directive'
  ])

})()