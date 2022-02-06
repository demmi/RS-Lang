import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'

function LoginComponent() {
    const [open, setOpen] = React.useState(false);
    /* const [emailValue, setEmail] = React.useState('')
    const [passValue, setPass] = React.useState('') */
    let emailValue = ''
    let passValue = ''

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogin = () => {
        handleClose();
        console.log(passValue, emailValue);
    }

    const handlePass = (event) => {
        passValue = event.target.value
    }

    const handleMail = (event) => {
        emailValue = event.target.value
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
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                    <Button onClick={handleLogin} color='primary'>Log in</Button>
                </DialogActions>

            </Dialog>
        </Box>
    );
};
export default LoginComponent;
