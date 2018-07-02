import { IEventEmitter, IEventListener } from './types';
export interface Call {
    ctx?: any;
    handler: (...args: any[]) => void;
}
export declare function callFunc(fn: Call[], args?: any[]): void;
export declare function uniqueId(prefix?: string): string;
export declare function isEventEmitter(a: any): a is IEventEmitter;
export declare function IsEventListener(a: any): a is IEventListener;
