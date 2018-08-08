import { withEventEmitter } from './event-emitter';
import { withEventListener } from './event-listener';
import { IEventEmitter, IEventListener } from './types';
import { Base } from '@viewjs/utils';


export class EventEmitterListener extends withEventListener(withEventEmitter(Base)) implements IEventEmitter, IEventListener { }