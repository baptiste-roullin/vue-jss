import { Ref } from 'vue';
export interface Theming<Theme> {
    ThemeProvider: any;
    useTheme: () => Ref<Theme>;
    contextKey: string | Symbol;
}
declare const createTheming: <Theme>(contextKey: Symbol | string, defaultTheme: Theme) => Theming<Theme>;
declare const ThemeProvider: any, useTheme: () => Ref<{}>;
export { ThemeProvider, useTheme, createTheming };
