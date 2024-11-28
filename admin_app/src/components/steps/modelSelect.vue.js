import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { RAGServiceFork } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const __VLS_props = defineProps();
const emit = defineEmits();
const toast = useToast();
const APIkey = ref('');
const baseUrl = ref('');
async function submit() {
    const { success, data } = await RAGServiceFork.setAPIKey(baseUrl.value
        ? { llm_factory: 'OpenAI', api_key: APIkey.value, base_url: baseUrl.value }
        : { llm_factory: 'OpenAI', api_key: APIkey.value });
    console.log('Set key ', success, '\nRes" ', data);
    toast.add({
        severity: success ? 'success' : 'error',
        summary: success ? 'Токен доступа успешно зарегестрироан!' : 'Не удалось авторизоваться!',
        life: 3000
    });
    if (success)
        emit('update:modelValue', true);
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {
        ...{},
        ...{},
    };
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
    /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ variant: ("on"), }));
    const __VLS_2 = __VLS_1({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ type: ("text"), modelValue: ((__VLS_ctx.APIkey)), ...{ style: ({}) }, }));
    const __VLS_8 = __VLS_7({ type: ("text"), modelValue: ((__VLS_ctx.APIkey)), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
    /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ variant: ("on"), }));
    const __VLS_14 = __VLS_13({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ type: ("text"), modelValue: ((__VLS_ctx.baseUrl)), ...{ style: ({}) }, }));
    const __VLS_20 = __VLS_19({ type: ("text"), modelValue: ((__VLS_ctx.baseUrl)), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.APIkey || __VLS_ctx.modelValue)), label: ("Сохранить"), icon: ("pi pi-save"), }));
    const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.APIkey || __VLS_ctx.modelValue)), label: ("Сохранить"), icon: ("pi pi-save"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_30;
    const __VLS_31 = {
        onClick: (__VLS_ctx.submit)
    };
    let __VLS_27;
    let __VLS_28;
    var __VLS_29;
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FloatLabel: FloatLabel,
            InputText: InputText,
            Button: Button,
            APIkey: APIkey,
            baseUrl: baseUrl,
            submit: submit,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
