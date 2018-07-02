import { IEventEmitter, IEventListener } from './types';

export interface Call {
    ctx?: any
    handler: (...args: any[]) => void;
}

export function callFunc(fn: Call[], args: any[] = []) {
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1],
        a3 = args[2], a4 = args[3], a5 = args[4];

    switch (args.length) {
        case 0: while (++i < l) fn[i].handler.call(fn[i].ctx); return;
        case 1: while (++i < l) fn[i].handler.call(fn[i].ctx, a1); return;
        case 2: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2); return;
        case 3: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3); return;
        case 4: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4); return;
        case 5: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5); return;
        default: while (++i < l) fn[i].handler.apply(fn[i].ctx, args); return;
    }
}

var idCounter = 0;
export function uniqueId(prefix: string = "") {
    return prefix + (++idCounter)
}

function isFunction(a: any): a is Function {
    return typeof a === 'function';
}

export function isEventEmitter(a: any): a is IEventEmitter {
    return a && ((isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
}

export function IsEventListener(a: any): a is IEventListener {
    return a && isFunction(a.listenTo) && isFunction(a.listenToOnce) && isFunction(a.stopListening);
}