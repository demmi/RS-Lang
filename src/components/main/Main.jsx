import React, { useContext } from 'react'

import './Main.css'
import IsLogged, { FormStatus, PageRouter } from '@/components/context'
import {
  DT_SIGNIN,
  DT_REGISTER,
  DT_REG_OK,
  MAIN_PAGE,
  TUTORIAL_PAGE,
  GAMES_PAGE,
  STATISTIC_PAGE,
  TUTORIAL_CHOICE,
  DT_GAME_RESULTS,
  LOAD_GAME,
} from '@/components/const'
import FormSignIn from '@/components/forms/FormSiignIn'
import FormRegister from '@/components/forms/FormRegister'
import FormRegOk from '@/components/forms/FormRegOk'
import FormGameRusults from '@/components/forms/FormGameRusults'
import MainPage from '@/components/pages/MainPage/MainPage'
import TutorialPage from '@/components/pages/TutorialPage/TutorialPage'
import StatisticPage from '@/components/pages/StatisticPage/StatisticPage'
import SelectGame from '@/components/pages/GamesPage/SelectGame'
import LoadGame from '@/components/pages/GamesPage/LoadGame'
import TutorialChoice from '../pages/TutorialChoice/TutorialChoice'

function Main() {
  const { dialogType } = useContext(FormStatus)
  const { routerPage } = useContext(PageRouter)
  const { isLogged } = useContext(IsLogged)

  let curForm
  let curPage

  switch (dialogType) {
    case DT_SIGNIN:
      curForm = <FormSignIn />
      break
    case DT_REGISTER:
      curForm = <FormRegister />
      break
    case DT_REG_OK:
      curForm = <FormRegOk />
      break
    case DT_GAME_RESULTS:
      curForm = <FormGameRusults />
      break
    default:
      break
  }

  // sessionStorage.setItem(CUR_ROUTER_PAGE, routerPage);
  // sessionStorage.setItem(CUR_CATEGORY, category);
  // sessionStorage.setItem(CUR_CATEGORY_PAGE, page);

  if(routerPage === STATISTIC_PAGE && isLogged) {
    curPage = <StatisticPage />
  } else {
    switch (routerPage) {
      case MAIN_PAGE:
        curPage = <MainPage />
        break
      case TUTORIAL_PAGE:
        curPage = <TutorialPage />
        break
      case TUTORIAL_CHOICE:
        curPage = <TutorialChoice />
        break
      case GAMES_PAGE:
        curPage = <SelectGame />
        break
      case LOAD_GAME:
        curPage = <LoadGame />
        break
      default:
        curPage = <p>Для просмотра статистики войдите или зарегистрируйтесь</p>
        break
    }
  }

  return (
    <div className="main">
      {curForm}
      {curPage}
    </div>
  )
}

export default Main
