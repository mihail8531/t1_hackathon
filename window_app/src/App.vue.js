import { nextTick, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import chatImage from '@/assets/img/chat.png';
import { authService, RAGService } from './services';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const text = ref('');
const messages = ref([]);
const list = ref(null);
const session_id = ref(null);
const assistant_id = ref(null);
const style = ref({
    '--message-bg-color': '#00bfb6',
    '--message-text-color': '#ffffff',
    '--chat-bg-color': '#ffffff'
});
// 3
const showPreview = ref(true);
const loading = ref(false);
onMounted(init);
async function init() {
    const windowResponse = await authService.getWindow(3);
    if (windowResponse.success) {
        const rawStyle = JSON.parse(windowResponse.data.style);
        for (const key in rawStyle) {
            /* @ts-ignore */
            style.value['--' + key] = '#' + rawStyle[key];
        }
        const tokensResponse = await authService.getTokens();
        if (tokensResponse.success)
            RAGService.setHeader('Authorization', 'Bearer ' + tokensResponse.data.api_key);
        const { success, data } = await RAGService.getAssistans();
        if (!success)
            return;
        assistant_id.value = windowResponse.data.assistant_id;
        messages.value.push({
            id: Math.random().toString(36).slice(2),
            text: data.data.find(el => el.id === windowResponse.data.assistant_id)?.prompt.opener ??
                'Приветствую! Я вертуальный асистент и помогу найти ответы на любые Ваши вопросы :)',
            time: new Date(),
            role: 'assistant'
        });
    }
}
async function sendMessage() {
    if (!assistant_id.value)
        return;
    loading.value = true;
    messages.value.push({ id: Math.random().toString(36).slice(2), text: text.value, time: new Date(), role: 'user' });
    await nextTick();
    if (list.value)
        list.value.scrollTo({ top: list.value.scrollHeight, behavior: 'smooth' });
    const { success, data } = await RAGService.sendMessage(assistant_id.value, session_id.value
        ? { question: text.value, stream: false, session_id: session_id.value }
        : { question: text.value, stream: false });
    if (success) {
        text.value = '';
        messages.value.push({ id: data.data.id, text: data.data.answer, time: new Date(), role: 'assistant' });
        if (!session_id.value)
            session_id.value = data.data.session_id;
        await nextTick();
        if (list.value)
            list.value.scrollTo({ top: list.value.scrollHeight, behavior: 'smooth' });
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.container)) }, ...{ style: ((__VLS_ctx.style)) }, });
    if (__VLS_ctx.showPreview) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.preview)) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showPreview)))
                        return;
                    __VLS_ctx.showPreview = false;
                } }, src: ((__VLS_ctx.chatImage)), alt: ("chat"), });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.chat)) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ((__VLS_ctx.$style.chat__list)) }, ref: ("list"), });
        // @ts-ignore navigation for `const list = ref()`
        __VLS_ctx.list;
        for (const [message] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((message.id)), ...{ class: (({ [__VLS_ctx.$style.message]: true, [__VLS_ctx.$style['message__' + message.role]]: true })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (message.text);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ((__VLS_ctx.$style.message__time)) }, });
            (message.time.toLocaleString());
        }
        if (__VLS_ctx.loading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: (({ [__VLS_ctx.$style.message]: true, [__VLS_ctx.$style.message__assistant]: true })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.footer)) }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Textarea;
        /** @type { [typeof __VLS_components.Textarea, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.text)), disabled: ((__VLS_ctx.loading)), }));
        const __VLS_2 = __VLS_1({ ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.text)), disabled: ((__VLS_ctx.loading)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_6;
        const __VLS_7 = {
            onKeydown: (__VLS_ctx.sendMessage)
        };
        let __VLS_3;
        let __VLS_4;
        var __VLS_5;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.$style.footer__actions)) }, });
        const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.loading)), variant: ("text"), label: ("Отправить"), severity: ("secondary"), icon: ("pi pi-send"), raised: (true), }));
        const __VLS_10 = __VLS_9({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.loading)), variant: ("text"), label: ("Отправить"), severity: ("secondary"), icon: ("pi pi-send"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        let __VLS_14;
        const __VLS_15 = {
            onClick: (__VLS_ctx.sendMessage)
        };
        let __VLS_11;
        let __VLS_12;
        var __VLS_13;
        const __VLS_16 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ ...{ 'onClick': {} }, variant: ("text"), label: ("Закрыть"), severity: ("danger"), "aria-label": ("Cancel"), icon: ("pi pi-times"), raised: (true), }));
        const __VLS_18 = __VLS_17({ ...{ 'onClick': {} }, variant: ("text"), label: ("Закрыть"), severity: ("danger"), "aria-label": ("Cancel"), icon: ("pi pi-times"), raised: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        let __VLS_22;
        const __VLS_23 = {
            onClick: (...[$event]) => {
                if (!(!((__VLS_ctx.showPreview))))
                    return;
                __VLS_ctx.showPreview = true;
            }
        };
        let __VLS_19;
        let __VLS_20;
        var __VLS_21;
    }
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "list": __VLS_nativeElements['ul'],
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
            Textarea: Textarea,
            chatImage: chatImage,
            text: text,
            messages: messages,
            list: list,
            style: style,
            showPreview: showPreview,
            loading: loading,
            sendMessage: sendMessage,
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
