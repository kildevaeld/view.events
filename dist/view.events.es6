import { callFunc, Base, isFunction, uniqueId } from '@viewjs/utils';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function removeFromListener(listeners, fn, ctx) {
    for (var i = 0; i < listeners.length; i++) {
        var e = listeners[i];
        if (fn == null && ctx != null && e.ctx === ctx || fn != null && ctx == null && e.handler === fn || fn != null && ctx != null && e.handler === fn && e.ctx === ctx) {
            listeners.splice(i, 1);
        }
    }
    return listeners;
}
/**event
 * Makes target, Base, an EventEmitter
 *
 * @export
 * @param {T} Base
 * @template
 * @returns {(Constructor<IEventEmitter> & T)}
 */
function withEventEmitter(Base$$1) {
    return function (_Base) {
        inherits(_class, _Base);

        function _class() {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

            _this._listeners = void 0;
            return _this;
        }

        createClass(_class, [{
            key: 'on',
            value: function on(event, fn, ctx) {
                var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                var events = (this._listeners || (this._listeners = new Map())).get(event) || [];
                events.push({
                    name: event,
                    once: once,
                    handler: fn,
                    ctx: ctx || this
                });
                if (!this._listeners.has(event)) this._listeners.set(event, events);
                return this;
            }
        }, {
            key: 'once',
            value: function once(event, fn, ctx) {
                return this.on(event, fn, ctx, true);
            }
        }, {
            key: 'off',
            value: function off(eventName, fn, ctx) {
                this._listeners = this._listeners || new Map();
                if (eventName == null && ctx == null) {
                    this._listeners = new Map();
                } else if (this._listeners.has(eventName)) {
                    var events = this._listeners.get(eventName);
                    if (fn == null && ctx == null) {
                        this._listeners.set(eventName, []);
                    } else {
                        removeFromListener(events, fn, ctx);
                    }
                } else {
                    this._listeners.forEach(function (value) {
                        removeFromListener(value, fn, ctx);
                    });
                }
                return this;
            }
        }, {
            key: 'trigger',
            value: function trigger(eventName) {
                this._listeners = this._listeners || new Map();
                var events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);
                var index = void 0;
                var calls = [];
                var alls = [];
                for (var i = 0, ii = events.length; i < ii; i++) {
                    if (events[i].name === '*') {
                        alls.push(events[i]);
                    } else {
                        calls.push(events[i]);
                    }
                    if (events[i].once === true) {
                        index = this._listeners.get(events[i].name).indexOf(events[i]);
                        this._listeners.get(events[i].name).splice(index, 1);
                    }
                }

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                if (alls.length) {
                    this._executeListener(alls, [eventName].concat(args));
                }
                if (calls.length) this._executeListener(calls, args);
                // Handle errors event
                else if (eventName === 'error' && EventEmitter.throwOnError) {
                        if (args.length) {
                            var a = args[0];
                            if (!(a instanceof Error)) {
                                a = new Error(String(a));
                            }
                            EventEmitter.throwError(a);
                        }
                    }
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (typeof Base$$1.prototype.destroy === 'function') Base$$1.prototype.destroy.call(this);
                this.off();
            }
        }, {
            key: '_executeListener',
            value: function _executeListener(func, args) {
                EventEmitter.executeListenerFunction(func, args);
            }
        }, {
            key: 'listeners',
            get: function get$$1() {
                return this._listeners;
            }
        }]);
        return _class;
    }(Base$$1);
}

var EventEmitter = function (_withEventEmitter) {
    inherits(EventEmitter, _withEventEmitter);

    function EventEmitter() {
        classCallCheck(this, EventEmitter);
        return possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).apply(this, arguments));
    }

    return EventEmitter;
}(withEventEmitter(Base));

(function (EventEmitter) {
    /**
     * If true EventEmitter will call throwError, when when no listeners for the "error" event
     */
    EventEmitter.throwOnError = false;
    function throwError(error) {
        throw error;
    }
    EventEmitter.throwError = throwError;
    function executeListenerFunction(func, args) {
        callFunc(func, args);
    }
    EventEmitter.executeListenerFunction = executeListenerFunction;
})(EventEmitter || (EventEmitter = {}));

function isEventEmitter(a) {
    return a && isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger);
}
function IsEventListener(a) {
    return a && isFunction(a.listenTo) && isFunction(a.listenToOnce) && isFunction(a.stopListening);
}

function withEventListener(Base$$1) {
    return function (_Base) {
        inherits(_class, _Base);

        function _class() {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

            _this._listeningTo = void 0;
            return _this;
        }

        createClass(_class, [{
            key: 'listenTo',
            value: function listenTo(obj, event, fn, ctx) {
                var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

                if (!isEventEmitter(obj)) {
                    if (EventEmitter.throwOnError) EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                    return this;
                }
                var listeningTo = void 0,
                    id = void 0,
                    meth = void 0;
                listeningTo = this._listeningTo || (this._listeningTo = {});
                id = obj.listenId || (obj.listenId = uniqueId());
                listeningTo[id] = obj;
                meth = once ? 'once' : 'on';
                obj[meth](event, fn, ctx || this);
                return this;
            }
        }, {
            key: 'listenToOnce',
            value: function listenToOnce(obj, event, fn, ctx) {
                return this.listenTo(obj, event, fn, ctx, true);
            }
        }, {
            key: 'stopListening',
            value: function stopListening(obj, event, callback) {
                if (obj && !isEventEmitter(obj)) {
                    if (EventEmitter.throwOnError) EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                    return this;
                }
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !event && !callback;
                if (!callback && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') callback = this;
                if (obj) (listeningTo = {})[obj.listenId] = obj;
                for (var id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(event, callback, this);
                    if (remove || obj.listeners.size === 0) delete this._listeningTo[id];
                }
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (typeof Base$$1.prototype.destroy === 'function') Base$$1.prototype.destroy.call(this);
                this.stopListening();
            }
        }]);
        return _class;
    }(Base$$1);
}

export { withEventEmitter, EventEmitter, withEventListener, isEventEmitter, IsEventListener };
