/* Swagger http://localhost:5050/doc/# */

const Url = 'http://localhost:5050/'

export const DT_DISABLED = 'disabled'
export const DT_SIGNIN = 'signInForm'
export const DT_REGISTER = 'registerForm'
export const DT_REG_OK = 'registerOk'
export const DT_UPDATE = 'updateForm'

export const MAIN_PAGE = 'MainPage'
export const TUTORIAL_PAGE = 'TutorialPage'
export const GAMES_PAGE = 'GamesPage'
export const STATISTIC_PAGE = 'StatisticPage'

export const ROUTING_PAGES = {
  'главная': MAIN_PAGE,
  'учебник': TUTORIAL_PAGE,
  'игры': GAMES_PAGE,
  'статистика': STATISTIC_PAGE,
}

export const PAGE_OF_CATEGORIES = [
  {
    id: 1,
    title: 'first category',
    access: true
  },
  {
    id: 2,
    title: 'second category',
    access: true
  },
  {
    id: 3,
    title: 'third category',
    access: true
  },
  {
    id: 4,
    title: 'fourth category',
    access: true
  },
  {
    id: 5,
    title: 'fifth category',
    access: true
  },
  {
    id: 6,
    title: 'sixth category',
    access: true
  },
  {
    id: 7,
    title: 'very difficult words',
    access: false
  },
]

export const CUR_PAGE = 'sergioivanov008_curPage'

export default Url


