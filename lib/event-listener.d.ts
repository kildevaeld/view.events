import { IEventListener, Constructor } from './types';
export declare function withEventListener<T extends Constructor<{}>>(Base: T): Constructor<IEventListener> & T;
