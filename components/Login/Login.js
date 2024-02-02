import React, { useState, useReducer,useEffect, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
// import AuthContext from "../../store/AuthContext";
import Input from "../UI/input/input";
const emailreducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isvalid: state.value.includes("@") };
  }
  return { value: "", isvalid: false };
};
const PassWordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.val, isvalid: action.val.trim().length > 6 };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isvalid: state.value.trim().length > 6 };
  }
  return { value: "", isvalid: false };
};

const Login = (props) => {
 
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailstate] = useReducer(emailreducer, {
    value: "",
    isvalid: false,
  });
  const [PassState, DispatchState] = useReducer(PassWordReducer, {
    value: "",
    isvalid: false,
  });

  const emailInputref = useRef();
  const passwordref = useRef();
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailState.isvalid && PassState.isvalid);
    }, 500);
  
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState, PassState]);
  
  const emailChangeHandler = (event) => {
    dispatchEmailstate({ type: "user_input", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && event.target.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    DispatchState({ type: "USER_PASSWORD", val: event.target.value });
    setFormIsValid(emailState.isvalid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmailstate({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    DispatchState({ type: "input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, PassState.value);
    } else if (!emailState.isvalid) {
      emailInputref.current.focus();
    
    } else  {
      passwordref.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputref}
          id="email"
          label="E-Mail"
          type="email"
          isvalid={emailState}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordref}
          id="password"
          label="password"
          type="password"
          isvalid={PassState}
          value={PassState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

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
