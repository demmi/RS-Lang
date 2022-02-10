import React, { useState } from 'react'
import ResponsiveAppBar from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Main from '@/components/main/Main'
import IsLogged, { FormStatus, PageRouter } from '@/components/context'
import { DT_DISABLED, CUR_PAGE, MAIN_PAGE } from '@/components/const';

const curPage = sessionStorage.getItem(CUR_PAGE)
  ? sessionStorage.getItem(CUR_PAGE)
  : MAIN_PAGE;

function App() {
  const [isLogged, setLogged] = useState(false)
  const [dialogType, setDialogType] = useState(DT_DISABLED)
  const [routerPage, setRouterPage] = useState(curPage)

  return (
    <IsLogged.Provider value={{ isLogged, setLogged }}>
      <FormStatus.Provider value={{ dialogType, setDialogType }}>
        <PageRouter.Provider value={{ routerPage, setRouterPage }}>
          <>
            <ResponsiveAppBar />
            <Main />
            <Footer />
          </>
        </PageRouter.Provider>
      </FormStatus.Provider>
    </IsLogged.Provider>
  )
}

export default App
