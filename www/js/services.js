'use strict';
angular.module('starter.services', [])

.factory('ReferralServ', function($http, $q, $ionicPopup, $ionicLoading) {
    return {
        reload: function() {
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/getTreatmentPlanHistoryList.htm', {
                        sign: 'fe3c2ea9dbe6229675aaa3c04300e314',
                        patientId: userInfo.patientId,
                        page: 1,
                        rows: 9999
                    })
                    .success(function(resp) {
                        if (resp.code === '0') {
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                    })
                    .error(function(resp) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('PlanServ', function($http, $q, $ionicPopup, $ionicLoading) {
    return {
        reload: function() {
            var deferred = $q.defer();
            $http.post(JAVA_URL + 'product/app/productList.htm', {
                    sign: '6c362b62fedb0eaa864dc7082ce640fb'
                })
                .success(function(resp) {
                    if (resp.code === '0') {
                        deferred.resolve(resp.data);
                    } else {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.message
                        });
                    }
                })
                .error(function(resp) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                })
            return deferred.promise;
        },
        reloadLogic: function(id) {
            var deferred = $q.defer();
            $ionicLoading.show();
            $http.post(JAVA_URL + 'product/app/findOptionData.htm', {
                    sign: '8c2f642acc3fe64b72a6fe1065d07d57',
                    productCode: id
                })
                .success(function(resp) {
                    if (resp.code === '0') {
                        deferred.resolve(resp.data);
                    } else {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.message
                        });
                    }
                    $ionicLoading.hide();
                })
                .error(function(resp) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                    $ionicLoading.hide();
                })
            return deferred.promise;
        },
        joinPlan: function(productCode, visitTime, resultJson) {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/joinTreatmentPlanNew.htm', {
                        sign: 'be8f9704bd12f7f5444dc013f4faa15b',
                        auth: userInfo.auth,
                        doctorId: userInfo.doctorId,
                        doctorName: userInfo.doctorName,
                        doctorNickName: userInfo.doctorNickName,
                        patientId: userInfo.patientId,
                        patientName: userInfo.patientName,
                        patientNickName: userInfo.patientNickName,
                        productCode: productCode,
                        visitTime: visitTime,
                        resultJson: resultJson,
                        userPwd: ''
                    })
                    .success(function(resp) {
                        if (resp.code === '0') {
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('DiscoverServ', function($http, $q, $ionicPopup, $ionicLoading) {
    return {
        reload: function(type, page, rows) {
            var deferred = $q.defer();
            $http.post(JAVA_URL + 'product/app/getDiscoveryList.htm', {
                    sign: '4e10e65631a48eca8708d2810436b0dd',
                    discoveryType: type,
                    page: page,
                    rows: rows
                })
                .success(function(resp) {
                    if (resp.code === '0') {
                        deferred.resolve(resp.data);
                    } else {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.message
                        });
                    }
                })
                .error(function(resp) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                })
            return deferred.promise;
        },
        reloadDetail: function(id) {
            var deferred = $q.defer();
            $ionicLoading.show();
            $http.post(JAVA_URL + 'product/app/getSysSlideImageDetails.htm', {
                    sign: '272e1e032421156698cdcbb86227c049',
                    id: id
                })
                .success(function(resp) {
                    if (resp.code === '0') {
                        deferred.resolve(resp.data);
                    } else {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.message
                        });
                    }
                    $ionicLoading.hide();
                })
                .error(function(resp) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                    $ionicLoading.hide();
                })
            return deferred.promise;
        }
    }
})

