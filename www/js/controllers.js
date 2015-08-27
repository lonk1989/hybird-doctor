'use strict';
angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $state) {
    $scope.open = function(state, params) {
        $state.go(state, params);
    };
})

.controller('HomeCtrl', function($scope, $ionicPlatform) {})

.controller('MeCtrl', function($scope, $ionicPlatform) {})

.controller('DiscoverCtrl', function($scope, $ionicPlatform) {})

.controller('ServiceCtrl', function($scope, $ionicHistory, $ionicPlatform, ServiceServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        if (ionic.Platform.platform() === 'ios') {
            $scope.img = function(id) {
                switch (id) {
                    case 7:
                        return '../img/1yuan.png';
                    case 8:
                        return '../img/5yuan.png';
                    case 9:
                        return '../img/10yuan.png';
                    default:
                        return '../img/servicecase.png';
                }
            }
            $scope.name = function(productName) {
                switch (productName) {
                    case '鲜花':
                        return '打赏1元';
                    case '锦旗':
                        return '打赏5元';
                    case '奖杯':
                        return '打赏10元';
                    default:
                        return productName;
                }
            }
        } else {
            $scope.img = function(id) {
                switch (id) {
                    case 7:
                        return '../img/flower.png';
                    case 8:
                        return '../img/flag.png';
                    case 9:
                        return '../img/cup.png';
                    default:
                        return '../img/servicecase.png';
                }
            }
        }

        ServiceServ.query().then(function(resp) {
            $scope.serviceList = resp.data;
        })
    });
})

.controller('ReservationCtrl', function($scope, $ionicHistory, $ionicPlatform, DoctorServ, ReservationServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DoctorServ.reload().then(function(resp) {
            $scope.doctor = resp;
        });

        ReservationServ.query().then(function(resp) {
            $scope.reservationList = resp;
        });
    });
})

.controller('RewardCtrl', function($scope, $ionicHistory, $ionicPlatform, $rootScope, $stateParams, $ionicPopup, DoctorServ, AssistantServ, RewardServ, $ionicModal) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        if ($rootScope.isIOS) {
            document.getElementById('iosReward').style.display = 'block';
        } else {
            document.getElementById('androidReward').style.display = 'block';
        }

        if ($stateParams.id == 1) {
            AssistantServ.reload().then(function(resp) {
                $scope.doctor = resp;
                $scope.rewardTarget = '个管师';
            })
        } else {
            DoctorServ.reload().then(function(resp) {
                $scope.doctor = resp;
                $scope.rewardTarget = '医生';
            })
        }

        var product = [{
            name: '鲜花',
            price: '1'
        }, {
            name: '锦旗',
            price: '5'
        }, {
            name: '奖杯',
            price: '10'
        }]
        $scope.product = product;
        $scope.productCount = 1;
        $scope.selectCount = '1';
        $scope.index = 0;

        $scope.reward = function(index) {
            $scope.selectShow = true;
            $scope.inputShow = false;
            $scope.index = index;
            switch (index) {
                case 0:
                    $scope.img = '../img/flower.png';
                    $scope.productId = 7;
                    break;
                case 1:
                    $scope.img = '../img/flag.png';
                    $scope.productId = 8;
                    break;
                case 2:
                    $scope.img = '../img/cup.png';
                    $scope.productId = 9;
                    break;
            }
            rewardSet(index);
        };

        $scope.selectNum = function(num) {
            if (num == '0') {
                $scope.selectShow = false;
                $scope.inputShow = true;
                $scope.productCount = 1;
                return;
            }
            $scope.selectCount = num;
            $scope.productCount = parseInt(num);
        };

        function rewardSet(index) {
            $ionicPopup.show({
                // title: product[index].name + 'x1（' + product[index].price + $rootScope.ticket + '）',
                templateUrl: 'selectCount-modal',
                scope: $scope,
                buttons: [{
                    text: '取消',
                    onTap: function(e) {
                        $scope.selectCount = '1';
                    }
                }, {
                    text: '打赏',
                    type: 'button-positive',
                    onTap: function(e) {
                        if ($scope.productCount == null || typeof $scope.productCount == 'undefined') {
                            e.preventDefault();
                            $ionicPopup.alert({
                                title: '请输入数字!',
                            })
                            return;
                        }
                        //提交打赏
                        RewardServ.sendReward($scope.productId, $scope.productCount).then(function() {
                            Native.run('umengLog', ['event', 'detail', 'RewardSuccess']);
                            $ionicPopup.alert({
                                title: '打赏成功!',
                                template: ''
                            }).then(function() {
                                Native.run('goBack', []);
                            })
                        })

                    }
                }]
            });
        }

        $scope.rewardMoney = function(index) {
            $scope.selectShow = true;
            $scope.inputShow = false;
            switch (index) {
                case 0:
                    $scope.img = '../img/1yuan.png';
                    $scope.productId = 7;
                    break;
                case 1:
                    $scope.img = '../img/5yuan.png';
                    $scope.productId = 8;
                    break;
                case 2:
                    $scope.img = '../img/10yuan.png';
                    $scope.productId = 9;
                    break;
            }
            rewardMoneySet(index);
        };

        function rewardMoneySet(index) {
            $ionicPopup.confirm({
                title: '向' + $scope.rewardTarget + '打赏' + product[index].price + $rootScope.ticket,
                template: '',
                okText: '打赏',
                cancelText: '取消'
            }).then(function(res) {
                if (res) {
                    //提交打赏
                    RewardServ.sendReward($scope.productId, $scope.productCount).then(function() {
                        Native.run('umengLog', ['event', 'detail', 'RewardSuccess']);
                        $ionicPopup.alert({
                            title: '打赏成功!',
                            template: ''
                        }).then(function() {
                            Native.run('goBack', []);
                        })
                    })
                }
            })
        }
    });
})

