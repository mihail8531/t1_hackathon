<template>
  <BaseLayout>
    <!-- <RootPage /> -->

    <Stepper :value="1" style="width: 75vw" linear>
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
          <component :is="panel.component" />

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
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import BaseLayout from './components/layouts/base.vue';
// import RootPage from './pages/root.vue';
import modelSelect from './components/steps/modelSelect.vue';

const list = [
  { step: 1, title: 'Выбор модели', component: modelSelect },
  { step: 2, title: 'Настройка модели', component: null },
  { step: 3, title: 'Подключение базы знаний', component: null },
  { step: 4, title: 'Выбор асистента', component: null }
];

const APIkey = ref('');
const baseUrl = ref('');
</script>
