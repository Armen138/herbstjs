#!/usr/bin/node --harmony

//nodejs herbstclient client client.
var events = require('events');
var Reflect = require('harmony-reflect');
var spawn = require('child_process').spawn;
var Herbst = function(wm) {
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
    Herbst.wm = function(callback) {
        var wm = new events.EventEmitter();
        var hooks = spawn('herbstclient', ['--idle']);
        hooks.stdout.on('data', function(data) {
            var lines = ('' + data).split('\n');
            for(var i = 0; i < lines.length; i++) {
                var info = lines[i].split('\t');
                if(info[0] !== '') {
                    wm.emit.apply(wm, info);
                }
            }

        });
        hooks.on('error', function(err) {});
        hooks.on('close', function(code) {});
        callback(wm);
    };

    return herbstProxy;
};

module.exports = Herbst;
