import { ComputedRef } from 'vue';
import { Styles } from './styles';
import { Classes, GenerateId } from 'jss';
import { Theming } from './theming';
export interface StyleSheetFactoryOptions {
    media?: string;
    meta?: string;
    index?: number;
    link?: boolean;
    element?: HTMLStyleElement;
    generateId?: GenerateId;
    classNamePrefix?: string;
}
interface BaseOptions<Theme = DefaultTheme> extends StyleSheetFactoryOptions {
    index?: number;
    theming?: Theming<Theme>;
}
interface CreateUseStylesOptions<Theme = DefaultTheme> extends BaseOptions<Theme> {
    name?: string;
}
export interface DefaultTheme {
}
declare function createUseStyles<Theme = DefaultTheme, C extends string = string>(styles: Styles<Theme, {}, C>, options?: CreateUseStylesOptions<Theme>): (data?: unknown) => ComputedRef<Classes<C>>;
export default createUseStyles;
