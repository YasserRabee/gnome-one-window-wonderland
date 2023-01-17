const Meta = imports.gi.Meta;

let windowCreatedId;
const _gap = 20;

function init() {
}

function enable() {
    windowCreatedId = global.display.connect('window-created', onWindowCreated);
}

function disable() {
    global.display.disconnect(windowCreatedId);
}

function onWindowCreated(_, win) {
    const act = win.get_compositor_private();
    const id = act.connect('first-frame', _ => {
        resizeWindow(win);
        act.disconnect(id);
    });
}

function resizeWindow(win) {
    const monitor = win.get_monitor();
    const workspace = win.get_workspace();
    const monitorWorkArea = workspace.get_work_area_for_monitor(monitor);

    const x = monitorWorkArea.x + _gap;
    const y = monitorWorkArea.y + _gap;
    const w = monitorWorkArea.width - (2 * _gap);
    const h = monitorWorkArea.height - (2 * _gap);

    win.unmaximize(Meta.MaximizeFlags.BOTH);
    win.move_resize_frame(false, x, y, w, h);
}

