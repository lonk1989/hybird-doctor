'use strict';
angular.module('starter.directives', [])

.directive('numToChar', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.numToChar, function(value) {
            elem.text(String.fromCharCode(65 + value) + '.' + elem.text());
        })
    }
})

.directive('wrapLine', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.wrapLine, function(value) {
            if (value) {
                elem.html('');
                var txt = value.split('\n')
                for (var i in txt) {
                    elem.append('<p>' + txt[i] + '</p>');
                }
            }
        })
    }
})

.directive('historyBackBtn', function() {
    
})
