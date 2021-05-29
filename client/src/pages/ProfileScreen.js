import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/UserActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    // <div>
    //   <form className="form" onSubmit={submitHandler}>
    //     <div>
    //       <h1>User Profile</h1>
    //     </div>
    //     {loading ? (
    //       <LoadingBox></LoadingBox>
    //     ) : error ? (
    //       <MessageBox variant="danger">{error}</MessageBox>
    //     ) : (
    //       <>
    //         {loadingUpdate && <LoadingBox></LoadingBox>}
    //         {errorUpdate && (
    //           <MessageBox variant="danger">{errorUpdate}</MessageBox>
    //         )}
    //         {successUpdate && (
    //           <MessageBox variant="success">
    //             Profile Updated Successfully
    //           </MessageBox>
    //         )}
    //         <div>
    //           <label htmlFor="name">Name</label>
    //           <input
    //             id="name"
    //             type="text"
    //             placeholder="Enter name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="email">Email</label>
    //           <input
    //             id="email"
    //             type="email"
    //             placeholder="Enter email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="password">Password</label>
    //           <input
    //             id="password"
    //             type="password"
    //             placeholder="Enter password"
    //             onChange={(e) => setPassword(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="confirmPassword">confirm Password</label>
    //           <input
    //             id="confirmPassword"
    //             type="password"
    //             placeholder="Enter confirm password"
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label />
    //           <button className="primary" type="submit">
    //             Update
    //           </button>
    //         </div>
    //       </>
    //     )}
    //   </form>
    // </div>
 
 
      <div className="contact-clean">
        <form onSubmit={submitHandler}>
          <h2 className="text-center">Profile</h2>
               {loading ? (
           <LoadingBox></LoadingBox>
         ) : error ? (
           <MessageBox variant="danger">{error}</MessageBox>
         ) : (
           <>
             {loadingUpdate && <LoadingBox></LoadingBox>}
             {errorUpdate && (
               <MessageBox variant="danger">{errorUpdate}</MessageBox>
             )}
             {successUpdate && (
               <MessageBox variant="success">
                 Profile Updated Successfully
               </MessageBox>
             )}
          <div className="form-group text-center">
          <img className="img-fluid" src="assets/img/2.jpg" />
          <button className="btn btn-primary" type="button">CHANGE IMAGE&nbsp;<i className="icon ion-edit" /></button>
          <input className="form-control" type="text" name="name" placeholder="Name" style={{margin: '10px 0px 0px 0px'}} value={email}
          onChange={(e) => setEmail(e.target.value)} />
            <small className="form-text text-danger">Please enter a correct .</small>
            <input className="form-control" type="text" name="email" placeholder="Email"   value={email}
      onChange={(e) => setEmail(e.target.value)} />
            <small className="form-text text-danger">Please enter a correct email address.</small>
            <input className="form-control" type="text" name="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
            <small className="form-text text-danger">Please enter a correct password.</small>
            <input className="form-control" type="text" name="confirmpassword" placeholder="Confirm Password"  onChange={(e) => setConfirmPassword(e.target.value)} />
            <small className="form-text text-danger">Passwords don't match.</small>
            </div>
          <div className="form-group text-center"><button className="btn btn-primary" type="submit">UPDATE&nbsp;</button>
          </div>
          </>
         )}
       </form>
     </div>
 
 );
}