.factory('DoctorServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    var serv = {
        load: function() {
            var doctor = localStorageService.get('doctor');
            if (doctor) {
                var deferred = $q.defer();
                deferred.resolve(doctor);
                return deferred.promise;
            } else {
                return serv.reload();
            }
        },
        reload: function() {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(PHP_URL + 'huanzhe/get_mydoctor.json', {
                        auth: userInfo.auth
                    })
                    .success(function(resp) {
                        if (resp.status === 'success') {
                            localStorageService.set('doctor', resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })

            });
            return deferred.promise;
        },
        loadById: function(id) {
            var ls = 'doctor' + id;
            var doctor = localStorageService.get(ls);
            if (doctor) {
                var deferred = $q.defer();
                deferred.resolve(doctor);
                return deferred.promise;
            } else {
                return serv.reloadById(id);
            }
        },
        reloadById: function(id) {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(PHP_URL + 'appApi/get_user_info_byid.json', {
                        auth: userInfo.auth,
                        userid: id
                    })
                    .success(function(resp) {
                        if (resp.status === 'success') {
                            var ls = 'doctor' + id;
                            localStorageService.set(ls, resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        },
        querySchedule: function() {
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/getDoctorSchedule.htm', {
                        sign: '7aca512be3b2bd84e98198f5a3886f09',
                        doctorId: userInfo.doctorId
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            localStorageService.set('schedule', resp.data);
                            deferred.resolve(resp);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                    })
            });
            return deferred.promise;
        },
        updateReserve: function(amOrPm, subscribeTime, userPwd) {
            $ionicLoading.show();
            var deferred = $q.defer();
            var today = new Date();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/saveSubscribeDetail.htm', {
                        sign: 'e2642229d04a59d2def93c490a00162f',
                        doctorId: userInfo.doctorId,
                        doctorName: userInfo.doctorName,
                        doctorNickName: userInfo.doctorNickName,
                        patientId: userInfo.patientId,
                        patientName: userInfo.patientName,
                        patientNickName: userInfo.patientRealName,
                        amOrPm: amOrPm,
                        subscribeTime: subscribeTime,
                        userPwd: userPwd
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            deferred.resolve(resp);
                        } else if (resp.code === '400010') {
                            Native.run('umengLog', ['event', 'detail', 'InsufficientBalance']);
                            deferred.reject(resp)
                            $ionicPopup.confirm({
                                title: '余额不足',
                                template: '',
                                okText: '充值',
                                cancelText: '取消'
                            }).then(function(res) {
                                if (res) {
                                    Native.run('recharge', []);
                                    Native.run('umengLog', ['event', 'detail', 'Recharge']);
                                }
                            });
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力，调整到一个信号好的方向再试一下吧',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        },
        changeDoctorCheck: function() {
            $ionicLoading.show();
            var deferred = $q.defer();
            var today = new Date();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/changeDoctorCheck.htm', {
                        sign: '28a205d33693b6bb9be3871c7c5c379d',
                        patientId: userInfo.patientId,
                        patientName: userInfo.patientName
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        },
        changeDoctor: function(newDoctorId, newDoctorName, newDoctorNickName, userPwd) {
            $ionicLoading.show();
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/patientChangeDoctor.htm', {
                        auth: userInfo.auth,
                        sign: '44d4270a42b15958ca0fadb147411c56',
                        patientId: userInfo.patientId,
                        patientName: userInfo.patientName,
                        patientNickName: userInfo.patientNickName,
                        ndoctorId: userInfo.doctorId,
                        cdoctorId: newDoctorId,
                        doctorName: newDoctorName,
                        doctorNickName: newDoctorNickName,
                        userPwd: userPwd
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            deferred.resolve(resp.data);
                        } else if (resp.code === '400010') {
                            Native.run('umengLog', ['event', 'detail', 'InsufficientBalance']);
                            deferred.reject(resp)
                            $ionicPopup.confirm({
                                title: '余额不足',
                                template: '',
                                okText: '充值',
                                cancelText: '取消'
                            }).then(function(res) {
                                if (res) {
                                    Native.run('recharge', []);
                                    Native.run('umengLog', ['event', 'detail', 'Recharge']);
                                }
                            });
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力，调整到一个信号好的方向再试一下吧',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }

    return serv;
})

.factory('PatientServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    var serv = {
        load: function() {
            var patient = localStorageService.get('patient');
            if (patient) {
                var deferred = $q.defer();
                deferred.resolve(patient);
                return deferred.promise;
            } else {
                return serv.reload();
            }
        },
        reload: function() {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(PHP_URL + 'appApi/get_user_info.json', {
                        auth: userInfo.auth
                    })
                    .success(function(resp) {
                        console.log(resp)
                        if (resp.status === 'success') {
                            localStorageService.set('patient', resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        },
        update: function(nickname, sex, birthday, is_own, disease, realname, telphone) {
            var deferred = $q.defer();
            var formatBirthday = new Date(birthday).format('yyyy-MM-dd');
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(PHP_URL + 'huanzhe/change_info.json', {
                        auth: userInfo.auth,
                        nickname: nickname,
                        sex: sex,
                        birthday: formatBirthday,
                        is_own: is_own,
                        disease: disease,
                        realname: realname,
                        telphone: telphone
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.status === 'success') {
                            deferred.resolve(resp.data);
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力，调整到一个信号好的方向再试一下吧',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
    return serv;
})


.factory('AssistantServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    var serv = {
        load: function() {
            var assistant = localStorageService.get('assistant');
            if (assistant) {
                var deferred = $q.defer();
                deferred.resolve(assistant);
                return deferred.promise;
            } else {
                return serv.reload();
            }
        },
        reload: function() {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(PHP_URL + 'huanzhe/get_myzhuli.json', {
                        auth: userInfo.auth
                    })
                    .success(function(resp) {
                        if (resp.status === 'success') {
                            localStorageService.set('assistant', resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
    return serv;
})

.factory('RechargeServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    var serv = {
        load: function(userId, userName) {
            var wallet = localStorageService.get('recharge');
            if (recharge) {
                var deferred = $q.defer();
                deferred.resolve(recharge);
                return deferred.promise;
            } else {
                return serv.reload(userId, userName);
            }
        },
        reload: function() {
            var deferred = $q.defer();
            $ionicLoading.show();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'account/app/rechargeDetailPage.htm', {
                        sign: 'c271a28eeb17d04662d7b6b82dd03ee1',
                        userId: userInfo.patientId,
                        userName: userInfo.patientName,
                        sortTarget: 0,
                        pageSize: 9999,
                        pageNo: 1,
                        underThePlatform: '00'
                    })
                    .success(function(resp) {
                        if (resp.code === '0') {
                            localStorageService.set('recharge', resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
    return serv;
})


.factory('ServiceServ', function($http, $q, $ionicPopup, localStorageService) {
    return {
        query: function() {
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/getBuyProductServiceByPatientId.htm', {
                        patientId: userInfo.patientId,
                        sign: '71b9333745f6046f7880e6e543836df3'
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            localStorageService.set('service', resp.data);
                            deferred.resolve(resp);
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('ReservationServ', function($http, $q, $ionicPopup, localStorageService) {
    return {
        query: function() {
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/getSubscribeListByPatientId.htm', {
                        patientId: userInfo.patientId,
                        sign: '0f0b0126ab30d0c0f6ab3610e2918c35'
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            for (var i in resp.data) {
                                resp.data[i].datetime = new Date(resp.data[i].subscribeTime.replace(/-/g, '/')).format('MM月dd日') + (resp.data[i].amOrPm == 0 ? '上午' : '下午');
                            }
                            localStorageService.set('reservation', resp.data);
                            deferred.resolve(resp.data);
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('RewardServ', function($http, $q, $ionicPopup, $ionicLoading) {
    return {
        sendReward: function(productId, productCount) {
            $ionicLoading.show();
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(JAVA_URL + 'product/app/buyAdmireProduct.htm', {
                        sign: '71c3756cdf32389e2d0a172099f4e0d6',
                        doctorId: userInfo.doctorId,
                        doctorName: userInfo.doctorName,
                        doctorNickName: userInfo.doctorNickName,
                        patientId: userInfo.patientId,
                        patientName: userInfo.patientName,
                        patientNickName: userInfo.patientNickName,
                        productCount: productCount,
                        productId: productId,
                        userPwd: '123456'
                    })
                    .success(function(resp, status, headers, config) {
                        if (resp.code === '0') {
                            deferred.resolve(resp);
                        } else if (resp.code === '400010') {
                            Native.run('umengLog', ['event', 'detail', 'InsufficientBalance']);
                            deferred.reject(resp)
                            $ionicPopup.confirm({
                                title: '余额不足',
                                template: '',
                                okText: '充值',
                                cancelText: '取消'
                            }).then(function(res) {
                                if (res) {
                                    Native.run('recharge', []);
                                    Native.run('umengLog', ['event', 'detail', 'Recharge']);
                                }
                            });
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.data
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力，调整到一个信号好的方向再试一下吧',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('TipsServ', function($http, $q, $ionicPopup) {
    return {
        query: function(id) {
            var deferred = $q.defer();
            $http.post(JAVA_URL + 'product/app/getSysSlideImageDetails.htm', {
                    id: id,
                    sign: '272e1e032421156698cdcbb86227c049'
                })
                .success(function(resp, status, headers, config) {
                    if (resp.code === '0') {
                        deferred.resolve(resp.data);
                    } else {
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.data
                        });
                    }
                })
                .error(function(resp, status, headers, config) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                })
            return deferred.promise;
        }
    }
})

.factory('CommentServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    return {
        hasmore: true,
        curPage: 1,
        reload: function(id, page) {
            var deferred = $q.defer();
            Native.getAuth('patient', function(userInfo) {
                $http.post(MSG_URL + 'app_api/get_comment_list', {
                        auth: userInfo.auth,
                        userid: id,
                        page: page
                    })
                    .success(function(resp) {
                        if (resp.code === 200) {
                            var ls = 'comment' + id;
                            localStorageService.set(ls, resp);
                            deferred.resolve(resp);
                        } else {
                            deferred.reject(resp)
                            $ionicPopup.alert({
                                title: '提示',
                                template: resp.message
                            });
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(resp, status, headers, config) {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '网络不给力',
                            template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                            okText: '取消'
                        });
                        $ionicLoading.hide();
                    })
            });
            return deferred.promise;
        }
    }
})

.factory('QaServ', function($http, $q, $ionicPopup, $ionicLoading, localStorageService) {
    return {
        reload: function() {
            var deferred = $q.defer();
            $http.post(PHP_URL + 'weixin/get_articles.json', {

                })
                .success(function(resp) {
                    if (resp.code === 200) {
                        localStorageService.set('qa', resp.data);
                        deferred.resolve(resp.data);
                    } else {
                        deferred.reject(resp)
                        $ionicPopup.alert({
                            title: '提示',
                            template: resp.message
                        });
                    }
                    $ionicLoading.hide();
                })
                .error(function(resp, status, headers, config) {
                    deferred.reject(resp)
                    $ionicPopup.alert({
                        title: '网络不给力',
                        template: '<a style="text-align:center;" href="javascript:location.reload()">点击这里刷新再试试</a>',
                        okText: '取消'
                    });
                    $ionicLoading.hide();
                })
            return deferred.promise;
        }
    }
})
