<template>
  <div :class="$style.container">
    <SelectButton v-model="value" :options="options" optionLabel="label" :unselectable="false" :multiple="false" />

    <Divider />

    <component :is="value.component" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';

import FilesUploader from '@/components/filesUploader.vue';
import ConnectToSQL from '@/components/connectToSQL.vue';

const options = ref([
  { label: 'Загрузить файлы', component: shallowRef(FilesUploader) },
  { label: 'Подключиться к SQL базе данных', component: shallowRef(ConnectToSQL) }
]);
const value = ref(options.value[0]);
</script>

<style lans="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px;
  border-radius: 12px;
  box-shadow:
    rgba(0, 0, 0, 0.19) 0px 10px 20px,
    rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>
