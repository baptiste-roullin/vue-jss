import { PropType } from 'vue';
import { Jss, GenerateId, SheetsRegistry, CreateGenerateIdOptions } from 'jss';
declare const JssProvider: import("vue").DefineComponent<{
    jss: {
        type: PropType<Jss>;
        required: false;
    };
    registry: {
        type: PropType<SheetsRegistry>;
        required: false;
    };
    generateId: {
        type: PropType<GenerateId>;
        required: false;
    };
    classNamePrefix: {
        type: StringConstructor;
        required: false;
    };
    disableStylesGeneration: {
        type: BooleanConstructor;
    };
    media: {
        type: StringConstructor;
    };
    id: {
        type: PropType<CreateGenerateIdOptions>;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    jss: {
        type: PropType<Jss>;
        required: false;
    };
    registry: {
        type: PropType<SheetsRegistry>;
        required: false;
    };
    generateId: {
        type: PropType<GenerateId>;
        required: false;
    };
    classNamePrefix: {
        type: StringConstructor;
        required: false;
    };
    disableStylesGeneration: {
        type: BooleanConstructor;
    };
    media: {
        type: StringConstructor;
    };
    id: {
        type: PropType<CreateGenerateIdOptions>;
    };
}>>, {
    disableStylesGeneration: boolean;
}>;
export default JssProvider;
