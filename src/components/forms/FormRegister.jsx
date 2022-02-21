import React, { useContext, useState } from 'react'
import '@/components/forms/StylesForms.css'
import { FormStatus } from '@/components/context'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { DT_DISABLED, DT_REGISTER, DT_REG_OK } from '@/components/const';
import createUser from '@/components/api/createUser';

/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */

let nameRegValue = ''
let emailRegValue = ''
let passRegValue = ''

function FormRegister() {
    const { dialogType, setDialogType } = useContext(FormStatus)
    const [{ isNameError, errorNameText }, setNameError] = useState({ isNameError: false, errorNameText: '' })
    const [{ isMailError, errorMailText }, setMailError] = useState({ isMailError: false, errorMailText: '' })
    const [{ isPassError, errorPassText }, setPassError] = useState({ isPassError: false, errorPassText: '' })

    const handleClose = () => {
        setDialogType(DT_DISABLED)
    }

    const handleRegistration = async () => {
        const response = await createUser(nameRegValue, emailRegValue, passRegValue)

        if (response.statusCode !== 417 && response.statusCode !== 422) {
            setDialogType(DT_REG_OK)
        }

        if (response.statusCode === 417) {
            setMailError({ isMailError: true, errorMailText: response.body })
        }

        if (response.statusCode === 422) {
            response.body.forEach((el) => {
                const tempArr = el.message.split('"')

                if (tempArr[1] === 'name') {
                    setNameError({ isNameError: true, errorNameText: el.message })
                }

                if (tempArr[1] === 'email') {
                    setMailError({ isMailError: true, errorMailText: el.message })
                }

                if (tempArr[1] === 'password') {
                    setPassError({ isPassError: true, errorPassText: el.message })
                }
            })
        }
    }

    const handleName = event => {
        setNameError({ isNameError: false, errorNameText: '' })
        nameRegValue = event.target.value
    }

    const handleMail = event => {
        setMailError({ isMailError: false, errorMailText: '' })
        emailRegValue = event.target.value
    }

    const handlePass = event => {
        setPassError({ isPassError: false, errorPassText: '' })
        passRegValue = event.target.value
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
                    onChange={handleName}
                    error={isNameError}
                    helperText={errorNameText}
                />
                <TextField
                    margin='dense'
                    id='mail-reg'
                    label='Email Address'
                    type='email'
                    fullWidth
                    onChange={handleMail}
                    error={isMailError}
                    helperText={errorMailText}
                />
                <TextField
                    margin='dense'
                    id='pass-reg'
                    label='Password'
                    type='password'
                    fullWidth
                    onChange={handlePass}
                    error={isPassError}
                    helperText={errorPassText}
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
