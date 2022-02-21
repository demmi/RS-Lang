import React, { useContext } from 'react'
import '@/components/forms/StylesForms.css'
import { FormStatus } from '@/components/context'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { DT_DISABLED, DT_REG_OK } from '@/components/const';

function FormRegOk() {
    const { dialogType, setDialogType } = useContext(FormStatus)
    const handleClose = () => {
        setDialogType(DT_DISABLED)
    }

    const isOpen = dialogType === DT_REG_OK;

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>

            <DialogTitle id='form-regok-title'>Congratulations!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                  You have successfully registered in the application.
                  Now you can login to the app using your login details.
                </DialogContentText>
            </DialogContent>
            <DialogActions className="btn-center">
                <Button onClick={handleClose} color='primary' variant='outlined'>OK</Button>
            </DialogActions>

        </Dialog>
    );
};

export default FormRegOk;
