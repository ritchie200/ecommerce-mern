import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
export default function ContactScreen(props) {
    return (
        <div className="contact-clean">
        <form method="post">
          <h2 className="text-center">Contact us</h2>
          <div className="form-group"><input className="form-control" type="text" name="name" placeholder="Name" /></div>
          <div className="form-group"><input className="form-control is-invalid" type="email" name="email" placeholder="Email" /><small className="form-text text-danger">Please enter a correct email address.</small></div>
          <div className="form-group"><textarea className="form-control" name="message" placeholder="Message" rows={14} defaultValue={""} /></div>
          <div className="form-group"><button className="btn btn-primary" type="submit">send </button></div>
        </form>
      </div>
    );
}