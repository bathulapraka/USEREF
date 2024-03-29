import React, { useRef,useImperativeHandle } from "react";
import classes from "./Input module.css";
// import Login from "../components/Login/Login";

const Input = (props) => {
    const inputref=useRef();

    const activate=()=>{
        inputref.current.focus();
    }
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
export default Input;
