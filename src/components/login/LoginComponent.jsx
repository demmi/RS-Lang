import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import signIn from '@/components/api/signIn'
import '@/components/login/LoginComponent.css'
import IsLogged from '@/components/context'
import RegisterComponent from '@/components/register/RegisterComponent'

/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */
let emailValue = ''
let passValue = ''

function LoginComponent() {
  const [open, setOpen] = useState(false)
  const { setLogged } = useContext(IsLogged)
  const [{ isMailError, errorMailText }, setMailError] = useState({ isMailError: false, errorMailText: '' })
  const [{ isPassError, errorPassText }, setPassError] = useState({ isPassError: false, errorPassText: '' })

  const [openReg, setOpenReg] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogin = async () => {
    const response = await signIn(emailValue, passValue)
    setPassError({ isPassError: false, errorPassText: '' })
    setMailError({ isMailError: false, errorMailText: '' })

    if (typeof (await response) === 'object') {
      localStorage.demmiUserToken = await response.token
      localStorage.demmiRefrechToken = await response.refreshToken
      localStorage.demmiUserId = await response.userId
      localStorage.demmiName = await response.name
      setLogged(true)
      handleClose()
    }
    if ((await response) === 403) {
      setPassError({ isPassError: true, errorPassText: 'Incorrect password' })
    }
    if ((await response) === 404) {
      setMailError({ isMailError: true, errorMailText: `User not found` })
    }
  }

  const handlePass = event => {
    passValue = event.target.value
  }

  const handleRegister = () => {
    handleClose()
    setOpenReg(true)
    console.log('handleRegister, openReg=', openReg)
  }

  const handleCloseReg = () => {
    setOpenReg(false)
    console.log('handleCloseReg, openReg=', openReg)
  }

  const handleMail = event => {
    emailValue = event.target.value
  }

  return (
    <Box>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>Log in to get full access</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mail"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleMail}
            error={isMailError}
            helperText={errorMailText}
          />
          <TextField
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
            onChange={handlePass}
            error={isPassError}
            helperText={errorPassText}
          />
        </DialogContent>
        <DialogActions className="btn-group">
          <Box>
            <Button onClick={handleRegister} color="primary" variant="outlined">
              Registration
            </Button>
          </Box>
          <Box>
            <Button onClick={handleLogin} color="primary">
              Log in
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <RegisterComponent openReg={openReg} handleCloseReg={handleCloseReg} />
    </Box>
  )
}
export default LoginComponent