.controller('DoctorCtrl', function($scope, $ionicHistory, $ionicPlatform, $ionicListDelegate, $timeout, DoctorServ, CommentServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DoctorServ.reload().then(function(resp) {
            $scope.doctor = resp;
        })
        Native.getAuth('patient', function(userInfo) {
            CommentServ.reload(userInfo.doctorId, CommentServ.curPage).then(function(comment) {
                $scope.comment = comment;
                CommentServ.hasmore = comment.pagecount > CommentServ.curPage;
            });
        });

        $scope.loadMore = function() {
            //这里使用定时器是为了缓存一下加载过程，防止加载过快
            $timeout(function() {
                if (!CommentServ.hasmore) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
                CommentServ.reload(resp.userid, CommentServ.curPage).then(function(response) {
                    CommentServ.hasmore = response.pagecount > CommentServ.curPage;
                    for (var i = 0; i < response.list.length; i++) {
                        $scope.comment.list.push(response.list[i]);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    CommentServ.curPage++;
                });
            }, 1000);
        };
        $scope.moreDataCanBeLoaded = function() {
            return CommentServ.hasmore;
        }
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
        $ionicListDelegate.showReorder(true);

        $scope.rate = function(modeid, userid, nickname) {
            Native.run('rate', [modeid, userid, nickname]);
            Native.run('umengLog', ['event', 'detail', 'rate']);
        }

        $scope.changeDoctor = function() {
            Native.run('changeDoctor', []);
            Native.run('umengLog', ['event', 'detail', 'changeDoctor']);
        }
    });
})

.controller('DoctorInfoCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, $ionicListDelegate, $timeout, DoctorServ, CommentServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DoctorServ.reloadById($stateParams.id).then(function(resp) {
            $scope.doctor = resp;

        })

        CommentServ.reload($stateParams.id, CommentServ.curPage).then(function(comment) {
            $scope.comment = comment;
            CommentServ.hasmore = comment.pagecount > CommentServ.curPage;
        });

        $scope.loadMore = function() {
            //这里使用定时器是为了缓存一下加载过程，防止加载过快
            $timeout(function() {
                if (!CommentServ.hasmore) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
                CommentServ.reload(resp.userid, CommentServ.curPage).then(function(response) {
                    CommentServ.hasmore = response.pagecount > CommentServ.curPage;
                    for (var i = 0; i < response.list.length; i++) {
                        $scope.comment.list.push(response.list[i]);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    CommentServ.curPage++;
                });
            }, 1000);
        };
        $scope.moreDataCanBeLoaded = function() {
            return CommentServ.hasmore;
        }
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
        $ionicListDelegate.showReorder(true);
    });
})

.controller('DoctorSelectedCtrl', function($scope, $ionicHistory, $ionicPlatform, $rootScope, $stateParams, $ionicPopup, $location, DoctorServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        $scope.canChangeDoctor = true;
        DoctorServ.reloadById($stateParams.id).then(function(doctor) {
            $scope.doctor = doctor;
            DoctorServ.changeDoctorCheck().then(function(price) {
                $scope.canChangeDoctor = false;
                $scope.changeDoctor = function() {
                    $ionicPopup.prompt({
                        title: '选择医生需要支付' + price.price + $rootScope.ticket,
                        template: '请输入密码',
                        inputType: 'password',
                        okText: '确认',
                        cancelText: '取消'
                    }).then(function(res) {
                        if (typeof res != 'undefined') {
                            DoctorServ.changeDoctor(doctor.userid, doctor.username, doctor.nickname, res).then(function(resp) {
                                Native.run('umengLog' ['event', 'detail', 'ChangeDoctorSuccess'])
                                $location.path('tab/me/succ/' + $stateParams.id)
                            })
                        }
                    });
                }
            })
        })
    });
})

