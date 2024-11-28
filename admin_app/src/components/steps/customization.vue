<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    "
  >
    <h1>Кастомизация чата с асистентом (id {{ window_id }})</h1>
    <div style="display: flex; flex-direction: column; gap: 24px">
      <div v-for="item in style" :key="item.title" style="display: flex; gap: 24px; align-items: center">
        <FloatLabel variant="on">
          <InputText type="text" v-model="item.value" :invalid="!isValid(item.value)" style="width: 300px" />
          <label> {{ item.title }} </label>
        </FloatLabel>
        <ColorPicker v-model="item.value" />
      </div>
    </div>

    <Button @click="submit" :disabled="isSaveButtonDisabled()" label="Сохранить" icon="pi pi-save" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import Button from 'primevue/button';
import ColorPicker from 'primevue/colorpicker';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

import { useToast } from 'primevue/usetoast';

import { GetTokensResponse } from '@/services/authService/@types';
import { APIService } from '@/services';

const route = useRoute();
const router = useRouter();

const props = defineProps<{ modelValue: boolean; tokens: GetTokensResponse }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const style = ref<{ title: string; field: string; value: string }[]>([
  { title: 'Цвет рамки сообщения', field: 'message-bg-color', value: '' },
  { title: 'Цвет шрифта сообщения', field: 'message-text-color', value: '' },
  { title: 'Цвет фона', field: 'chat-bg-color', value: '' }
]);

const toast = useToast();
const window_id = localStorage.getItem('window_id');

const loading = ref(true);

const regExp = /^[A-Fa-f0-9]{6}$/;
function isValid(value: string) {
  return value ? regExp.test(value) : true;
}

function isSaveButtonDisabled() {
  return style.value.some(item => !isValid(item.value));
}

async function submit() {
  loading.value = true;

  const window_id = localStorage.getItem('window_id');
  const assistant_id = localStorage.getItem('assistant_id');
  if (!window_id || !assistant_id) return;

  const { success, data } = await APIService.updateWindow(
    {
      style: JSON.stringify(
        style.value.reduce(
          (acc, item) => {
            acc[item.field] = item.value;
            return acc;
          },
          {} as Record<string, string>
        )
      ),
      assistant_id
    },
    window_id
  );

  toast.add({
    severity: success && data ? 'success' : 'error',
    summary: success && data ? 'Окно чата было успешно обновлено!' : 'При обновлении окна произошла ошибка!',
    life: 3000
  });

  loading.value = false;
}
</script>

<style lang="scss" module></style>
