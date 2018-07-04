import { IEventEmitter, Constructor } from './types';
import { EventEmitter } from './event-emitter';
export interface EventConstructor<T> {
    new (...args: any[]): T;
    prototype: T;
}
export interface TypedEventHandler<T> {
    (e: T): void;
}
export interface ITypedEventEmitter {
    on<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    once<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    off<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    trigger<T>(e: T | string, ...args: any[]): this;
}
export declare function withTypedEventEmitter<T extends Constructor<IEventEmitter>>(Base: T): T & Constructor<ITypedEventEmitter>;
declare const TypedEventEmitter_base: typeof EventEmitter & Constructor<ITypedEventEmitter>;
export declare class TypedEventEmitter extends TypedEventEmitter_base {
}
export {};
