import type { StyleSheet } from 'jss';
import type { StaticStyles } from '../types';
interface SheetMeta {
    styles: StaticStyles;
    dynamicStyles: StaticStyles;
}
export declare const getMeta: (sheet: StyleSheet) => SheetMeta | void;
export declare const addMeta: (sheet: StyleSheet, meta: SheetMeta) => void;
export {};
