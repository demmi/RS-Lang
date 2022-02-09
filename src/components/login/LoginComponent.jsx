import React, { useContext } from 'react'
import {
  Box,
  Button,
} from '@mui/material'
import { FormStatus } from '@/components/context';
import { DT_SIGNIN } from '@/components/const';


/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */

function LoginComponent() {
  const { setDialogType } = useContext(FormStatus)

  const handleClickOpen = () => {
    setDialogType(DT_SIGNIN)
  }

  return (
    <Box>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>
    </Box>
  )
}
export default LoginComponent