.controller('SuccCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DoctorServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DoctorServ.reloadById($stateParams.id).then(function(doctor) {
            $scope.doctor = doctor;
        });

        $scope.changeDoctorSucc = function() {
            Native.run('changeDoctorSucc', []);
        }
    });
})

.controller('AssistantCtrl', function($scope, $ionicHistory, $ionicPlatform, $ionicListDelegate, $timeout, AssistantServ, CommentServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        AssistantServ.reload().then(function(resp) {
            $scope.assistant = resp;
        })
        Native.getAuth('patient', function(userInfo) {
            CommentServ.reload(userInfo.assistantId, CommentServ.curPage).then(function(comment) {
                $scope.comment = comment;
                CommentServ.hasmore = comment.pagecount > CommentServ.curPage;
            });
        });

        $scope.loadMore = function() {
            //这里使用定时器是为了缓存一下加载过程，防止加载过快
            $timeout(function() {
                if (!CommentServ.hasmore) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
                CommentServ.reload(resp.userid, CommentServ.curPage).then(function(response) {
                    CommentServ.hasmore = response.pagecount > CommentServ.curPage;
                    for (var i = 0; i < response.list.length; i++) {
                        $scope.comment.list.push(response.list[i]);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    CommentServ.curPage++;
                });
            }, 1000);
        };
        $scope.moreDataCanBeLoaded = function() {
            return CommentServ.hasmore;
        }
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
        $ionicListDelegate.showReorder(true);

        $scope.rate = function(modeid, userid, nickname) {
            Native.run('rate', [modeid, userid, nickname]);
            Native.run('umengLog', ['event', 'detail', 'rate']);
        }
    });
})

.controller('WalletCtrl', function($scope, $ionicHistory, $ionicPlatform, RechargeServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        RechargeServ.reload().then(function(resp) {
            $scope.rechargeList = resp;
        })

        $scope.recharge = function() {
            Native.run('recharge', []);
            Native.run('umengLog', ['event', 'detail', 'Recharge']);
        }
    });
})

.controller('InfoCtrl', function($scope, $ionicHistory, $ionicPlatform, $ionicPopup, PatientServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        PatientServ.reload().then(function(resp) {
            $scope.patient = resp
        });
        $scope.maxDate = new Date();
        $scope.editState = true;
        $scope.cancelState = false;
        $scope.editButton = false;
        $scope.infoEdit = function() {
            $scope.editState = false;
            $scope.editButton = true;
            $scope.cancelState = true;
        };
        $scope.cancelEdit = function() {
            $scope.editState = true;
            $scope.cancelState = false;
            $scope.editButton = false;
            $scope.patient = localStorageService.get('patient');
        };

        $scope.updateUser = function(nickname, sex, birthday, is_own, disease, realname, telphone) {
            Native.run('umengLog', ['event', 'detail', 'UpdatePatientInfo'])
            PatientServ.update(nickname, sex, birthday, is_own, disease, realname, telphone).then(function() {
                $ionicPopup.alert({
                    title: '修改成功!',
                    template: ''
                }).then(function() {
                    Native.run('updatePatientName', [nickname, realname]);
                    PatientServ.reload();
                    Native.run('historyBack', []);
                })
            })
        }
    });
})

.controller('TipsCtrl', function($scope, $ionicPlatform, $stateParams, $ionicHistory, localStorageService, TipsServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        TipsServ.query($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark.replace(/<img src="/g, '<img src="' + JAVA_URL);
        });

        $scope.share = function() {
            Native.run('umengLog', ['event', 'detail', 'ShareTips']);
            Native.run('share', []);
        }

        if (localStorageService.get('auth') == null) {
            $scope.noHeader = false;
            $scope.noHeaderStyle = {
                top: 0
            };
        } else {
            $scope.noHeader = true;
            $scope.noHeaderStyle = {};
        }
    });
})

