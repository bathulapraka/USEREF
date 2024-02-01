import React, { useState, useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailreducer=(state,action)=>{
  if(action.type==='user_input'){
    return {value:action.val , isvalid:action.val.includes('@')};
  }
  if(action.type==='input_blur'){
    return {value:state.value,isvalid:state.value.includes('@')};
  }
return {value:'',isvalid:false};
}
const PassWordReducer=(state,action)=>{
   if(action.type==='USER_PASSWORD'){
    return({value:action.val,isvalid:action.val.trim().length>6});
   }
   if(action.type==='input_blur'){
    return {value:state.value,isvalid:state.value.trim().length>6};
   }
   return {value :'',isvalid:false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState,dispatchEmailstate]=useReducer(emailreducer,{
    value:'',
    isvalid:false,
  });
  const[PassState,DispatchState]=useReducer(PassWordReducer,{
    type:'',
    isvalid:false,
  });

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmailstate({type:'user_input',val:event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
   DispatchState({type:'USER_PASSWORD',val:event.target.value})
    setFormIsValid(
      emailState.isvalid && event.target.value.trim().length > 6
    );
  };
 
  const validateEmailHandler = () => {
     
 dispatchEmailstate({type:'input_blur'})
  };

  const validatePasswordHandler = () => {
    DispatchState ({type: 'input_blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, PassState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            PassState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={PassState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
