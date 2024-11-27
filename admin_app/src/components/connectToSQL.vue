<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; flex-wrap: wrap; gap: 12px" v-for="(row, i) in data" :key="i">
      <FloatLabel v-for="item in row" :key="item.key" variant="on">
        <InputText
          type="text"
          v-model="item.value"
          style="width: 300px"
          :invalid="!isValid(item.value, item.pattern)"
        />
        <label> {{ item.label + (isValid(item.value, item.pattern) ? '' : ' не валиден') }} </label>
      </FloatLabel>
    </div>
    <FloatLabel variant="on">
      <Textarea v-model="sql" rows="3" style="width: 612px; max-height: 300px; resize: vertical" />
      <label> SQL </label>
    </FloatLabel>
  </div>

  <div style="display: flex; justify-content: flex-end">
    <Button
      :disabled="isConnectionButtonDisabled()"
      label="Подключиться"
      severity="success"
      variant="text"
      icon="pi pi-link"
      raised
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const data = ref<{ value: string; label: string; key: string; pattern?: RegExp }[][]>([
  [
    { value: '', label: 'IP-адрес', key: 'ip', pattern: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/ },
    {
      value: '',
      label: 'Порт',
      key: 'port',
      pattern: /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
    }
  ],
  [
    { value: '', label: 'Пользователь', key: 'user' },
    { value: '', label: 'Пароль', key: 'password' }
  ],
  [
    { value: '', label: 'База данных', key: 'db' }
    // { value: '', label: 'Схема', key: 'schema' },
    // { value: '', label: 'Таблица', key: 'table' }
  ]
]);

const sql = ref('');

function isValid(value: string, regExp?: RegExp) {
  return regExp && value ? regExp.test(value) : true;
}

function isConnectionButtonDisabled() {
  return data.value.some(row => row.some(item => !item.value || !isValid(item.value, item.pattern))) || !sql.value;
}
</script>

<style></style>
