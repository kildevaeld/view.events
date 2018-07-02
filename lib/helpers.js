"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function callFunc(fn, args = []) {
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx);
            return;
        case 1:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1);
            return;
        case 2:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2);
            return;
        case 3:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
            return;
        case 4:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
            return;
        case 5:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
            return;
        default:
            while (++i < l)
                fn[i].handler.apply(fn[i].ctx, args);
            return;
    }
}
exports.callFunc = callFunc;
var idCounter = 0;
function uniqueId(prefix = "") {
    return prefix + (++idCounter);
}
exports.uniqueId = uniqueId;
function isFunction(a) {
    return typeof a === 'function';
}
function isEventEmitter(a) {
    return a && ((isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
}
exports.isEventEmitter = isEventEmitter;
function IsEventListener(a) {
    return a && isFunction(a.listenTo) && isFunction(a.listenToOnce) && isFunction(a.stopListening);
}
exports.IsEventListener = IsEventListener;
