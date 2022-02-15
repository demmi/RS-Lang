import React, { useState } from 'react'
import ResponsiveAppBar from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Main from '@/components/main/Main'
import IsLogged, { FormStatus, PageRouter, Category, Page, PaginationCount } from '@/components/context'
import { DT_DISABLED, CUR_ROUTER_PAGE, MAIN_PAGE, CUR_CATEGORY, CUR_CATEGORY_PAGE, CUR_PAGINATION_COUNT } from '@/components/const';

const curRouterPage = sessionStorage.getItem(CUR_ROUTER_PAGE)
  ? sessionStorage.getItem(CUR_ROUTER_PAGE)
  : MAIN_PAGE;

  const curCategory = sessionStorage.getItem(CUR_CATEGORY)
  ? sessionStorage.getItem(CUR_CATEGORY)
  : null;

  const curPage = sessionStorage.getItem(CUR_CATEGORY_PAGE)
  ? sessionStorage.getItem(CUR_CATEGORY_PAGE)
  : 1;

  const curPaginationCount = sessionStorage.getItem(CUR_PAGINATION_COUNT)
  ? sessionStorage.getItem(CUR_PAGINATION_COUNT)
  : 30;

function App() {
  const [isLogged, setLogged] = useState(false)
  const [dialogType, setDialogType] = useState(DT_DISABLED)
  const [routerPage, setRouterPage] = useState(curRouterPage)
  const [category, setCategory] = useState(curCategory);
  const [page, setPage] = useState(curPage);
  const [paginationCount, setPaginationCount] = useState(curPaginationCount);

  console.log('routerPage:', routerPage, 'category:', category, 'page:', page, 'paginationCount:', paginationCount)

  return (
    <IsLogged.Provider value={{ isLogged, setLogged }}>
      <FormStatus.Provider value={{ dialogType, setDialogType }}>
        <PageRouter.Provider value={{ routerPage, setRouterPage }}>
          <Category.Provider value={{ category, setCategory }}>
            <Page.Provider value={{ page, setPage }}>
              <PaginationCount.Provider value={{ paginationCount, setPaginationCount }}>
                <>
                  <ResponsiveAppBar />
                  <Main />
                  <Footer />
                </>
              </PaginationCount.Provider>
            </Page.Provider>
          </Category.Provider>
        </PageRouter.Provider>
      </FormStatus.Provider>
    </IsLogged.Provider>
  )
}

export default App
