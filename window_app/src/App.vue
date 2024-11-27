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
          <Button label="Отправить" severity="secondary" variant="text" raised />
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
import { ref } from 'vue';

import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

import chatImage from '@/assets/img/chat.png';

const messages = ref(
  [
    {
      role: 'user',
      time: '2023-11-01T12:34:56Z',
      text: 'Привет! Как дела?'
    },
    {
      role: 'assistant',
      time: '2023-11-01T12:35:15Z',
      text: 'Здравствуйте! Всё отлично, спасибо. Чем могу помочь?'
    },
    {
      role: 'user',
      time: '2023-11-01T12:36:20Z',
      text: 'Мне нужно узнать, как приготовить борщ.'
    },
    {
      role: 'assistant',
      time: '2023-11-01T12:37:05Z',
      text: 'Конечно, я помогу вам с рецептом борща. Это будет классический рецепт?'
    },
    {
      role: 'user',
      time: '2023-11-01T12:38:00Z',
      text: 'Да, именно классический вариант интересует.'
    },
    {
      role: 'assistant',
      time: '2023-11-01T12:39:30Z',
      text: 'Отлично! Для начала подготовьте ингредиенты...'
    },
    {
      role: 'user',
      time: '2023-11-02T09:25:45Z',
      text: 'Спасибо за рецепт! Борщ получился очень вкусным!'
    },
    {
      role: 'assistant',
      time: '2023-11-02T09:26:50Z',
      text: 'Рада слышать, что всё получилось! Если у вас есть ещё вопросы, задавайте.'
    },
    {
      role: 'user',
      time: '2023-11-03T14:32:17Z',
      text: 'Подскажите, а какой соус лучше всего подходит к борщу?'
    },
    {
      role: 'assistant',
      time: '2023-11-03T14:33:40Z',
      text: 'К борщу традиционно подают сметану. Она добавляет нежный сливочный вкус и прекрасно дополняет блюдо.'
    }
  ].map(el => ({ ...el, time: new Date(el.time), id: Math.random() }))
);

const value = ref('');

const showPreview = ref(true);
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
