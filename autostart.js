#!/usr/bin/node --harmony


var MAX_TAGS = 9;
var mod = 'Mod4';
var alt = 'Mod1';

var Herbst = require('./herbst');
var herbst = new Herbst();

herbst.emit_hook('reload');
herbst.keyunbind('--all');

var key = function(binding, command) {
    return binding.join('-') + ' ' + command;
};

herbst.keybind(key([mod, 'Shift', 'q'], 'quit'));
herbst.keybind(key([mod, 'Shift', 'r'], 'reload'));
herbst.keybind(key([mod, 'Shift', 'c'], 'close'));
herbst.keybind(key([mod, 'BackSpace'], 'remove'));
herbst.keybind(key([mod, 's'], 'split horizontal 0.5'));
herbst.keybind(key([mod, 'Shift', 's'], 'split vertical 0.5'));

herbst.keybind(key([mod, 'q'], 'cycle_layout +1 grid max'));

herbst.keybind(key([mod, 'Left'], 'focus left'));
herbst.keybind(key([mod, 'Right'], 'focus right'));
herbst.keybind(key([mod, 'Up'], 'focus up'));
herbst.keybind(key([mod, 'Down'], 'focus down'));
herbst.keybind(key([mod, 'Tab'], 'cycle'));

herbst.keybind(key([mod, 'Shift', 'Right'], 'resize right +0.05'));
herbst.keybind(key([mod, 'Shift', 'Left'], 'resize left +0.05'));
herbst.keybind(key([mod, 'Shift', 'Up'], 'resize up +0.05'));
herbst.keybind(key([mod, 'Shift', 'Down'], 'resize down +0.05'));

herbst.keybind(key([alt, 'Ctrl', 'Right'], 'shift right'));
herbst.keybind(key([alt, 'Ctrl', 'Left'], 'shift left'));
herbst.keybind(key([alt, 'Ctrl', 'Up'], 'shift up'));
herbst.keybind(key([alt, 'Ctrl', 'Down'], 'shift down'));
herbst.keybind(key([alt, 'F1'], 'spawn urxvt'));
herbst.keybind(key([alt, 'F2'], 'spawn gmrun'));
herbst.keybind(key([alt, 'F3'], 'spawn dwb'));
herbst.keybind(key(['Print'], 'use 1'));
herbst.keybind(key(['Scroll_Lock'], 'use 2'));
herbst.keybind(key(['Pause'], 'use 3'));
herbst.keybind(key([mod, 'space'], 'fullscreen'));
herbst.default_frame_layout = 2;

herbst.rule('--class~[Gg]mrun --pseudotile=on --focus=on');

for(var i = 1; i < MAX_TAGS; i++) {
    herbst.add(i);
    herbst.keybind(key([mod, i], 'use ' + i));
    herbst.keybind(key([mod, 'Shift', i], 'move ' + i));
}

herbst.use(1);

//colors and such and stuff
herbst.frame_gap = 0;
herbst.window_gap = 0;
herbst.frame_border_normal_color = '#566830';
herbst.window_border_active_color = '#89D800';
herbst.frame_border_active_color = '#566830';
herbst.frame_border_inner_color = '#43791F';
herbst.window_border_normal_color = '#000000';
herbst.window_border_inner_color = '#000000';
herbst.frame_border_width = 1;
herbst.window_border_width = 2;
herbst.frame_bg_transparent = 1;




//some things we might as well start from here.
//herbst.spawn('xcompmgr');
herbst.spawn('xsetroot -cursor_name left_ptr');
herbst.spawn('sshfs drop.armen138.com:/home/armen /home/armen/drop');
herbst.spawn('nitrogen --restore');
