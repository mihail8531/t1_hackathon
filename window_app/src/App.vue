<template>
  <div :class="$style.container">
    <div v-if="showPreview" :class="$style.preview">
      <img @click="showPreview = false" :src="chatImage" alt="chat" />
    </div>

    <div v-else :class="$style.chat">
      <ul :class="$style.chat__list">
        <li
          v-for="message in messages"
          :key="message.id"
          :class="{ [$style.message]: true, [$style['message__' + message.role]]: true }"
        >
          <p>{{ message.text }}</p>
          <p :class="$style.message__time">{{ message.time.toLocaleString() }}</p>
        </li>
      </ul>

      <div style="width: 100%; height: 120px; display: flex; gap: 12px; padding-right: 12px">
        <Textarea v-model="value" style="width: 100%; height: 120px; resize: none" />
        <div style="height: fit-content; margin-top: auto; display: flex; flex-direction: column; gap: 12px">
          <Button @click="sendMessage" label="Отправить" severity="secondary" variant="text" raised />
          <Button
            @click="showPreview = true"
            label="Закрыть"
            severity="danger"
            variant="text"
            raised
            aria-label="Cancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

import chatImage from '@/assets/img/chat.png';

const messages = ref<{ id: string; text: string; time: Date; role: 'user' | 'assistant' }[]>([]);

const value = ref('');

const showPreview = ref(false);

const headers = { Authorization: 'Bearer ragflow-A3NjhhNmYyYWNhNDExZWZhMjUyMDI0Mm' };
onMounted(async () => {
  const res = await fetch('http://127.0.0.1:8888/api/v1/chats', {
    headers
  });
  const data = await res.json();

  console.log('Data: ', data);

  if (data.data[0]) {
    messages.value.push({
      id: Math.random().toString(36).slice(2),
      text: data.data[0].prompt.opener,
      time: new Date(),
      role: 'assistant'
    });
  }
});

async function sendMessage() {
  messages.value.push({ id: Math.random().toString(36).slice(2), text: value.value, time: new Date(), role: 'user' });

  const test = await fetch('http://127.0.0.1:8888/api/v1/chats/eb6e2cbeaca411efa71c0242ac120006/completions', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      question: value.value,
      stream: false
    })
  });

  const data = await test.json();
  console.log('Send message: ', data);

  const session_id = data.data.session_id;

  if (data.data) {
    messages.value.push({ id: data.data.id, text: data.data.answer, time: new Date(), role: 'assistant' });
    value.value = '';
  }

  // messages.value.push({
  //   id: Math.random().toString(36).slice(2),
  //   text: 'А что будет после?',
  //   time: new Date(),
  //   role: 'user'
  // });

  // const test2 = await fetch('http://127.0.0.1:8888/api/v1/conversation/completion', {
  //   headers,
  //   method: 'POST',
  //   body: JSON.stringify({
  //     question: messages.value.at(-1)?.text,
  //     stream: false,
  //     session_id
  //     // conversation_id: seeeion_id,
  //     // messages: messages.value.map(el => ({ content: el.text, role: el.role }))
  //   })
  // });
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
  box-shadow:
    rgba(0, 0, 0, 0.19) 0px 10px 20px,
    rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &__list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    overflow: hidden scroll;
  }
}
.message {
  position: relative;
  width: calc(100% - 32px);
  border-radius: 16px;
  background: #00bfb6;
  padding-bottom: 12px;
  color: #fff;
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
    --border-top: 15px solid #00bfb6;
    --border-right: 15px solid transparent;
    --border-bottom: 15px solid transparent;
    --border-left: 15px solid #00bfb6;
    --right: -16px;
  }
  &__assistant {
    --border-top: 15px solid #00bfb6;
    --border-right: 15px solid #00bfb6;
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
</style>
