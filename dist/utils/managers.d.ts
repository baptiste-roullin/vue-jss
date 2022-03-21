import { StyleSheet } from 'jss';
import type { Context } from '../types';
declare type Options<Theme> = {
    sheet: StyleSheet;
    context: Context;
    index: number;
    theme: Theme;
};
export declare const getManager: (context: Context, managerId: number) => any;
export declare const manageSheet: <Theme>(options: Options<Theme>) => void;
export declare const unmanageSheet: <Theme>(options: Options<Theme>) => void;
export {};
