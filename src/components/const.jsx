/* Swagger http://localhost:5050/doc/# */

const Url = 'https://rs-lang-api.onrender.com/'

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
/* <h2 style='color: red'> */
export const MAIN_PAGE_SECTIONS = [
  {
    id: 0,
    title: 'О приложении',
    shortDescription: 'описание приложения',
    fullDescription: `
    Приложение <b>RS-Lang</b> предназначено для изучения английского языка.
    <br>
    <br>
    Описание процесса изучения можно найти в разделе <b>Процесс обучения</b>
    <br>
    <br>
    Для доступа ко всем возможностям приложения необходима регистрация.
    <br>
    Регистрация происходит мгновенно.
    <br>
    <br>
    <b>При разработке приложения использовались</b>:
    <br>
    <br>
    <b>React</b> - для разработки приложения
    <br>
    <b>React Material UI</b> - для пользовательского интерфейса
    <br>
    <b>useSound</b> - для создания звуковых эффектов в приложении
    <br>
    <b>Recharts</b> - для построения графиков
    `,
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
    Над игрой работала команда <b>Dream-Team</b>:
    <br>
    <br>
    <b>ментор</b> @pivanchikov
    <br>
    <b>team-lead</b> - <a href='https://github.com/demmi/'>@demmi</a> 
    <br>
    <b>developer</b> - <a href = 'https://github.com/sergioivanov008'>@sergioivanov008</a>
    `,
  },
]

export const CUR_ROUTER_PAGE = 'sergioivanov008_curRouterPage'
export const CUR_CATEGORY = 'sergioivanov008_curCategory'
export const CUR_CATEGORY_PAGE = 'sergioivanov008_curCategoryPage'
export const CUR_PAGINATION_COUNT = 'sergioivanov008_curPaginationCount'

export default Url
