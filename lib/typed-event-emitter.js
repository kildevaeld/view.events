"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("./event-emitter");
function withTypedEventEmitter(Base) {
    return class extends Base {
        on(e, callback, ctx) {
            return super.on(name, callback, ctx);
        }
        once(e, callback, ctx) {
            return super.once(name, callback, ctx);
        }
        off(e, callback, ctx) {
            return super.off(name, callback, ctx);
        }
        trigger(e, ...args) {
            if (typeof e === 'string') {
                return super.trigger(e, ...args);
            }
            if (e.constructor) {
                return super.trigger(e.constructor, e);
            }
            return this;
        }
    };
}
exports.withTypedEventEmitter = withTypedEventEmitter;
class TypedEventEmitter extends withTypedEventEmitter(event_emitter_1.EventEmitter) {
}
exports.TypedEventEmitter = TypedEventEmitter;
