import React, { useContext } from 'react';

import './Main.css';
import { FormStatus, PageRouter, Category } from '@/components/context';
import { DT_SIGNIN, DT_REGISTER, DT_REG_OK, MAIN_PAGE, TUTORIAL_PAGE,
  GAMES_PAGE, STATISTIC_PAGE, TUTORIAL_CHOICE, CUR_PAGE, CUR_CATEGORY
} from '@/components/const';
import FormSignIn from '@/components/forms/FormSiignIn';
import FormRegister from '@/components/forms/FormRegister';
import FormRegOk from '@/components/forms/FormRegOk';
import MainPage from '@/components/pages/MainPage/MainPage';
import TutorialPage from '@/components/pages/TutorialPage/TutorialPage';
import GamesPage from '@/components/pages/GamesPage/GamesPage';
import StatisticPage from '@/components/pages/StatisticPage/StatisticPage';
import TutorialChoice from '../pages/TutorialChoice/TutorialChoice';

function Main() {
  const { dialogType } = useContext(FormStatus)
  const { routerPage } = useContext(PageRouter)
  const { category } = useContext(Category)

  let curForm;
  let curPage;

  switch (dialogType) {
    case DT_SIGNIN:
      curForm = (<FormSignIn />)
      break;
    case DT_REGISTER:
      curForm = (<FormRegister />)
      break;
    case DT_REG_OK:
      curForm = (<FormRegOk />)
      break;
    default:
      break;
  }

  sessionStorage.setItem(CUR_PAGE, routerPage);
  sessionStorage.setItem(CUR_CATEGORY, category);

  switch (routerPage) {
    case MAIN_PAGE:
      curPage = (<MainPage/>)
      break;
    case TUTORIAL_PAGE:
      curPage = (<TutorialPage/>)
      break;
    case TUTORIAL_CHOICE:
      curPage = (<TutorialChoice/>)
      break;
    case GAMES_PAGE:
      curPage = (<GamesPage/>)
      break;
    case STATISTIC_PAGE:
      curPage = (<StatisticPage/>)
      break;
    default:
      break;
  }

  // console.log('function Main', routerPage)

  return (
    <div className="main">
      {curForm}
      {curPage}
    </div>
  );
};

export default Main;
