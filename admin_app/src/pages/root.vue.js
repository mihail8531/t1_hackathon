import { ref, shallowRef } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import FilesUploader from '@/components/filesUploader.vue';
import ConnectToSQL from '@/components/connectToSQL.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const options = ref([
    { label: 'Загрузить файлы', component: shallowRef(FilesUploader) },
    { label: 'Подключиться к SQL базе данных', component: shallowRef(ConnectToSQL) }
]);
const value = ref(options.value[0]);
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.container)) }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.SelectButton;
    /** @type { [typeof __VLS_components.SelectButton, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ modelValue: ((__VLS_ctx.value)), options: ((__VLS_ctx.options)), optionLabel: ("label"), unselectable: ((false)), multiple: ((false)), }));
    const __VLS_2 = __VLS_1({ modelValue: ((__VLS_ctx.value)), options: ((__VLS_ctx.options)), optionLabel: ("label"), unselectable: ((false)), multiple: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Divider;
    /** @type { [typeof __VLS_components.Divider, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = ((__VLS_ctx.value.component));
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
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
            SelectButton: SelectButton,
            Divider: Divider,
            options: options,
            value: value,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
