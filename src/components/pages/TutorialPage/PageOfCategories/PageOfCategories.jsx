import React, { useContext } from 'react'

import { Button, Divider, Stack } from '@mui/material'
import IsLogged, { Category } from '@/components/context';
import { PAGE_OF_CATEGORIES } from '@/components/const';

function PageOfCategories() {
  const { category, setCategory } = useContext(Category)
  const { isLogged } = useContext(IsLogged)

  const handleClickCategory = (event) => {
    const curTitle = event.target.innerText.toLowerCase();
    const curId = PAGE_OF_CATEGORIES.find((el) => el.title === curTitle).id
    setCategory(curId)
  }

  return (
    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />} alignItems="center" >
      {PAGE_OF_CATEGORIES.map((el) => (
        <Button color={el.id === category ? 'primary': 'inherit'} variant={el.id === category ? 'contained' : 'outlined'} key={el.id} onClick={handleClickCategory}
          sx={{ width: '200px'}} disabled={ (!isLogged && !el.access) } >
          { el.title }
        </Button>
        ))
      }
    </Stack>
  );
}

export default PageOfCategories
