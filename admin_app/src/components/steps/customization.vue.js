import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import ColorPicker from 'primevue/colorpicker';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { APIService } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const router = useRouter();
const props = defineProps();
const emit = defineEmits();
const style = ref([
    { title: 'Цвет рамки сообщения', field: 'message-bg-color', value: '' },
    { title: 'Цвет шрифта сообщения', field: 'message-text-color', value: '' },
    { title: 'Цвет фона', field: 'chat-bg-color', value: '' }
]);
const toast = useToast();
const loading = ref(true);
const regExp = /^[A-Fa-f0-9]{6}$/;
function isValid(value) {
    return value ? regExp.test(value) : true;
}
function isSaveButtonDisabled() {
    return style.value.some(item => !isValid(item.value));
}
async function submit() {
    loading.value = true;
    const window_id = localStorage.getItem('window_id');
    const assistant_id = localStorage.getItem('assistant_id');
    if (!window_id || !assistant_id)
        return;
    const { success, data } = await APIService.updateWindow({
        style: JSON.stringify(style.value.reduce((acc, item) => {
            acc[item.field] = item.value;
            return acc;
        }, {})),
        assistant_id
    }, window_id);
    toast.add({
        severity: success && data ? 'success' : 'error',
        summary: success && data ? 'Окно чата было успешно обновлено!' : 'При обновлении окна произошла ошибка!',
        life: 3000
    });
    loading.value = false;
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.style))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((item.title)), ...{ style: ({}) }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
        /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ variant: ("on"), }));
        const __VLS_2 = __VLS_1({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.InputText;
        /** @type { [typeof __VLS_components.InputText, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ type: ("text"), modelValue: ((item.value)), invalid: ((!__VLS_ctx.isValid(item.value))), ...{ style: ({}) }, }));
        const __VLS_8 = __VLS_7({ type: ("text"), modelValue: ((item.value)), invalid: ((!__VLS_ctx.isValid(item.value))), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (item.title);
        __VLS_nonNullable(__VLS_5.slots).default;
        var __VLS_5;
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.ColorPicker;
        /** @type { [typeof __VLS_components.ColorPicker, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ modelValue: ((item.value)), }));
        const __VLS_14 = __VLS_13({ modelValue: ((item.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.isSaveButtonDisabled())), label: ("Сохранить"), icon: ("pi pi-save"), }));
    const __VLS_20 = __VLS_19({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.isSaveButtonDisabled())), label: ("Сохранить"), icon: ("pi pi-save"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_24;
    const __VLS_25 = {
        onClick: (__VLS_ctx.submit)
    };
    let __VLS_21;
    let __VLS_22;
    var __VLS_23;
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
            Button: Button,
            ColorPicker: ColorPicker,
            FloatLabel: FloatLabel,
            InputText: InputText,
            style: style,
            isValid: isValid,
            isSaveButtonDisabled: isSaveButtonDisabled,
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
