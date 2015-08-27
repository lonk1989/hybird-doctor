'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'LocalStorageModule'])

.run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            Native.run('umengLog', ['view', 'detail', $state.current.name]);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       'http://ag.furuihui.com/**']);
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
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

    .state('tab.discover', {
        url: '/discover',
        views: {
            'tab-discover': {
                templateUrl: 'templates/tab-discover.html',
                controller: 'DiscoverCtrl'
            }
        }
    })

    .state('tab.me', {
        url: '/me',
        views: {
            'tab-me': {
                templateUrl: 'templates/tab-me.html',
                controller: 'MeCtrl'
            }
        }
    })

    .state('tab.service', {
        url: '/me/service',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-service.html',
                controller: 'ServiceCtrl'
            }
        }
    })

    .state('tab.reservation', {
        url: '/me/reservation',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-reservation.html',
                controller: 'ReservationCtrl'
            }
        }
    })

    .state('tab.doctor', {
        url: '/me/doctor',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-doctor.html',
                controller: 'DoctorCtrl'
            }
        }
    })

    .state('tab.doctor-info', {
        url: '/me/doctor-info/:id',
        views: {
            'tab-me': {
                templateUrl: "templates/me-doctor-info.html",
                controller: "DoctorInfoCtrl"
            }
        }
    })

    .state('tab.doctor-selected', {
        url: '/me/doctor-selected/:id',
        views: {
            'tab-me': {
                templateUrl: "templates/me-doctor-selected.html",
                controller: "DoctorSelectedCtrl"
            }
        }
    })

    .state('tab.succ', {
        url: '/me/succ/:id',
        views: {
            'tab-me': {
                templateUrl: "templates/me-succ.html",
                controller: "SuccCtrl"
            }
        }
    })

    .state('tab.assistant', {
        url: '/me/assistant',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-assistant.html',
                controller: 'AssistantCtrl'
            }
        }
    })

    .state('tab.wallet', {
        url: '/me/wallet',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-wallet.html',
                controller: 'WalletCtrl'
            }
        }
    })

    .state('tab.info', {
        url: '/me/info',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-info.html',
                controller: 'InfoCtrl'
            }
        }
    })

    .state('tab.qa', {
        url: '/me/qa',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-qa.html',
                controller: 'QaCtrl'
            }
        }
    })

    .state('tab.qa-detail', {
        url: '/me/qa-detail:id',
        views: {
            'tab-me': {
                templateUrl: 'templates/me-qa-detail.html',
                controller: 'QaDetailCtrl'
            }
        }
    })

    .state('tab.tips', {
        url: '/me/tips/:id',
        views: {
            'tab-me': {
                templateUrl: "templates/me-tips.html",
                controller: "TipsCtrl"
            }
        }
    })

    .state('tab.rewardToMyDoctor', {
        url: '/me/reward',
        views: {
            'tab-me': {
                templateUrl: "templates/me-reward.html",
                controller: "RewardCtrl"
            }
        }
    })

    .state('tab.reward', {
        url: '/me/reward/:id',
        views: {
            'tab-me': {
                templateUrl: "templates/me-reward.html",
                controller: "RewardCtrl"
            }
        }
    })

    .state('tab.visit', {
        url: '/me/visit',
        views: {
            'tab-me': {
                templateUrl: "templates/me-visit.html",
                controller: "VisitCtrl"
            }
        }
    })

    .state('tab.plan', {
        url: '/home/plan',
        views: {
            'tab-home': {
                templateUrl: 'templates/home-plan.html',
                controller: 'PlanCtrl'
            }
        }
    })

    .state('tab.referral', {
        url: '/home/referral',
        views: {
            'tab-home': {
                templateUrl: 'templates/home-referral.html',
                controller: 'ReferralCtrl'
            }
        }
    })

    .state('tab.plan-logic', {
        url: '/home/plan-logic/:id/:name',
        views: {
            'tab-home': {
                templateUrl: 'templates/home-plan-logic.html',
                controller: 'PlanLogicCtrl'
            }
        }
    })

    .state('tab.act', {
        url: '/discover/act',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-act.html',
                controller: 'ActCtrl'
            }
        }
    })

    .state('tab.act-detail', {
        url: '/discover/act/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-act-detail.html',
                controller: 'ActDetailCtrl'
            }
        }
    })

    .state('tab.game', {
        url: '/discover/game',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-game.html',
                controller: 'GameCtrl'
            }
        }
    })

    .state('tab.game-detail', {
        url: '/discover/game/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-game-detail.html',
                controller: 'GameDetailCtrl'
            }
        }
    })

    .state('tab.hospital', {
        url: '/discover/hospital',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-hospital.html',
                controller: 'HospitalCtrl'
            }
        }
    })

    .state('tab.hospital-detail', {
        url: '/discover/hospital/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-hospital-detail.html',
                controller: 'HospitalDetailCtrl'
            }
        }
    })

    .state('tab.knowledge', {
        url: '/discover/knowledge',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-knowledge.html',
                controller: 'KnowledgeCtrl'
            }
        }
    })

    .state('tab.knowledge-detail', {
        url: '/discover/knowledge/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-knowledge-detail.html',
                controller: 'KnowledgeDetailCtrl'
            }
        }
    })

    .state('tab.medicine', {
        url: '/discover/medicine',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-medicine.html',
                controller: 'MedicineCtrl'
            }
        }
    })

    .state('tab.medicine-detail', {
        url: '/discover/medicine/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-medicine-detail.html',
                controller: 'MedicineDetailCtrl'
            }
        }
    })

    .state('tab.story', {
        url: '/discover/story',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-story.html',
                controller: 'StoryCtrl'
            }
        }
    })

    .state('tab.story-detail', {
        url: '/discover/story/:id',
        views: {
            'tab-discover': {
                templateUrl: 'templates/discover-story-detail.html',
                controller: 'StoryDetailCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

})


.config(function($httpProvider) {
    // 头部配置  
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';


    /**  
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.  
     * @param {Object} obj  
     * @return {String}  
     */
    var param = function(obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest  
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})

.run(function($rootScope) {
    $rootScope.JAVA_URL = JAVA_URL;
    $rootScope.ticket = ionic.Platform.isIOS() ? '元' : '张健康券';
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.historyBack = function() {
        Native.run('historyBack', []);
    }
})
