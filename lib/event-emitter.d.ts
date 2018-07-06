import { IEventEmitter, Event } from './types';
import { Constructor, Base } from '@viewjs/utils';
/**event
 * Makes target, Base, an EventEmitter
 *
 * @export
 * @param {T} Base
 * @template
 * @returns {(Constructor<IEventEmitter> & T)}
 */
export declare function withEventEmitter<T extends Constructor<{}>>(Base: T): Constructor<IEventEmitter> & T;
declare const EventEmitter_base: Constructor<IEventEmitter> & typeof Base;
export declare class EventEmitter extends EventEmitter_base {
}
export declare namespace EventEmitter {
    /**
     * If true EventEmitter will call throwError, when when no listeners for the "error" event
     */
    var throwOnError: boolean;
    function throwError(error: Error): void;
    function executeListenerFunction(func: Event[], args?: any[]): void;
}
export {};
