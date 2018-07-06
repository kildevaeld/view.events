import { IEventListener } from './types';
import { Constructor } from '@viewjs/utils';
export declare function withEventListener<T extends Constructor<{}>>(Base: T): Constructor<IEventListener> & T;
