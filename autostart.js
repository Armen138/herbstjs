#!/usr/bin/node --harmony

var Herbst = require('./herbst');

var herbst = new Herbst();

herbst.emit_hook('reload');
herbst.keyunbind('--all');
var mod = 'Mod4';

var key = function(binding, command) {
    return binding.join('-') + ' ' + command;
};

herbst.keybind(key([mod, 'Shift', 'q'], 'quit'));
herbst.keybind(key([mod, 'Shift', 'r'], 'reload'));
herbst.keybind(key([mod, 'Shift', 'c'], 'close'));
herbst.keybind(key([mod, 's'], 'split horizontal 0.5'));
herbst.keybind(key([mod, 'Shift', 's'], 'split vertical 0.5'));

herbst.keybind(key([mod, 'q'], 'set_layout grid'));
herbst.keybind(key([mod, 'w'], 'set_layout max'));

herbst.keybind(key([mod, 'Left'], 'focus left'));
herbst.keybind(key([mod, 'Right'], 'focus right'));
herbst.keybind(key([mod, 'Up'], 'focus up'));
herbst.keybind(key([mod, 'Down'], 'focus down'));
herbst.keybind(key([mod, 'Tab'], 'cycle'));

herbst.keybind(key(['Mod1', 'F2'], 'spawn chromium'));

herbst.default_frame_layout = 2;

