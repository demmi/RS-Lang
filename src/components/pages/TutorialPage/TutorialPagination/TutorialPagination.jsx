import React, { useContext } from 'react'

import { Pagination } from '@mui/material'
import { Page, PaginationCount } from '@/components/context'

function TutorialPagination() {
  const { page, setPage } = useContext(Page)
  const { paginationCount } = useContext(PaginationCount)

  const handlerPage = (event, value) => {
    setPage(+value - 1)
  }

  return (
    <Pagination
      count={+paginationCount}
      defaultPage={1}
      siblingCount={1}
      color="secondary"
      onChange={handlerPage}
      page={+page + 1}
    />
  )
}

export default TutorialPagination
