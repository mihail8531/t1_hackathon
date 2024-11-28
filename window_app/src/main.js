import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import './style.css';
import 'primeicons/primeicons.css';
import ruRu from '@/assets/lacale';
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
    .mount('body');
