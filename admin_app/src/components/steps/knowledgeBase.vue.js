import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import FilesUploader from '../filesUploader.vue';
import { RAGServiceOrigin } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const toast = useToast();
const options = ref([]);
const value = ref(null);
const loading = ref(true);
onMounted(async () => {
    if (!props.tokens)
        return;
    const { success, data } = await RAGServiceOrigin.getDatasets();
    if (success) {
        data.data.forEach(item => {
            options.value.push({ label: item.name });
        });
    }
    console.log('Datasets was loaded: ', success, data);
});
async function submit() { }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    // @ts-ignore
    [FilesUploader,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(FilesUploader, new FilesUploader({ tokens: (__VLS_ctx.tokens), }));
    const __VLS_1 = __VLS_0({ tokens: (__VLS_ctx.tokens), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
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
            FilesUploader: FilesUploader,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
