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
    <h1>Настройка модели</h1>

    <Select
      v-model="LLMValue"
      :options="LLMOptions"
      placeholder="Выберите языковую модель"
      optionLabel="label"
      style="width: 420px"
    />
    <Select
      v-model="EmbeddingValue"
      :options="EmbeddingOptions"
      placeholder="Выберите модель эмбединга"
      optionLabel="label"
      style="width: 420px"
    />

    <Button
      @click="submit"
      :disabled="!LLMValue || !EmbeddingValue || modelValue"
      label="Сохранить"
      icon="pi pi-save"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';

import { RAGServiceFork } from '@/services';

interface SelectOption {
  label: string;
}

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const toast = useToast();

const LLMOptions = ref<SelectOption[]>([]);
const LLMValue = ref<SelectOption | null>(null);
const EmbeddingOptions = ref<SelectOption[]>([]);
const EmbeddingValue = ref<SelectOption | null>(null);

const tenantInfo = ref<{ id: string; name: string } | null>(null);

const loading = ref(true);

onMounted(async () => {
  const { success, data } = await RAGServiceFork.getAllModels();

  if (success) {
    for (const key in data.data) {
      data.data[key].forEach(model => {
        if (!model.available) return;

        if (model.model_type === 'chat') LLMOptions.value.push({ label: model.llm_name });
        else if (model.model_type === 'embedding') EmbeddingOptions.value.push({ label: model.llm_name });
      });
    }

    const res = await RAGServiceFork.getUserModels();

    if (res.success && res.data.data) {
      tenantInfo.value = { id: res.data.data.tenant_id, name: res.data.data.name };

      const curLLMModel = LLMOptions.value.find(el => el.label === res.data?.data.llm_id);
      const curEmbeddingModel = EmbeddingOptions.value.find(el => el.label === res.data?.data.embd_id);

      if (curLLMModel) LLMValue.value = curLLMModel;
      if (curEmbeddingModel) EmbeddingValue.value = curEmbeddingModel;
    }
  }

  loading.value = false;
});

async function submit() {
  if (!tenantInfo.value || !LLMValue.value || !EmbeddingValue.value) return;

  const { success, data } = await RAGServiceFork.setUserModels({
    tenant_id: tenantInfo.value.id,
    name: tenantInfo.value.name,
    llm_id: LLMValue.value.label,
    embd_id: EmbeddingValue.value.label,
    img2txt_id: '',
    asr_id: '',
    rerank_id: '',
    tts_id: null
  });

  console.log('Set models: ', success, data);

  toast.add({
    severity: success && data.data ? 'success' : 'error',
    summary: success && data.data ? 'Модели успешно добавлены!' : 'при добавлении моделей произошла ошибка!',
    life: 3000
  });

  if (success) emit('update:modelValue', true);
}
</script>

<style lang="scss" module></style>
