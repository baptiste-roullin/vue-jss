import * as CSS from 'csstype';
export {};
declare type JSSNormalCssProperties = CSS.Properties<number | string>;
export declare type PropsFunc<Props extends object, T> = (props: Props) => T;
/**
 * Allows the user to augment the properties available
 */
export interface BaseCSSProperties extends JSSNormalCssProperties {
}
export interface CSSProperties extends BaseCSSProperties {
    [k: string]: unknown | CSSProperties;
}
export declare type BaseCreateCSSProperties<Props extends object = {}> = {
    [P in keyof BaseCSSProperties]: BaseCSSProperties[P] | PropsFunc<Props, BaseCSSProperties[P]>;
};
export interface CreateCSSProperties<Props extends object = {}> extends BaseCreateCSSProperties<Props> {
    [k: string]: BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>] | CreateCSSProperties<Props>;
}
/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
export declare type StyleRules<Props extends object = {}, ClassKey extends string = string> = Record<ClassKey, CSSProperties | CreateCSSProperties<Props> | PropsFunc<Props, CreateCSSProperties<Props>>>;
/**
 * @internal
 */
export declare type StyleRulesCallback<Theme, Props extends object, ClassKey extends string = string> = (theme: Theme) => StyleRules<Props, ClassKey>;
export declare type Styles<Theme, Props extends object, ClassKey extends string = string> = StyleRules<Props, ClassKey> | StyleRulesCallback<Theme, Props, ClassKey>;
export declare type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
