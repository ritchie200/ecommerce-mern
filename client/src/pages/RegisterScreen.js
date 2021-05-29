import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/UserActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
 <div className="contact-clean">
 <form onSubmit={submitHandler}>
   <h2 className="text-center">Register</h2>
   <h5 className="text-center">Register an account for rich shopping experience</h5>
   {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
   <div className="form-group text-center"><input className="form-control" type="text" name="name" placeholder="Name" style={{margin: '10px 0px 0px 0px'}} required onChange={(e) => setName(e.target.value)} /><small className="form-text text-danger">Please enter a name.</small><input className="form-control" type="text" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
     <small className="form-text text-danger">Please enter a correct email address.</small><input className="form-control" type="text" name="password" placeholder="Password"  required
                      onChange={(e) => setPassword(e.target.value)} /><small className="form-text text-danger">Please enter a correct password.</small><input className="form-control" type="text" name="confirmpassword" placeholder="Confirm Password"  required
                      onChange={(e) => setConfirmPassword(e.target.value)} /><small className="form-text text-danger">Passwords don't match.</small></div>
   <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1" /><label className="form-check-label" htmlFor="formCheck-1">La I Agree with&nbsp;<a href="http://uat.appmediatech.com/#">Term and Conditions</a>&nbsp;of the service</label></div>
   <div className="form-group text-center"><button className="btn btn-primary" type="submit">SUBMIT&nbsp;</button></div>
 </form>
</div>
 );
}
