import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getItem } from '../lib/localStorage';
import sidebarEn from './sidebar/en.json';
import sidebarFr from './sidebar/fr.json';
import headerEn from './header/en.json';
import headerFr from './header/fr.json';
import tasksEn from './tasks/en.json';
import tasksFr from './tasks/fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      sidebar: sidebarEn,
      header: headerEn,
      tasks: tasksEn,
    },
    fr: {
      sidebar: sidebarFr,
      header: headerFr,
      tasks: tasksFr,
    },
  },
  lng: getItem<string>('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
