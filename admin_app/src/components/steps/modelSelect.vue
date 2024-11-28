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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { RAGService } from '@/services';

const APIkey = ref('');
const baseUrl = ref('');

onMounted(async () => {
  const res /* { success, data } */ = await RAGService.getAllModels();

  console.log('Data: ', res);
});
</script>

<style lang="scss" module></style>
