import React, { useContext } from 'react'

import './Main.css'
import { FormStatus } from '@/components/context'
import { DT_SIGNIN, DT_REGISTER, DT_UPDATE } from '@/components/const'
import FormSignIn from '@/components/forms/FormSiignIn'
import FormRegister from '@/components/forms/FormRegister'
import FormUpdate from '@/components/forms/FormUpdate'

function Main() {
  const { dialogType } = useContext(FormStatus)

  let curForm

  switch (dialogType) {
    case DT_SIGNIN:
      curForm = <FormSignIn />
      break
    case DT_REGISTER:
      curForm = <FormRegister />
      break
    case DT_UPDATE:
      curForm = <FormUpdate />
      break
    default:
      break
  }

  return <div className="main">{curForm}</div>
}

export default Main
