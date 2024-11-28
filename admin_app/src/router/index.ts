import { createMemoryHistory, createRouter } from 'vue-router';

// import rootPage from '@/pages/root.vue';
import App from '@/App.vue';

const routes = [
  { path: '/', component: App },
  { path: '/*', component: App }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
