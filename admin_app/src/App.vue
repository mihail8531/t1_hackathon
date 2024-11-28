<template>
  <BaseLayout>
    <!-- <RootPage /> -->

    <Stepper v-if="!loading" v-model:value="curStep" style="width: 75vw" linear>
      <StepList>
        <Step v-for="step in list" :key="step.step" :value="step.step">{{ step.title }}</Step>
      </StepList>
      <StepPanels>
        <StepPanel
          v-for="panel in list"
          v-slot="{ activateCallback }"
          :key="panel.step"
          :value="panel.step"
          style="
            height: 75dvh;
            display: flex;
            flex-direction: column;
            padding: 12px;
            border-radius: 12px;
            box-shadow:
              rgba(0, 0, 0, 0.19) 0px 10px 20px,
              rgba(0, 0, 0, 0.23) 0px 6px 6px;
          "
        >
          <component v-if="curStep === panel.step" v-model="panel.done" :is="panel.component" :tokens />

          <div style="width: 100%; display: flex; margin-top: auto">
            <Button
              v-if="panel.step !== list[0].step"
              @click="activateCallback(panel.step - 1)"
              label="Вернуться"
              severity="secondary"
              icon="pi pi-arrow-left"
            />
            <Button
              v-if="panel.step !== list.at(-1)?.step"
              @click="activateCallback(panel.step + 1)"
              :disabled="!panel.done"
              label="Дальше"
              iconPos="right"
              icon="pi pi-arrow-right"
              style="margin-left: auto"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </BaseLayout>

  <Toast />
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import BaseLayout from './components/layouts/base.vue';
import modelSelect from './components/steps/modelSelect.vue';
import modelConfig from './components/steps/modelConfig.vue';
import knowledgeBase from './components/steps/knowledgeBase.vue';
import setAssistant from './components/steps/setAssistant.vue';
import customization from './components/steps/customization.vue';
import { authService, RAGServiceOrigin, RAGServiceFork } from './services';
import type { GetTokensResponse } from './services/authService/@types';

const curStep = ref(4);
const list = ref([
  { step: 1, done: false, title: 'Выбор модели', component: modelSelect },
  { step: 2, done: false, title: 'Настройка модели', component: modelConfig },
  { step: 3, done: true, title: 'Настройка базы знаний', component: knowledgeBase },
  { step: 4, done: false, title: 'Выбор асистента', component: setAssistant },
  { step: 5, done: false, title: 'Кастомизация', component: customization }
]);

const loading = ref(true);
const tokens = ref<GetTokensResponse | null>(null);

onMounted(async () => {
  const { success, data } = await authService.getTokens();

  if (success) {
    RAGServiceFork.setHeader('Authorization', data.auth_key);
    RAGServiceOrigin.setHeader('Authorization', 'Bearer ' + data.api_key);
    tokens.value = data;
  }

  loading.value = false;
});
</script>
