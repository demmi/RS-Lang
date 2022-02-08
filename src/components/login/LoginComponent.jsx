import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
// eslint-disable-next-line import/no-unresolved
import { makeStyles } from '@material-ui/core'
import signIn from '@/components/api/signIn'
import { styles } from '@/components/login/LoginComponent.styles'
import RegisterComponent from '@/components/register/RegisterComponent'

const useStyles = makeStyles(styles)
/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */

function LoginComponent() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [openReg, setOpenReg] = useState(false);
    const [, setLogged] = useState(false)
    /* const [emailValue, setEmail] = React.useState('')
    const [passValue, setPass] = React.useState('') */
    let emailValue = ''
    let passValue = ''
    const isError = false
    const errorText = ''



    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogin = async () => {
        const response = await signIn(emailValue, passValue)
        if (typeof await response === 'object') {
            setLogged(true)
            localStorage.demmiUserToken = await response.token
            localStorage.demmiRefrechToken = await response.refreshToken
            localStorage.demmiUserId = await response.userId
            localStorage.demmiName = await response.name
            handleClose()
        } else {
            console.log(response)
        }
    }

    const handlePass = (event) => {
        passValue = event.target.value
    }

    const handleMail = (event) => {
        emailValue = event.target.value
    }

    const handleRegister = () => {
        handleClose();
        setOpenReg(true);
        console.log('handleRegister, openReg=', openReg)
    }

    const handleCloseReg = () => {
        setOpenReg(false);
        console.log('handleCloseReg, openReg=', openReg)
    }

    return (
        <Box>
            <Button color='inherit' variant='outlined' onClick={handleClickOpen}>Log In</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Log in</DialogTitle>
                <DialogContent>
                    <DialogContentText>Log in to get full access</DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='mail'
                        label='Email Address'
                        type='email'
                        fullWidth
                        onChange={handleMail}
                        error = {isError}
                        helperText={errorText}
                    />
                    <TextField
                        margin='dense'
                        id='pass'
                        label='Password'
                        type='password'
                        fullWidth
                        onChange={handlePass}
                    />
                </DialogContent>
                <DialogActions className={classes.testClass}>
                    <Box>
                        <Button onClick={handleRegister} color='primary' variant="outlined">Registration</Button>
                    </Box>
                    <Box>
                        <Button onClick={handleLogin} color='primary'>Log in</Button>
                        <Button onClick={handleClose} color='primary'>Cancel</Button>
                    </Box>

                </DialogActions>

            </Dialog>

            <RegisterComponent openReg={openReg} handleCloseReg={handleCloseReg}/>

        </Box>
    );
};
export default LoginComponent;
