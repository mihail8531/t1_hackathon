<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <div :class="$style.header">
      <FloatLabel variant="on">
        <InputText type="text" v-model="name" style="width: 300px" />
        <label> Название датасета </label>
      </FloatLabel>
      <Button @click="input?.click()" label="Добавить файл" severity="info" variant="text" icon="pi pi-upload" raised />
      <Button @click="files = null" label="Очистить" severity="danger" variant="text" icon="pi pi-times" raised />
    </div>
    <div
      :class="$style.drop_zone"
      :style="{
        '--border': isOverDropZone ? 'var(--p-primary-500)' : '#ccc'
      }"
      ref="dropZone"
    >
      <ul v-if="Array.isArray(files) && files.length" :class="$style.drop_zone__list">
        <li v-for="(file, i) in files" :key="file.name" :class="$style.drop_zone__list__item">
          <Card :class="$style.drop_zone__list__item__card">
            <template #title>
              <p :class="$style.drop_zone__list__item__card__title">
                {{ file.name }}
              </p>
            </template>
            <template #content>
              <ProgressSpinner
                v-if="loading"
                strokeWidth="4"
                fill="transparent"
                animationDuration="5s"
                style="width: 50px; height: 50px"
              />
              <template v-else>
                <p>{{ getFileSize(file) }}</p>
                <Button
                  @click="removeFile(i)"
                  label="Удалить"
                  severity="danger"
                  variant="text"
                  icon="pi pi-times"
                  style="margin-top: 12px"
                  raised
                />
              </template>
            </template>
          </Card>
        </li>
      </ul>
      <p v-else>Перетащите файлы для отправки</p>
    </div>

    <div style="display: flex; justify-content: flex-end">
      <Button
        @click="submit"
        :disabled="!files || !files.length"
        label="Загрузить"
        severity="success"
        variant="text"
        icon="pi pi-save"
        raised
      />
    </div>
  </div>

  <input @change="manualUpload" ref="input" type="file" hidden multiple />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useDropZone } from '@vueuse/core';

import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import { usePrimeVue } from 'primevue/config';
import { useToast } from 'primevue/usetoast';

import { APIService, RAGServiceFork, RAGServiceOrigin } from '@/services';
import type { GetTokensResponse } from '@/services/authService/@types';

const toast = useToast();

const props = defineProps<{ tokens: GetTokensResponse }>();

const $primevue = usePrimeVue();

const input = ref<HTMLInputElement>();
const dropZone = ref<HTMLDivElement>();

const loading = ref(false);
const files = ref<File[] | null>(null);
const name = ref('');

function onDrop(e: File[] | null) {
  if (e && Array.isArray(files.value)) e.forEach(file => files.value!.push(file));
  else if (!files.value) files.value = e;
}

const { isOverDropZone } = useDropZone(dropZone, {
  onDrop,
  // specify the types of data to be received.
  //   dataTypes: ['image/jpeg'],
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false
});

function manualUpload(e: Event) {
  if (e.target instanceof HTMLInputElement && e.target.files instanceof FileList) onDrop(Array.from(e.target.files));
}

function removeFile(index: number) {
  files.value?.splice(index, 1);
}

function getFileSize(file: File) {
  if (!file.size || !Array.isArray($primevue.config.locale?.fileSizeTypes)) return 'н/д';
  const sizes = $primevue.config.locale.fileSizeTypes;

  const i = Math.floor(Math.log(file.size) / Math.log(1024));
  const formattedSize = parseFloat((file.size / Math.pow(1024, i)).toFixed(2));

  return `${formattedSize} ${sizes[i]}`;
}

async function submit() {
  loading.value = true;

  const { success, data } = await RAGServiceOrigin.setDataset({ name: name.value });

  toast.add({
    severity: success && data.data ? 'success' : 'error',
    summary: success && data.data ? 'Датасет был успешно создан!' : 'При создании датасета произошла ошибка!',
    life: 3000
  });

  if (success && files.value) {
    const formData = new FormData();
    const params = new URLSearchParams();

    formData.append('file', files.value[0]);

    params.append('filename', files.value[0].name);
    params.append('description', '');
    params.append('language', 'English');
    params.append('permission', 'team');
    params.append('chunk_method', 'naive');
    params.append('dataset_id', data.data.id);

    const res = await APIService.uploadFile(formData, params);

    toast.add({
      severity: res.success && res.data ? 'success' : 'error',
      summary: res.success && res.data ? 'Файл был успешно загружен!' : 'При загрузке файла произошла ошибка!',
      life: 3000
    });

    if (res.success) {
      const runResponse = await RAGServiceFork.runDocument({ doc_ids: res.data.docs, run: 1 });

      toast.add({
        severity: res.success && res.data ? 'success' : 'error',
        summary: res.success && res.data ? 'Файл был успешно обработан!' : 'При обработке файла произошла ошибка!',
        life: 3000
      });

      console.log('Run response: ', runResponse);
    }

    console.log('File was uploaded: ', res);
  }

  console.log('Dataset waas created: ', success, data);

  loading.value = false;
}
</script>

<style lang="scss" module>
.header {
  display: flex;
  gap: 12px;
}
.drop_zone {
  max-width: 75vw;
  padding: 20px 12px;
  border: 2px dashed var(--border);
  &__list {
    max-height: 50dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    overflow: auto;
    &__item {
      max-width: 250px;
      list-style: none;
      &__card {
        text-align: center;
        &__title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
