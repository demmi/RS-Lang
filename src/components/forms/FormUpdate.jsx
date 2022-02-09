import React, { useContext } from 'react'
import '@/components/forms/StylesForms.css'
import { FormStatus } from '@/components/context'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DT_DISABLED, DT_UPDATE } from '@/components/const'
import updateUser from '@/components/api/updateUser'

/* test user 'Andrew', 'aa@aa.ru', 'andrew123' */
let emailValue = ''
let passValue = ''

function FormUpdate() {
  const { dialogType, setDialogType } = useContext(FormStatus)

  const handleClose = () => {
    setDialogType(DT_DISABLED)
  }

  const handleMail = event => {
    emailValue = event.target.value
  }

  const handlePass = event => {
    passValue = event.target.value
  }

  const handleSave = async () => {
    const response = updateUser(localStorage.demmiUserToken, emailValue, passValue, localStorage.demmiUserToken)
    console.log(await response)
  }

  const isOpen = dialogType === DT_UPDATE

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-registration-title">Edit User</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          margin="dense"
          id="name-reg"
          label="User Name"
          type="text"
          fullWidth
          value={`${localStorage.demmiName}`}
          // onChange={handleName}
        />
        <TextField
          margin="dense"
          id="mail-reg"
          label="Enter new Email Address"
          type="email"
          fullWidth
          onChange={handleMail}
        />
        <TextField
          margin="dense"
          id="pass-reg"
          label="Enter new Password"
          type="password"
          fullWidth
          onChange={handlePass}
        />
      </DialogContent>
      <DialogActions className="btn-group">
        <Button onClick={handleSave} color="primary" variant="outlined">
          Save
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormUpdate
