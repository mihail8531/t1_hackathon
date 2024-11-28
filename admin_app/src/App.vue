<template>
  <BaseLayout>
    <!-- <RootPage /> -->

    <Stepper v-if="!loading" :value="2" style="width: 75vw" linear>
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
          <component v-model="panel.done" :is="panel.component" />

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
// import RootPage from './pages/root.vue';
import modelSelect from './components/steps/modelSelect.vue';
import modelConfig from './components/steps/modelConfig.vue';
import { authService, RAGService } from './services';

const list = ref([
  { step: 1, done: false, title: 'Выбор модели', component: modelSelect },
  { step: 2, done: false, title: 'Настройка модели', component: modelConfig },
  { step: 3, done: false, title: 'Подключение базы знаний', component: null },
  { step: 4, done: false, title: 'Выбор асистента', component: null }
]);

const loading = ref(true);

onMounted(async () => {
  // const {success, data} = await authService.getTokens()

  const data = {
    api_key: 'ragflow-FiMDUwODVlYWQzMTExZWZiYTRlMDI0Mm',
    auth_key: 'ImFhZmQyMmUyYWQzMTExZWZhYzg5MDI0MmFjMTIwMDA2Ig.Z0fXVg.kqwh6utVGVOcxIzrhurtcRYgHRw'
  };

  RAGService.setHeader('Authorization', data.auth_key);

  loading.value = false;
});
</script>
