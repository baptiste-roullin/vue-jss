import { StyleSheetFactoryOptions } from 'jss';
import type { StyleSheet } from 'jss';
import type { Context, DynamicRules, Styles } from '../types';
interface Options<Theme> {
    context: Context;
    theme: Theme;
    name?: string;
    index: number;
    styles: Styles<Theme>;
    sheetOptions: StyleSheetFactoryOptions;
}
export declare const createStyleSheet: <Theme>(options: Options<Theme>) => any;
export declare const removeDynamicRules: (sheet: StyleSheet, rules: DynamicRules) => void;
export declare const updateDynamicRules: (data: any, sheet: StyleSheet, rules: DynamicRules) => void;
export declare const addDynamicRules: (sheet: any, data: any) => DynamicRules | null;
export {};
