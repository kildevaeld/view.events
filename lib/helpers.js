"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
function isEventEmitter(a) {
    return a && ((utils_1.isFunction(a.on) && utils_1.isFunction(a.once) && utils_1.isFunction(a.off) && utils_1.isFunction(a.trigger)));
}
exports.isEventEmitter = isEventEmitter;
function IsEventListener(a) {
    return a && utils_1.isFunction(a.listenTo) && utils_1.isFunction(a.listenToOnce) && utils_1.isFunction(a.stopListening);
}
exports.IsEventListener = IsEventListener;
