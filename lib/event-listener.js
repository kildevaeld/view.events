"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("./event-emitter");
const helpers_1 = require("./helpers");
const utils_1 = require("@viewjs/utils");
function withEventListener(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this._listeningTo = void 0;
        }
        listenTo(obj, event, fn, ctx, once = false) {
            if (!helpers_1.isEventEmitter(obj)) {
                if (event_emitter_1.EventEmitter.throwOnError)
                    event_emitter_1.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                return this;
            }
            let listeningTo, id, meth;
            listeningTo = this._listeningTo || (this._listeningTo = {});
            id = obj.listenId || (obj.listenId = utils_1.uniqueId());
            listeningTo[id] = obj;
            meth = once ? 'once' : 'on';
            obj[meth](event, fn, ctx || this);
            return this;
        }
        listenToOnce(obj, event, fn, ctx) {
            return this.listenTo(obj, event, fn, ctx, true);
        }
        stopListening(obj, event, callback) {
            if (obj && !helpers_1.isEventEmitter(obj)) {
                if (event_emitter_1.EventEmitter.throwOnError)
                    event_emitter_1.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                return this;
            }
            let listeningTo = this._listeningTo;
            if (!listeningTo)
                return this;
            var remove = !event && !callback;
            if (!callback && typeof event === 'object')
                callback = this;
            if (obj)
                (listeningTo = {})[obj.listenId] = obj;
            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj.off(event, callback, this);
                if (remove || obj.listeners.size === 0)
                    delete this._listeningTo[id];
            }
            return this;
        }
        destroy() {
            if (typeof Base.prototype.destroy === 'function')
                Base.prototype.destroy.call(this);
            this.stopListening();
        }
    };
}
exports.withEventListener = withEventListener;
