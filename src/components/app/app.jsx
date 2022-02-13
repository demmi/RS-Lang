import React, { useState } from 'react'
import ResponsiveAppBar from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Main from '@/components/main/Main'
import IsLogged, { FormStatus, PageRouter, Category, Page } from '@/components/context'
import { DT_DISABLED, CUR_PAGE, MAIN_PAGE } from '@/components/const';

const curPage = sessionStorage.getItem(CUR_PAGE)
  ? sessionStorage.getItem(CUR_PAGE)
  : MAIN_PAGE;

function App() {
  const [isLogged, setLogged] = useState(false)
  const [dialogType, setDialogType] = useState(DT_DISABLED)
  const [routerPage, setRouterPage] = useState(curPage)
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);

  return (
    <IsLogged.Provider value={{ isLogged, setLogged }}>
      <FormStatus.Provider value={{ dialogType, setDialogType }}>
        <PageRouter.Provider value={{ routerPage, setRouterPage }}>
          <Category.Provider value={{ category, setCategory }}>
            <Page.Provider value={{ page, setPage }}>
              <>
                <ResponsiveAppBar />
                <Main />
                <Footer />
              </>
            </Page.Provider>
          </Category.Provider>
        </PageRouter.Provider>
      </FormStatus.Provider>
    </IsLogged.Provider>
  )
}

export default App
