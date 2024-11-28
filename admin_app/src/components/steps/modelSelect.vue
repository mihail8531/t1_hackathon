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
    <h1>Подключиться к модели</h1>

    <FloatLabel variant="on">
      <InputText type="text" v-model="APIkey" style="width: 300px" />
      <label> API key</label>
    </FloatLabel>
    <FloatLabel variant="on">
      <InputText type="text" v-model="baseUrl" style="width: 300px" />
      <label>base URL </label>
    </FloatLabel>

    <Button @click="submit" :disabled="!APIkey" label="Сохранить" icon="pi pi-save" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

import { RAGService } from '@/services';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const toast = useToast();

const APIkey = ref('');
const baseUrl = ref('');

async function submit() {
  const { success, data } = await RAGService.setAPIKey(
    baseUrl.value
      ? { llm_factory: 'OpenAI', api_key: APIkey.value, base_url: baseUrl.value }
      : { llm_factory: 'OpenAI', api_key: APIkey.value }
  );
  console.log('Set key ', success, '\nRes" ', data);

  toast.add({
    severity: success ? 'success' : 'error',
    summary: success ? 'Токен доступа успешно зарегестрироан!' : 'Не удалось авторизоваться!',
    life: 3000
  });

  if (success) emit('update:modelValue', true);
}
</script>

<style lang="scss" module></style>
