import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    oneApp: 'One app for all shoes.',
                    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    brand: 'Brand',
                    type: 'Type',
                    color: 'Color',
                    clearFilters: 'Clear filters',
                    buy: 'Buy',
                    home: 'Home',
                    products: 'Products',
                    admin: 'Admin',
                    account: 'Account',
                    logout: 'Logout',
                    login: 'Login'
                }
            },
            ua: {
                translation: {
                    oneApp: 'Один додаток для усіх чоботів.',
                    lorem: 'Lorem Ipsum є псевдо- латинський текст використовується у веб - дизайні, типографіка, верстка, і друку замість англійської підкреслити елементи дизайну над змістом.',
                    brand: 'Бренд',
                    type: 'Тип',
                    color: 'Колір',
                    clearFilters: 'Скинути фільтри',
                    buy: 'Купити',
                    home: 'Домашня Сторінка',
                    products: 'Продукти',
                    admin: 'Адмін',
                    account: 'Аккаунт',
                    logout: 'Вийти',
                    login: 'Ввійти'
                }
            }
        }
    })