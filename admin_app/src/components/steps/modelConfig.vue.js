import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { RAGServiceFork } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const __VLS_props = defineProps();
const emit = defineEmits();
const toast = useToast();
const LLMOptions = ref([]);
const LLMValue = ref(null);
const EmbeddingOptions = ref([]);
const EmbeddingValue = ref(null);
const tenantInfo = ref(null);
const loading = ref(true);
onMounted(async () => {
    const { success, data } = await RAGServiceFork.getAllModels();
    if (success) {
        for (const key in data.data) {
            data.data[key].forEach(model => {
                if (!model.available)
                    return;
                if (model.model_type === 'chat')
                    LLMOptions.value.push({ label: model.llm_name });
                else if (model.model_type === 'embedding')
                    EmbeddingOptions.value.push({ label: model.llm_name });
            });
        }
        const res = await RAGServiceFork.getUserModels();
        if (res.success && res.data.data) {
            tenantInfo.value = { id: res.data.data.tenant_id, name: res.data.data.name };
            const curLLMModel = LLMOptions.value.find(el => el.label === res.data?.data.llm_id);
            const curEmbeddingModel = EmbeddingOptions.value.find(el => el.label === res.data?.data.embd_id);
            if (curLLMModel)
                LLMValue.value = curLLMModel;
            if (curEmbeddingModel)
                EmbeddingValue.value = curEmbeddingModel;
        }
    }
    loading.value = false;
});
async function submit() {
    if (!tenantInfo.value || !LLMValue.value || !EmbeddingValue.value)
        return;
    const { success, data } = await RAGServiceFork.setUserModels({
        tenant_id: tenantInfo.value.id,
        name: tenantInfo.value.name,
        llm_id: LLMValue.value.label,
        embd_id: EmbeddingValue.value.label,
        img2txt_id: '',
        asr_id: '',
        rerank_id: '',
        tts_id: null
    });
    console.log('Set models: ', success, data);
    toast.add({
        severity: success && data.data ? 'success' : 'error',
        summary: success && data.data ? 'Модели успешно добавлены!' : 'при добавлении моделей произошла ошибка!',
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Select;
    /** @type { [typeof __VLS_components.Select, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ modelValue: ((__VLS_ctx.LLMValue)), options: ((__VLS_ctx.LLMOptions)), placeholder: ("Выберите языковую модель"), optionLabel: ("label"), ...{ style: ({}) }, }));
    const __VLS_2 = __VLS_1({ modelValue: ((__VLS_ctx.LLMValue)), options: ((__VLS_ctx.LLMOptions)), placeholder: ("Выберите языковую модель"), optionLabel: ("label"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Select;
    /** @type { [typeof __VLS_components.Select, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ modelValue: ((__VLS_ctx.EmbeddingValue)), options: ((__VLS_ctx.EmbeddingOptions)), placeholder: ("Выберите модель эмбединга"), optionLabel: ("label"), ...{ style: ({}) }, }));
    const __VLS_8 = __VLS_7({ modelValue: ((__VLS_ctx.EmbeddingValue)), options: ((__VLS_ctx.EmbeddingOptions)), placeholder: ("Выберите модель эмбединга"), optionLabel: ("label"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.LLMValue || !__VLS_ctx.EmbeddingValue || __VLS_ctx.modelValue)), label: ("Сохранить"), icon: ("pi pi-save"), }));
    const __VLS_14 = __VLS_13({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.LLMValue || !__VLS_ctx.EmbeddingValue || __VLS_ctx.modelValue)), label: ("Сохранить"), icon: ("pi pi-save"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_18;
    const __VLS_19 = {
        onClick: (__VLS_ctx.submit)
    };
    let __VLS_15;
    let __VLS_16;
    var __VLS_17;
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
            Select: Select,
            LLMOptions: LLMOptions,
            LLMValue: LLMValue,
            EmbeddingOptions: EmbeddingOptions,
            EmbeddingValue: EmbeddingValue,
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
