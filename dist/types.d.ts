import type { Jss, SheetsRegistry, SheetsManager, Rule, CreateGenerateIdOptions, GenerateId } from 'jss';
export interface Managers {
    [key: number]: SheetsManager;
}
export interface Context {
    jss?: Jss;
    registry?: SheetsRegistry;
    managers?: Managers;
    id?: CreateGenerateIdOptions;
    classNamePrefix?: string;
    disableStylesGeneration?: boolean;
    media?: string;
    generateId?: GenerateId;
}
export declare type Classes = {
    [key: string]: string;
};
export declare type InnerProps = {
    children?: Node;
    classes: Classes;
};
export declare type DynamicRules = {
    [key: string]: Rule;
};
export declare type StaticStyle = {};
export declare type DynamicStyle<Theme> = ({ theme: Theme }: any) => StaticStyle;
export declare type StaticStyles = {
    [key: string]: StaticStyle;
};
export declare type ThemedStyles<Theme> = (theme: Theme) => StaticStyle | DynamicStyle<Theme>;
export declare type Styles<Theme> = StaticStyles | ThemedStyles<Theme>;
