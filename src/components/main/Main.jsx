import React, { useContext } from 'react';

import './Main.css';
import { FormStatus } from '@/components/context';
import { DT_SIGNIN, DT_REGISTER, DT_REG_OK } from '@/components/const';
import FormSignIn from '@/components/forms/FormSiignIn';
import FormRegister from '@/components/forms/FormRegister';
import FormRegOk from '@/components/forms/FormRegOk';

function Main() {
  const { dialogType } = useContext(FormStatus)

  let curForm;

  switch (dialogType) {
    case DT_SIGNIN:
      curForm = (<FormSignIn />)
      break;
    case DT_REGISTER:
      curForm = (<FormRegister />)
      break;
    case DT_REG_OK:
      curForm = (<FormRegOk />)
      break;
    default:
      break;
  }

  return (
    <div className="main">
      {curForm}
    </div>
  );
};

export default Main;