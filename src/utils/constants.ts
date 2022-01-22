export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS_URL_ALL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_URL_OWNER = 'wss://norma.nomoreparties.space/orders';
export const modalRoot = document.getElementById('react-modals');

export const CONSTANTS = {
  DAYS: {
    DAY_US: 86400000,
    TODAY: 'Сегодня,',
    YESTERDAY: 'Вчера,',
    FEW_DAYS: 'дня(ей) назад,'
  },
  EMPTY_TITLE: '',
  TITLE: 'Детали ингредиента',
  TITLE_PAGE: 'Детали ингредиента',
  PROFILE_ROUTE: '/profile',
  ORDER: {
    STRUCTURE: 'Состав:',
  },
  ORDER_INGREDIENTS: {
    TITLE: 'Лента заказов',
  },
  ORDER_BOARD: {
    READY: 'Готовы:',
    PREPARING: 'В работе:',
    ALL_TIME: 'Выполнено за все время:',
    TODAY: 'Выполнено за сегодня:',
  },
  INGREDIENT_DETAILS: {
    CALORIES: 'Калории,ккал',
    PROTEINS: 'Белки, г',
    FAT: 'Жиры, г',
    CARBOHYDRATES: 'Углеводы, г',
  },
  PAGE_404: {
    TITLE: 404,
    SUBTITLE: 'Кажется такой страницы нет :(',
    BUTTON_NAME: 'Создать космо бургер',
  },
  PAGE_LOGIN: {
    TITLE: 'Вход',
    BUTTON_NAME: 'Войти',
    NEW_USER: 'Вы — новый пользователь?',
    REGISTER: 'Зарегистрироваться',
    FORGOT_PASSWORD: 'Забыли пароль?',
    RESET_PASSWORD: 'Восстановить пароль',
  },
  PAGE_FORGOT_PASSWORD: {
    TITLE: 'Восстановление пароля',
    BUTTON_NAME: 'Восстановить',
    REMEMBERED_PASSWORD: 'Вспомнили пароль?',
    ENTER: 'Войти',
  },
  PAGE_REGISTER: {
    TITLE: 'Регистрация',
    BUTTON_NAME: 'Зарегистрироваться',
    ALREADY_REGISTERED: 'Уже зарегистрированы?',
    ENTER: 'Войти',
  },
  PAGE_RESET_PASSWORD: {
    TITLE: 'Восстановление пароля',
    BUTTON_NAME: 'Сохранить',
    REMEMBERED_PASSWORD: 'Вспомнили пароль?',
    ENTER: 'Войти',
  },
};

export const QUANTITY_BUNS = 2;
