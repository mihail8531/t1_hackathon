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
    <h1>Настройка асистента</h1>
    <div style="display: flex; gap: 24px">
      <FloatLabel variant="on">
        <InputText type="text" v-model="name" style="width: 420px" />
        <label> Имя асистента </label>
      </FloatLabel>
      <MultiSelect
        v-model="value"
        :options="options"
        placeholder="Выберите датасеты"
        optionLabel="label"
        style="width: 420px; height: fit-content"
      />
    </div>
    <FloatLabel variant="on">
      <Textarea v-model="prompt" rows="10" style="width: 852px; max-height: 300px; resize: vertical" />
      <label> Prompt </label>
    </FloatLabel>

    <Button @click="submit" :disabled="!name || !value?.length" label="Сохранить" icon="pi pi-save" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import { useToast } from 'primevue/usetoast';

import { APIService, RAGServiceOrigin } from '@/services';
import type { GetTokensResponse } from '@/services/authService/@types';

interface SelectOption {
  label: string;
  value: string;
}

const props = defineProps<{ modelValue: boolean; tokens: GetTokensResponse }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const toast = useToast();
const route = useRoute();
const router = useRouter();

const options = ref<SelectOption[]>([]);
const value = ref<SelectOption[] | null>(null);

const name = ref('');
const prompt =
  ref(`You are an intelligent assistant. Please summarize the content of the knowledge base to answer the question. Please list the data in the knowledge base and answer in detail. When all knowledge base content is irrelevant to the question, your answer must include the sentence "The answer you are looking for is not found in the knowledge base!" Answers need to consider chat history.
      Here is the knowledge base:
      {knowledge}
      The above is the knowledge base.`);

const loading = ref(true);

onMounted(async () => {
  if (!props.tokens) return;
  const { success, data } = await RAGServiceOrigin.getDatasets();

  if (success) {
    data.data.forEach(item => {
      options.value.push({ label: item.name, value: item.id });
    });
  }

  console.log('Datasets was loades: ', success, data);
});

async function submit() {
  if (!name.value || !value.value) return;

  const { success, data } = await RAGServiceOrigin.createAssistant({
    name: name.value,
    dataset_ids: value.value?.map(el => el.value)
  });

  toast.add({
    severity: success && data.data ? 'success' : 'error',
    summary:
      success && data.data
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
        summary:
          windowResponse.success && windowResponse.data
            ? 'Окно чата было успешно создано!'
            : 'При создании окна произошла ошибка!',
        life: 3000
      });

      emit('update:modelValue', true);
    }
  }

  console.log('Create assistant: ', success, data);
}
</script>

<style lang="scss" module></style>
