#!/usr/bin/node --harmony

//nodejs herbstclient client client.
var Reflect = require('harmony-reflect');
var spawn = require('child_process').spawn;
var Herbst = function() {
    var herbst = {
        raw: function(command, callback) {
            var client = spawn('herbstclient', command.split(' '));
            var output = '';
            client.stdout.on('data', function(data) {
                output += data;
            });
            client.on('close', function(code) {
                if(typeof(callback) !== 'undefined') {
                    callback(output);
                }
            });
        },
        focus: function(direction, callback) {
            herbst.raw('focus ' + direction, callback);
        }
    };
    var herbstProxy = new Proxy({}, {
        get: function(target, name) {
            return function(data, callback) {
                herbst.raw(name + ' ' + data, callback);
            };
        },
        set: function(target, name, value) {
            herbst.raw('set ' + name + ' ' + value);
        }
    });
    return herbstProxy;
};

//var herbst = new Herbst();

//herbst.focus('right', function(data) { console.log(data); });

module.exports = Herbst;
