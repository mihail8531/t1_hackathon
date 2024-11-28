<template>
  <div :class="$style.container" :style="style">
    <div v-if="showPreview" :class="$style.preview">
      <img @click="showPreview = false" :src="chatImage" alt="chat" />
    </div>

    <div v-else :class="$style.chat">
      <ul :class="$style.chat__list" ref="list">
        <li
          v-for="message in messages"
          :key="message.id"
          :class="{ [$style.message]: true, [$style['message__' + message.role]]: true }"
        >
          <p>{{ message.text }}</p>
          <p :class="$style.message__time">{{ message.time.toLocaleString() }}</p>
        </li>
        <li v-if="loading" :class="{ [$style.message]: true, [$style.message__assistant]: true }">
          <p>Асистент печатает...</p>
        </li>
      </ul>

      <div :class="$style.footer">
        <Textarea v-model="text" @keydown.enter="sendMessage" :disabled="loading" />
        <div :class="$style.footer__actions">
          <Button
            @click="sendMessage"
            :disabled="loading"
            variant="text"
            label="Отправить"
            severity="secondary"
            icon="pi pi-send"
            raised
          />
          <Button
            @click="showPreview = true"
            variant="text"
            label="Закрыть"
            severity="danger"
            aria-label="Cancel"
            icon="pi pi-times"
            raised
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onMounted, ref } from 'vue';

import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

import chatImage from '@/assets/img/chat.png';

import { RAGService } from './services';

const text = ref('');
const messages = ref<{ id: string; text: string; time: Date; role: 'user' | 'assistant' }[]>([]);
const list = ref<HTMLUListElement | null>(null);

const session_id = ref<string | null>(null);
const assistant_id = ref<string | null>(null);
const style = ref<CSSProperties>({
  '--message-bg-color': '#00bfb6',
  '--message-text-color': '#ffffff',
  '--chat-bg-color': '#ffffff'
});

const showPreview = ref(true);
const loading = ref(false);

onMounted(init);

async function init() {
  const { success, data } = await RAGService.getAssistans();

  if (!success) return;

  assistant_id.value = data.data[0].id;
  messages.value.push({
    id: Math.random().toString(36).slice(2),
    text: data.data[0].prompt.opener,
    time: new Date(),
    role: 'assistant'
  });
}

async function sendMessage() {
  if (!assistant_id.value) return;

  loading.value = true;
  messages.value.push({ id: Math.random().toString(36).slice(2), text: text.value, time: new Date(), role: 'user' });

  const { success, data } = await RAGService.sendMessage(
    assistant_id.value,
    session_id.value
      ? { question: text.value, stream: false, session_id: session_id.value }
      : { question: text.value, stream: false }
  );

  if (success) {
    text.value = '';
    messages.value.push({ id: data.data.id, text: data.data.answer, time: new Date(), role: 'assistant' });

    if (!session_id.value) session_id.value = data.data.session_id;

    await nextTick();
    if (list.value) list.value.scrollTo({ top: list.value.scrollHeight, behavior: 'smooth' });
  }

  loading.value = false;
}
</script>

<style lang="scss" module>
.container {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: fit-content;
  height: fit-content;
}
.preview {
  height: 112px;
  & img {
    height: 100%;
    cursor: pointer;
  }
}
.chat {
  position: relative;
  width: 600px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px 0 12px 12px;
  background-color: var(--chat-bg-color);
  box-shadow:
    rgba(0, 0, 0, 0.19) 0px 10px 20px,
    rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &__list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    overflow: auto;
  }
}
.message {
  position: relative;
  width: calc(100% - 32px);
  border-radius: 16px;
  background: var(--message-bg-color);
  padding-bottom: 12px;
  color: var(--message-text-color);
  padding: 20px;
  &:before {
    content: '';
    top: 0px;
    left: var(--left);
    right: var(--right);
    width: 0px;
    height: 0px;
    position: absolute;
    border-top: var(--border-top);
    border-right: var(--border-right);
    border-bottom: var(--border-bottom);
    border-left: var(--border-left);
  }
  &__user {
    --border-top: 15px solid var(--message-bg-color);
    --border-right: 15px solid transparent;
    --border-bottom: 15px solid transparent;
    --border-left: 15px solid var(--message-bg-color);
    --right: -16px;
  }
  &__assistant {
    --border-top: 15px solid var(--message-bg-color);
    --border-right: 15px solid var(--message-bg-color);
    --border-bottom: 15px solid transparent;
    --border-left: 15px solid transparent;
    --left: -16px;
  }
  &__time {
    position: absolute;
    bottom: 0;
    right: 12px;
    font-size: 10px;
  }
}
.footer {
  width: 100%;
  height: 120px;
  display: flex;
  gap: 12px;
  padding-right: 12px;
  & textarea {
    width: 100%;
    height: 120px;
    resize: none;
  }
  &__actions {
    height: fit-content;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
