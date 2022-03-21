import { Ref } from 'vue';
import type { Context as JssContextValue } from './types';
export declare const defaultContextValue: JssContextValue;
declare const JssContext: unique symbol;
export declare function injectJssContext(): Ref<JssContextValue>;
export default JssContext;
