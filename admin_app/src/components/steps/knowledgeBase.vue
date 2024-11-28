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
    <h1>Настройка базы знаний</h1>

    <FilesUploader :tokens />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useToast } from 'primevue/usetoast';

import FilesUploader from '../filesUploader.vue';

import { RAGServiceOrigin } from '@/services';
import type { GetTokensResponse } from '@/services/authService/@types';

interface SelectOption {
  label: string;
}

const props = defineProps<{ modelValue: boolean; tokens: GetTokensResponse }>();

const toast = useToast();

const options = ref<SelectOption[]>([]);
const value = ref<SelectOption | null>(null);

const loading = ref(true);

onMounted(async () => {
  if (!props.tokens) return;
  const { success, data } = await RAGServiceOrigin.getDatasets();

  if (success) {
    data.data.forEach(item => {
      options.value.push({ label: item.name });
    });
  }

  console.log('Datasets was loaded: ', success, data);
});

async function submit() {}
</script>

<style lang="scss" module></style>
