import type { StyleSheet, Classes } from 'jss';
import type { DynamicRules } from '../types';
declare const getSheetClasses: (sheet: StyleSheet, dynamicRules: DynamicRules) => Classes<string>;
export default getSheetClasses;
