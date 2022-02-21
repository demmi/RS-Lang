/* Swagger http://localhost:5050/doc/# */

const Url = 'https://rs-lang-serv.herokuapp.com/'

export const DT_DISABLED = 'disabled'
export const DT_SIGNIN = 'signInForm'
export const DT_REGISTER = 'registerForm'
export const DT_REG_OK = 'registerOk'
export const DT_UPDATE = 'updateForm'
export const DT_GAME_RESULTS = 'FormGameRusults'

export const MAIN_PAGE = 'MainPage'
export const TUTORIAL_PAGE = 'TutorialPage'
export const TUTORIAL_CHOICE = 'TutorialChoice'
export const GAMES_PAGE = 'GamesPage'
export const STATISTIC_PAGE = 'StatisticPage'
export const LOAD_GAME = 'LoadGame'

export const ROUTING_PAGES = {
  главная: MAIN_PAGE,
  учебник: TUTORIAL_CHOICE,
  игры: GAMES_PAGE,
  статистика: STATISTIC_PAGE,
}

export const PAGE_OF_CATEGORIES = [
  {
    id: 0,
    title: 'first category',
    access: true,
    description: 'Первый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 1,
    title: 'second category',
    access: true,
    description: 'Второй раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 2,
    title: 'third category',
    access: true,
    description: 'Третий раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 3,
    title: 'fourth category',
    access: true,
    description: 'Четвёртый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 4,
    title: 'fifth category',
    access: true,
    description: 'Пятый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 5,
    title: 'sixth category',
    access: true,
    description: 'Шестой раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 6,
    title: 'very difficult words',
    access: false,
    description: 'Доступен для зарегистрированных пользователей.',
  },
]

export const MAIN_PAGE_SECTIONS = [
  {
    id: 0,
    title: 'О приложении',
    shortDescription: 'описание приложения',
    fullDescription: `
    <h2 style='color: red'>
    Уважаемые проверяющие!<br><br>
    Дайте, пожалуйста, еще немного времени чтобы доделать статистику.<br>
    Остальное всё работает.<br><br>
    </h2>
    Приложение RS-Lang предназначено<br> для изучения английского языка.
    Для доступа ко всем возможностям приложения необходима регистрация.
    Регистрация происходит мгновенно`,
  },
  {
    id: 1,
    title: 'Процесс изучения',
    shortDescription: 'как происходит процесс обучения',
    fullDescription: `
    Возле каждого слова, которое использовалось в мини-играх,
    на странице учебника указывается прогресс его изучения за весь период:
    было ли слово правильно угадано в мини-играх, или пользователь ошибался
    `,
  },
  {
    id: 2,
    title: 'Игра Call Game',
    shortDescription: 'описание игры Call Game',
    fullDescription: `
    В игре Call Game вам нужно выбрать правильный вариант перевода слова
    `,
  },
  {
    id: 3,
    title: 'Игра Sprint Game',
    shortDescription: 'описание игры Sprint Game',
    fullDescription: `
    В игре Sprint Game вам нужно выбрать, правильно ли переведено слово.
    То есть: показывается слово и его перевод.
    И есть две кнопки - "неверно" и "верно". Нужно выбрать правильно ли переведено слово
    `,
  },
  {
    id: 4,
    title: 'О команде',
    shortDescription: 'кто работал над проектом',
    fullDescription: `
    Над игрой работала команда Dream-Team под руководством ментора @pivanchikov,
    team-lead - @demmi,
    <b>developer</b> - @sergioivanov008
    `,
  },
]

export const CUR_ROUTER_PAGE = 'sergioivanov008_curRouterPage'
export const CUR_CATEGORY = 'sergioivanov008_curCategory'
export const CUR_CATEGORY_PAGE = 'sergioivanov008_curCategoryPage'
export const CUR_PAGINATION_COUNT = 'sergioivanov008_curPaginationCount'

export default Url
