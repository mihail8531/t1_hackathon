import { ref } from 'vue';
import { useDropZone } from '@vueuse/core';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import { usePrimeVue } from 'primevue/config';
import { useToast } from 'primevue/usetoast';
import { APIService, RAGServiceFork, RAGServiceOrigin } from '@/services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const toast = useToast();
const props = defineProps();
const $primevue = usePrimeVue();
const input = ref();
const dropZone = ref();
const loading = ref(false);
const files = ref(null);
const name = ref('');
function onDrop(e) {
    if (e && Array.isArray(files.value))
        e.forEach(file => files.value.push(file));
    else if (!files.value)
        files.value = e;
}
const { isOverDropZone } = useDropZone(dropZone, {
    onDrop,
    // specify the types of data to be received.
    //   dataTypes: ['image/jpeg'],
    // control multi-file drop
    multiple: true,
    // whether to prevent default behavior for unhandled events
    preventDefaultForUnhandled: false
});
function manualUpload(e) {
    if (e.target instanceof HTMLInputElement && e.target.files instanceof FileList)
        onDrop(Array.from(e.target.files));
}
function removeFile(index) {
    files.value?.splice(index, 1);
}
function getFileSize(file) {
    if (!file.size || !Array.isArray($primevue.config.locale?.fileSizeTypes))
        return 'н/д';
    const sizes = $primevue.config.locale.fileSizeTypes;
    const i = Math.floor(Math.log(file.size) / Math.log(1024));
    const formattedSize = parseFloat((file.size / Math.pow(1024, i)).toFixed(2));
    return `${formattedSize} ${sizes[i]}`;
}
async function submit() {
    loading.value = true;
    const { success, data } = await RAGServiceOrigin.setDataset({ name: name.value });
    toast.add({
        severity: success && data.data ? 'success' : 'error',
        summary: success && data.data ? 'Датасет был успешно создан!' : 'При создании датасета произошла ошибка!',
        life: 3000
    });
    if (success && files.value) {
        const formData = new FormData();
        const params = new URLSearchParams();
        formData.append('file', files.value[0]);
        params.append('filename', files.value[0].name);
        params.append('description', '');
        params.append('language', 'English');
        params.append('permission', 'team');
        params.append('chunk_method', 'naive');
        params.append('dataset_id', data.data.id);
        const res = await APIService.uploadFile(formData, params);
        toast.add({
            severity: res.success && res.data ? 'success' : 'error',
            summary: res.success && res.data ? 'Файл был успешно загружен!' : 'При загрузке файла произошла ошибка!',
            life: 3000
        });
        if (res.success) {
            const runResponse = await RAGServiceFork.runDocument({ doc_ids: res.data.docs, run: 1 });
            toast.add({
                severity: res.success && res.data ? 'success' : 'error',
                summary: res.success && res.data ? 'Файл был успешно обработан!' : 'При обработке файла произошла ошибка!',
                life: 3000
            });
            console.log('Run response: ', runResponse);
        }
        console.log('File was uploaded: ', res);
    }
    console.log('Dataset waas created: ', success, data);
    loading.value = false;
}
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.header)) }, });
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
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ 'onClick': {} }, label: ("Добавить файл"), severity: ("info"), variant: ("text"), icon: ("pi pi-upload"), raised: (true), }));
    const __VLS_14 = __VLS_13({ ...{ 'onClick': {} }, label: ("Добавить файл"), severity: ("info"), variant: ("text"), icon: ("pi pi-upload"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_18;
    const __VLS_19 = {
        onClick: (...[$event]) => {
            __VLS_ctx.input?.click();
        }
    };
    let __VLS_15;
    let __VLS_16;
    var __VLS_17;
    const __VLS_20 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{ 'onClick': {} }, label: ("Очистить"), severity: ("danger"), variant: ("text"), icon: ("pi pi-times"), raised: (true), }));
    const __VLS_22 = __VLS_21({ ...{ 'onClick': {} }, label: ("Очистить"), severity: ("danger"), variant: ("text"), icon: ("pi pi-times"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_26;
    const __VLS_27 = {
        onClick: (...[$event]) => {
            __VLS_ctx.files = null;
        }
    };
    let __VLS_23;
    let __VLS_24;
    var __VLS_25;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.drop_zone)) }, ...{ style: (({
                '--border': __VLS_ctx.isOverDropZone ? 'var(--p-primary-500)' : '#ccc'
            })) }, ref: ("dropZone"), });
    // @ts-ignore navigation for `const dropZone = ref()`
    __VLS_ctx.dropZone;
    if (Array.isArray(__VLS_ctx.files) && __VLS_ctx.files.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ((__VLS_ctx.$style.drop_zone__list)) }, });
        for (const [file, i] of __VLS_getVForSourceType((__VLS_ctx.files))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((file.name)), ...{ class: ((__VLS_ctx.$style.drop_zone__list__item)) }, });
            const __VLS_28 = __VLS_resolvedLocalAndGlobalComponents.Card;
            /** @type { [typeof __VLS_components.Card, typeof __VLS_components.Card, ] } */
            // @ts-ignore
            const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({ ...{ class: ((__VLS_ctx.$style.drop_zone__list__item__card)) }, }));
            const __VLS_30 = __VLS_29({ ...{ class: ((__VLS_ctx.$style.drop_zone__list__item__card)) }, }, ...__VLS_functionalComponentArgsRest(__VLS_29));
            __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
            {
                const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_33.slots);
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ((__VLS_ctx.$style.drop_zone__list__item__card__title)) }, });
                (file.name);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
            {
                const { content: __VLS_thisSlot } = __VLS_nonNullable(__VLS_33.slots);
                if (__VLS_ctx.loading) {
                    const __VLS_34 = __VLS_resolvedLocalAndGlobalComponents.ProgressSpinner;
                    /** @type { [typeof __VLS_components.ProgressSpinner, ] } */
                    // @ts-ignore
                    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({ strokeWidth: ("4"), fill: ("transparent"), animationDuration: ("5s"), ...{ style: ({}) }, }));
                    const __VLS_36 = __VLS_35({ strokeWidth: ("4"), fill: ("transparent"), animationDuration: ("5s"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                    (__VLS_ctx.getFileSize(file));
                    const __VLS_40 = __VLS_resolvedLocalAndGlobalComponents.Button;
                    /** @type { [typeof __VLS_components.Button, ] } */
                    // @ts-ignore
                    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({ ...{ 'onClick': {} }, label: ("Удалить"), severity: ("danger"), variant: ("text"), icon: ("pi pi-times"), ...{ style: ({}) }, raised: (true), }));
                    const __VLS_42 = __VLS_41({ ...{ 'onClick': {} }, label: ("Удалить"), severity: ("danger"), variant: ("text"), icon: ("pi pi-times"), ...{ style: ({}) }, raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                    let __VLS_46;
                    const __VLS_47 = {
                        onClick: (...[$event]) => {
                            if (!((Array.isArray(__VLS_ctx.files) && __VLS_ctx.files.length)))
                                return;
                            if (!(!((__VLS_ctx.loading))))
                                return;
                            __VLS_ctx.removeFile(i);
                        }
                    };
                    let __VLS_43;
                    let __VLS_44;
                    var __VLS_45;
                }
            }
            var __VLS_33;
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.files || !__VLS_ctx.files.length)), label: ("Загрузить"), severity: ("success"), variant: ("text"), icon: ("pi pi-save"), raised: (true), }));
    const __VLS_50 = __VLS_49({ ...{ 'onClick': {} }, disabled: ((!__VLS_ctx.files || !__VLS_ctx.files.length)), label: ("Загрузить"), severity: ("success"), variant: ("text"), icon: ("pi pi-save"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_54;
    const __VLS_55 = {
        onClick: (__VLS_ctx.submit)
    };
    let __VLS_51;
    let __VLS_52;
    var __VLS_53;
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.manualUpload) }, ref: ("input"), type: ("file"), hidden: (true), multiple: (true), });
    // @ts-ignore navigation for `const input = ref()`
    __VLS_ctx.input;
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "dropZone": __VLS_nativeElements['div'],
        "input": __VLS_nativeElements['input'],
    };
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
            Card: Card,
            ProgressSpinner: ProgressSpinner,
            input: input,
            dropZone: dropZone,
            loading: loading,
            files: files,
            name: name,
            isOverDropZone: isOverDropZone,
            manualUpload: manualUpload,
            removeFile: removeFile,
            getFileSize: getFileSize,
            submit: submit,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
