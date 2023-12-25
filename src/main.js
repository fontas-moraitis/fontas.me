import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { inject } from '@vercel/analytics';
import App from './App.vue';
import en from './locales/en.json';

inject();

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
  },
  global: true,
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
