import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import './style.css';
import ruRu from '@/assets/lacale';
import Lara from '@primevue/themes/lara';
import 'primeicons/primeicons.css';
import { router } from './router';
import App from './App.vue';
createApp(App)
    .use(PrimeVue, {
    locale: ruRu,
    ripple: true,
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: false
        }
    }
})
    .use(ToastService)
    .use(router)
    .mount('body');