.controller('VisitCtrl', function($scope, $ionicHistory, $ionicPlatform, $rootScope, $ionicPopup, localStorageService, DoctorServ, PatientServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        var today = Date.now(),
            day = [];
        var distance = new Date().getDay() - 1;
        distance = distance == -1 ? 6 : distance;
        $scope.weekday = distance + 1;
        $scope.afternoon = new Date().getHours() > 12;
        day[0] = new Date(today + (3600 * 24 * (0 - distance) * 1000)).format('MM月dd日');
        day[1] = new Date(today + (3600 * 24 * (6 - distance) * 1000)).format('dd日');
        day[2] = new Date(today + (3600 * 24 * (7 - distance) * 1000)).format('MM月dd日');
        day[3] = new Date(today + (3600 * 24 * (13 - distance) * 1000)).format('dd日');

        $scope.week1 = day[0] + '~' + day[1];
        $scope.week2 = day[2] + '~' + day[3];

        Native.getAuth('patient', function(userInfo) {
            DoctorServ.querySchedule().then(function(resp) {
                $scope.schedule = resp.data;
                if ((resp.data.next_weeks === '0,0|0,0|0,0|0,0|0,0|0,0|0,0' && resp.data.this_weeks === '0,0|0,0|0,0|0,0|0,0|0,0|0,0') || resp.data.limitPeoples == 0) {
                    $ionicPopup.alert({
                        title: userInfo.doctorNickName + '医生尚未开放预约加号',
                        template: '您可以通过医生的患友群里或找对应个管师进行询问'
                    })
                }
            });
        })

        $scope.choose = function(week, sxw, active) {
            if (active) {
                $scope.selected = {
                    week: week,
                    sxw: sxw,
                    selectedDate: new Date(today + (3600 * 24 * (0 - distance + week - 1) * 1000)).format('yyyy-MM-dd hh:mm:ss')
                }
            }
        }

        $scope.reserve = function(amOrPm, subscribeTime, price) {
            $ionicPopup.prompt({
                title: '请输入密码',
                template: '支付' + price + $rootScope.ticket,
                inputType: 'password',
                okText: '确认',
                cancelText: '取消'
            }).then(function(res) {
                if (typeof res != 'undefined') {
                    Native.run('umengLog', ['event', 'detail', 'ReserveSuccess'])
                    DoctorServ.updateReserve(amOrPm, subscribeTime, res).then(function(resp) {
                        $ionicPopup.alert({
                            title: '预约成功!',
                            template: ''
                        });
                    })
                }
            });
        }
    });
})

.controller('QaCtrl', function($scope, $ionicHistory, $ionicPlatform, QaServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        QaServ.reload().then(function(resp) {
            $scope.qaList = resp.list;
        })
    });
})

.controller('QaDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, QaServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $scope.location = 'http://ag.furuihui.com/article.php?id=' + $stateParams.id;
})

.controller('ReferralCtrl', function($scope, $ionicHistory, $ionicPlatform, ReferralServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        ReferralServ.reload().then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('PlanCtrl', function($scope, $ionicHistory, $ionicPlatform, PlanServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        PlanServ.reload().then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('PlanLogicCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, PlanServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        $scope.tit = $stateParams.name;
        $scope.currDate = Date.now();
        $scope.setDate = new Date(Date.now() + 3600 * 24 * 7 * 2 * 1000);
        var _logicList = [];
        PlanServ.reloadLogic($stateParams.id).then(function(resp) {
            _logicList = JSON.parse(resp[0].optionData);
            $scope.logic = _findLogic('1');
            $scope.logic.choice = 0;
        })

        $scope.next = function() {
            var nextTitNum = $scope.logic.titNum + '.' + $scope.logic.choice
            $scope.logic = _findLogic(nextTitNum);
            $scope.logic.choice = 0;
        }

        $scope.prev = function() {
            var prevTitNum = $scope.logic.titNum.substr(0, $scope.logic.titNum.lastIndexOf('.'));
            $scope.logic = _findLogic(prevTitNum);
            $scope.logic.choice = 0;
        }

        $scope.submit = function() {
            PlanServ.joinPlan(productCode, visitTime, resultJosn).then(function(resp) {
                console.log('join success')
            })
        }

        function _findLogic(titNum) {
            for (var i in _logicList) {
                if (titNum === _logicList[i].titNum) {
                    return _logicList[i];
                }
            }
        }
    });
})

.controller('ActCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('00', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('ActDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})

.controller('GameCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('03', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('GameDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})

.controller('HospitalCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('06', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('HospitalDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})

.controller('KnowledgeCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('04', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('KnowledgeDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})

.controller('MedicineCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('02', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('MedicineDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})

.controller('StoryCtrl', function($scope, $ionicHistory, $ionicPlatform, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reload('05', 1, 10).then(function(resp) {
            $scope.table = resp;
        })
    });
})

.controller('StoryDetailCtrl', function($scope, $ionicHistory, $ionicPlatform, $stateParams, DiscoverServ) {
    $scope.showHistoryBack = $ionicHistory.viewHistory().backView === null;
    $ionicPlatform.ready(function() {
        DiscoverServ.reloadDetail($stateParams.id).then(function(resp) {
            document.getElementById('remark').innerHTML = resp.remark;
        })
    });
})
