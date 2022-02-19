import React, { useContext } from 'react'

import './Main.css'
import { FormStatus, PageRouter, Category, Page } from '@/components/context'
import {
  DT_SIGNIN,
  DT_REGISTER,
  DT_REG_OK,
  MAIN_PAGE,
  TUTORIAL_PAGE,
  GAMES_PAGE,
  STATISTIC_PAGE,
  TUTORIAL_CHOICE,
  CUR_ROUTER_PAGE,
  CUR_CATEGORY,
  CUR_CATEGORY_PAGE,
  CALL_GAME,
  SPRINT_GAME,
  DT_GAME_RESULTS,
} from '@/components/const'
import FormSignIn from '@/components/forms/FormSiignIn'
import FormRegister from '@/components/forms/FormRegister'
import FormRegOk from '@/components/forms/FormRegOk'
import FormGameRusults from '@/components/forms/FormGameRusults';
import MainPage from '@/components/pages/MainPage/MainPage'
import TutorialPage from '@/components/pages/TutorialPage/TutorialPage'
import StatisticPage from '@/components/pages/StatisticPage/StatisticPage'
import SelectGame from '@/components/pages/GamesPage/SelectGame'
import CallGame from '@/components/games/callgame/CallGame'
import SprintGame from '@/components/games/SprintGame/SprintGame'
import TutorialChoice from '../pages/TutorialChoice/TutorialChoice'

function Main() {
  const { dialogType } = useContext(FormStatus)
  const { routerPage } = useContext(PageRouter)

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
    case STATISTIC_PAGE:
      curPage = <StatisticPage />
      break
    case CALL_GAME:
      curPage = <CallGame />
      break
    case SPRINT_GAME:
      curPage = <SprintGame />
      break
    default:
      break
  }

  // console.log('function Main', routerPage)

  return (
    <div className="main">
      {curForm}
      {curPage}
    </div>
  )
}

export default Main
