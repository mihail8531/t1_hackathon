import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const data = ref([
    [
        { value: '', label: 'IP-адрес', key: 'ip', pattern: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/ },
        {
            value: '',
            label: 'Порт',
            key: 'port',
            pattern: /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
        }
    ],
    [
        { value: '', label: 'Пользователь', key: 'user' },
        { value: '', label: 'Пароль', key: 'password' }
    ],
    [
        { value: '', label: 'База данных', key: 'db' }
        // { value: '', label: 'Схема', key: 'schema' },
        // { value: '', label: 'Таблица', key: 'table' }
    ]
]);
const sql = ref('');
function isValid(value, regExp) {
    return regExp && value ? regExp.test(value) : true;
}
function isConnectionButtonDisabled() {
    return data.value.some(row => row.some(item => !item.value || !isValid(item.value, item.pattern))) || !sql.value;
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
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
    for (const [row, i] of __VLS_getVForSourceType((__VLS_ctx.data))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, key: ((i)), });
        for (const [item] of __VLS_getVForSourceType((row))) {
            const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
            /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ key: ((item.key)), variant: ("on"), }));
            const __VLS_2 = __VLS_1({ key: ((item.key)), variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.InputText;
            /** @type { [typeof __VLS_components.InputText, ] } */
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ type: ("text"), modelValue: ((item.value)), ...{ style: ({}) }, invalid: ((!__VLS_ctx.isValid(item.value, item.pattern))), }));
            const __VLS_8 = __VLS_7({ type: ("text"), modelValue: ((item.value)), ...{ style: ({}) }, invalid: ((!__VLS_ctx.isValid(item.value, item.pattern))), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (item.label + (__VLS_ctx.isValid(item.value, item.pattern) ? '' : ' не валиден'));
            __VLS_nonNullable(__VLS_5.slots).default;
            var __VLS_5;
        }
    }
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
    /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ variant: ("on"), }));
    const __VLS_14 = __VLS_13({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.Textarea;
    /** @type { [typeof __VLS_components.Textarea, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ modelValue: ((__VLS_ctx.sql)), rows: ("3"), ...{ style: ({}) }, }));
    const __VLS_20 = __VLS_19({ modelValue: ((__VLS_ctx.sql)), rows: ("3"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ disabled: ((__VLS_ctx.isConnectionButtonDisabled())), label: ("Подключиться"), severity: ("success"), variant: ("text"), icon: ("pi pi-link"), raised: (true), }));
    const __VLS_26 = __VLS_25({ disabled: ((__VLS_ctx.isConnectionButtonDisabled())), label: ("Подключиться"), severity: ("success"), variant: ("text"), icon: ("pi pi-link"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
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
            Textarea: Textarea,
            Button: Button,
            data: data,
            sql: sql,
            isValid: isValid,
            isConnectionButtonDisabled: isConnectionButtonDisabled,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
