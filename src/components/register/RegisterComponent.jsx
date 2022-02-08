import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
// import signIn from '@/components/api/signIn'

/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */

function RegisterComponent({ openReg, handleCloseReg }) {
    console.log('RegisterComponent, openReg=', openReg);

    return (
        <Dialog open={openReg} onClose={handleCloseReg} aria-labelledby='form-dialog-title'>

            <DialogTitle id='form-registration-title'>Register New User</DialogTitle>
            <DialogContent>
                <DialogContentText>Registration</DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name-reg'
                    label='Name Registration'
                    type='text'
                    fullWidth
                    // onChange={handleMail}
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='mail-reg'
                    label='Email Address'
                    type='email'
                    fullWidth
                    // onChange={handleMail}
                />
                <TextField
                    margin='dense'
                    id='pass-reg'
                    label='Password'
                    type='password'
                    fullWidth
                    // onChange={handlePass}
                />
            </DialogContent>
            <DialogActions>
                <Button /* onClick={handleCloseReg} */ color='primary' variant='outlined'>Registration</Button>
                <Button /* onClick={handleCloseReg} */ color='primary'>Cancel</Button>
            </DialogActions>

        </Dialog>
    );
};

export default RegisterComponent;
