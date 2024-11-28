import { onMounted, ref } from 'vue';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import BaseLayout from './components/layouts/base.vue';
import modelSelect from './components/steps/modelSelect.vue';
import modelConfig from './components/steps/modelConfig.vue';
import knowledgeBase from './components/steps/knowledgeBase.vue';
import setAssistant from './components/steps/setAssistant.vue';
import customization from './components/steps/customization.vue';
import { authService, RAGServiceOrigin, RAGServiceFork } from './services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const curStep = ref(4);
const list = ref([
    { step: 1, done: false, title: 'Выбор модели', component: modelSelect },
    { step: 2, done: false, title: 'Настройка модели', component: modelConfig },
    { step: 3, done: true, title: 'Настройка базы знаний', component: knowledgeBase },
    { step: 4, done: false, title: 'Выбор асистента', component: setAssistant },
    { step: 5, done: false, title: 'Кастомизация', component: customization }
]);
const loading = ref(true);
const tokens = ref(null);
onMounted(async () => {
    const { success, data } = await authService.getTokens();
    if (success) {
        RAGServiceFork.setHeader('Authorization', data.auth_key);
        RAGServiceOrigin.setHeader('Authorization', 'Bearer ' + data.api_key);
        tokens.value = data;
    }
    loading.value = false;
});
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
    let __VLS_resolvedLocalAndGlobalComponents;
    // @ts-ignore
    [BaseLayout, BaseLayout,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseLayout, new BaseLayout({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    if (!__VLS_ctx.loading) {
        const __VLS_5 = __VLS_resolvedLocalAndGlobalComponents.Stepper;
        /** @type { [typeof __VLS_components.Stepper, typeof __VLS_components.Stepper, ] } */
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ value: ((__VLS_ctx.curStep)), ...{ style: ({}) }, linear: (true), }));
        const __VLS_7 = __VLS_6({ value: ((__VLS_ctx.curStep)), ...{ style: ({}) }, linear: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        const __VLS_11 = __VLS_resolvedLocalAndGlobalComponents.StepList;
        /** @type { [typeof __VLS_components.StepList, typeof __VLS_components.StepList, ] } */
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
        const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
        for (const [step] of __VLS_getVForSourceType((__VLS_ctx.list))) {
            const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.Step;
            /** @type { [typeof __VLS_components.Step, typeof __VLS_components.Step, ] } */
            // @ts-ignore
            const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({ key: ((step.step)), value: ((step.step)), }));
            const __VLS_19 = __VLS_18({ key: ((step.step)), value: ((step.step)), }, ...__VLS_functionalComponentArgsRest(__VLS_18));
            (step.title);
            __VLS_nonNullable(__VLS_22.slots).default;
            var __VLS_22;
        }
        __VLS_nonNullable(__VLS_16.slots).default;
        var __VLS_16;
        const __VLS_23 = __VLS_resolvedLocalAndGlobalComponents.StepPanels;
        /** @type { [typeof __VLS_components.StepPanels, typeof __VLS_components.StepPanels, ] } */
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
        const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
        for (const [panel] of __VLS_getVForSourceType((__VLS_ctx.list))) {
            const __VLS_29 = __VLS_resolvedLocalAndGlobalComponents.StepPanel;
            /** @type { [typeof __VLS_components.StepPanel, typeof __VLS_components.StepPanel, ] } */
            // @ts-ignore
            const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({ key: ((panel.step)), value: ((panel.step)), ...{ style: ({}) }, }));
            const __VLS_31 = __VLS_30({ key: ((panel.step)), value: ((panel.step)), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
            {
                const { default: __VLS_thisSlot } = __VLS_nonNullable(__VLS_34.slots);
                const [{ activateCallback }] = __VLS_getSlotParams(__VLS_thisSlot);
                if (__VLS_ctx.curStep === panel.step) {
                    const __VLS_35 = ((panel.component));
                    // @ts-ignore
                    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ modelValue: ((panel.done)), tokens: (__VLS_ctx.tokens), }));
                    const __VLS_37 = __VLS_36({ modelValue: ((panel.done)), tokens: (__VLS_ctx.tokens), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                }
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
                if (panel.step !== __VLS_ctx.list[0].step) {
                    const __VLS_41 = __VLS_resolvedLocalAndGlobalComponents.Button;
                    /** @type { [typeof __VLS_components.Button, ] } */
                    // @ts-ignore
                    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({ ...{ 'onClick': {} }, label: ("Вернуться"), severity: ("secondary"), icon: ("pi pi-arrow-left"), }));
                    const __VLS_43 = __VLS_42({ ...{ 'onClick': {} }, label: ("Вернуться"), severity: ("secondary"), icon: ("pi pi-arrow-left"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                    let __VLS_47;
                    const __VLS_48 = {
                        onClick: (...[$event]) => {
                            if (!((!__VLS_ctx.loading)))
                                return;
                            if (!((panel.step !== __VLS_ctx.list[0].step)))
                                return;
                            activateCallback(panel.step - 1);
                        }
                    };
                    let __VLS_44;
                    let __VLS_45;
                    var __VLS_46;
                }
                if (panel.step !== __VLS_ctx.list.at(-1)?.step) {
                    const __VLS_49 = __VLS_resolvedLocalAndGlobalComponents.Button;
                    /** @type { [typeof __VLS_components.Button, ] } */
                    // @ts-ignore
                    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({ ...{ 'onClick': {} }, disabled: ((!panel.done)), label: ("Дальше"), iconPos: ("right"), icon: ("pi pi-arrow-right"), ...{ style: ({}) }, }));
                    const __VLS_51 = __VLS_50({ ...{ 'onClick': {} }, disabled: ((!panel.done)), label: ("Дальше"), iconPos: ("right"), icon: ("pi pi-arrow-right"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_50));
                    let __VLS_55;
                    const __VLS_56 = {
                        onClick: (...[$event]) => {
                            if (!((!__VLS_ctx.loading)))
                                return;
                            if (!((panel.step !== __VLS_ctx.list.at(-1)?.step)))
                                return;
                            activateCallback(panel.step + 1);
                        }
                    };
                    let __VLS_52;
                    let __VLS_53;
                    var __VLS_54;
                }
                __VLS_nonNullable(__VLS_34.slots)['' /* empty slot name completion */];
            }
            var __VLS_34;
        }
        __VLS_nonNullable(__VLS_28.slots).default;
        var __VLS_28;
        __VLS_nonNullable(__VLS_10.slots).default;
        var __VLS_10;
    }
    __VLS_nonNullable(__VLS_4.slots).default;
    var __VLS_4;
    const __VLS_57 = __VLS_resolvedLocalAndGlobalComponents.Toast;
    /** @type { [typeof __VLS_components.Toast, ] } */
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
    const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
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
            Stepper: Stepper,
            StepList: StepList,
            StepPanels: StepPanels,
            Step: Step,
            StepPanel: StepPanel,
            Button: Button,
            Toast: Toast,
            BaseLayout: BaseLayout,
            curStep: curStep,
            list: list,
            loading: loading,
            tokens: tokens,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
