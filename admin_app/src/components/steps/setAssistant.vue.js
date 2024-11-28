import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import { useToast } from 'primevue/usetoast';
import { APIService, RAGServiceOrigin } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const emit = defineEmits();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const options = ref([]);
const value = ref(null);
const name = ref('');
const prompt = ref(`You are an intelligent assistant. Please summarize the content of the knowledge base to answer the question. Please list the data in the knowledge base and answer in detail. When all knowledge base content is irrelevant to the question, your answer must include the sentence "The answer you are looking for is not found in the knowledge base!" Answers need to consider chat history.
      Here is the knowledge base:
      {knowledge}
      The above is the knowledge base.`);
const loading = ref(true);
onMounted(async () => {
    if (!props.tokens)
        return;
    const { success, data } = await RAGServiceOrigin.getDatasets();
    if (success) {
        data.data.forEach(item => {
            options.value.push({ label: item.name, value: item.id });
        });
    }
    console.log('Datasets was loades: ', success, data);
});
async function submit() {
    if (!name.value || !value.value)
        return;
    const { success, data } = await RAGServiceOrigin.createAssistant({
        name: name.value,
        dataset_ids: value.value?.map(el => el.value)
    });
    toast.add({
        severity: success && data.data ? 'success' : 'error',
        summary: success && data.data
            ? `Асистент "${name.value}" был успешно создан!`
            : 'При создании асистента произошла ошибка!',
        life: 3000
    });
    if (success) {
        const windowResponse = await APIService.createWindow({ style: '', assistant_id: data.data.id });
        console.log('Create window: ', windowResponse);
        if (windowResponse.success) {
            localStorage.setItem('window_id', windowResponse.data.id.toString());
            localStorage.setItem('assistant_id', data.data.id);
            toast.add({
                severity: windowResponse.success && windowResponse.data ? 'success' : 'error',
                summary: windowResponse.success && windowResponse.data
                    ? 'Окно чата было успешно создано!'
                    : 'При создании окна произошла ошибка!',
                life: 3000
            });
            emit('update:modelValue', true);
        }
    }
    console.log('Create assistant: ', success, data);
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
    /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ variant: ("on"), }));
    const __VLS_2 = __VLS_1({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ type: ("text"), modelValue: ((__VLS_ctx.name)), ...{ style: ({}) }, }));
    const __VLS_8 = __VLS_7({ type: ("text"), modelValue: ((__VLS_ctx.name)), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.MultiSelect;
    /** @type { [typeof __VLS_components.MultiSelect, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ modelValue: ((__VLS_ctx.value)), options: ((__VLS_ctx.options)), placeholder: ("Выберите датасеты"), optionLabel: ("label"), ...{ style: ({}) }, }));
    const __VLS_14 = __VLS_13({ modelValue: ((__VLS_ctx.value)), options: ((__VLS_ctx.options)), placeholder: ("Выберите датасеты"), optionLabel: ("label"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.FloatLabel;
    /** @type { [typeof __VLS_components.FloatLabel, typeof __VLS_components.FloatLabel, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ variant: ("on"), }));
    const __VLS_20 = __VLS_19({ variant: ("on"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Textarea;
    /** @type { [typeof __VLS_components.Textarea, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ modelValue: ((__VLS_ctx.prompt)), rows: ("10"), ...{ style: ({}) }, }));
    const __VLS_26 = __VLS_25({ modelValue: ((__VLS_ctx.prompt)), rows: ("10"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_nonNullable(__VLS_23.slots).default;
    var __VLS_23;
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.name || !__VLS_ctx.value?.length)), label: ("Сохранить"), icon: ("pi pi-save"), }));
    const __VLS_32 = __VLS_31({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.name || !__VLS_ctx.value?.length)), label: ("Сохранить"), icon: ("pi pi-save"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_36;
    const __VLS_37 = {
        onClick: (__VLS_ctx.submit)
    };
    let __VLS_33;
    let __VLS_34;
    var __VLS_35;
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
            FloatLabel: FloatLabel,
            InputText: InputText,
            Textarea: Textarea,
            MultiSelect: MultiSelect,
            options: options,
            value: value,
            name: name,
            prompt: prompt,
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
