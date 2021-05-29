import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/UserActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      //props.history.push(redirect);
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="contact-clean">
            <form onSubmit={submitHandler}>
              <h2 className="text-center">Sign In</h2>
              <div className="form-group text-center">
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{margin: '10px 0px 0px 0px;'}}
                />
                <small className="form-text text-danger">
                  Please enter a correct email.
                </small>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Password"
                />
                <small className="form-text text-danger">
                  Passwords don't match.
                </small>
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary" type="submit">
                  SUBMIT&nbsp;
                </button>
              </div>
            </form>
          </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
    </div>
  );
}
