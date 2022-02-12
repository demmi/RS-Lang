import React, { useContext } from 'react'

import { Pagination } from '@mui/material'
import { Page } from '@/components/context'

function TutorialPagination() {
  const { page, setPage } = useContext(Page)

  const handlerPage = (event, value) => {
    setPage(value)
  }

  return (
    <Pagination count={30} defaultPage={1} siblingCount={1} color="secondary" onChange={handlerPage} page={page} />
  );
}

export default TutorialPagination

