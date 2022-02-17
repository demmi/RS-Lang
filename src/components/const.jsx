/* Swagger http://localhost:5050/doc/# */

const Url = 'https://rs-lang-serv.herokuapp.com/'

export const DT_DISABLED = 'disabled'
export const DT_SIGNIN = 'signInForm'
export const DT_REGISTER = 'registerForm'
export const DT_REG_OK = 'registerOk'
export const DT_UPDATE = 'updateForm'

export const MAIN_PAGE = 'MainPage'
export const TUTORIAL_PAGE = 'TutorialPage'
export const TUTORIAL_CHOICE = 'TutorialChoice'
export const GAMES_PAGE = 'GamesPage'
export const STATISTIC_PAGE = 'StatisticPage'

export const ROUTING_PAGES = {
  главная: MAIN_PAGE,
  учебник: TUTORIAL_CHOICE,
  игры: GAMES_PAGE,
  статистика: STATISTIC_PAGE,
}

export const PAGE_OF_CATEGORIES = [
  {
    id: 1,
    title: 'first category',
    access: true,
    description: 'Первый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 2,
    title: 'second category',
    access: true,
    description: 'Второй раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 3,
    title: 'third category',
    access: true,
    description: 'Третий раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 4,
    title: 'fourth category',
    access: true,
    description: 'Четвёртый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 5,
    title: 'fifth category',
    access: true,
    description: 'Пятый раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 6,
    title: 'sixth category',
    access: true,
    description: 'Шестой раздел со словами для изучения. Доступен без регистрации.',
  },
  {
    id: 7,
    title: 'very difficult words',
    access: false,
    description: 'Доступен для зарегистрированных пользователей.',
  },
]

export const CUR_ROUTER_PAGE = 'sergioivanov008_curRouterPage'
export const CUR_CATEGORY = 'sergioivanov008_curCategory'
export const CUR_CATEGORY_PAGE = 'sergioivanov008_curCategoryPage'
export const CUR_PAGINATION_COUNT = 'sergioivanov008_curPaginationCount'

export default Url
