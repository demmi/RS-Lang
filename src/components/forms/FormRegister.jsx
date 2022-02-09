import React, { useContext } from 'react'
import '@/components/forms/StylesForms.css'
import { FormStatus } from '@/components/context'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { DT_DISABLED, DT_REGISTER } from '@/components/const';

/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */

function FormRegister() {
    const { dialogType, setDialogType } = useContext(FormStatus)

    const handleClose = () => {
        setDialogType(DT_DISABLED)
    }

    const handleRegistration = () => {
        console.log('start registration')
    }

    const isOpen = dialogType === DT_REGISTER;

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>

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
            <DialogActions className="btn-group">
                <Button onClick={handleRegistration} color='primary' variant='outlined'>Registration</Button>
                <Button onClick={handleClose} color='primary'>Cancel</Button>
            </DialogActions>

        </Dialog>
    );
};

export default FormRegister;
