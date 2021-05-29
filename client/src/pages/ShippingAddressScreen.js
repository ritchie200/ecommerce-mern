import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/CartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push('/payment');
  };
  return (
    <div>
    <CheckoutSteps step1 step2></CheckoutSteps>
      <div>
        <h3>Shipping Address</h3>
      </div>
      <div className="contact-clean">
        <form onSubmit={submitHandler}>
          <div className="form-group text-center"><input className="form-control" type="text" name="fullname" placeholder="Full Name" style={{margin: '10px 0px 0px 0px'}} required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} /><small className="form-text text-danger">Please enter a full name.</small><input className="form-control" type="text" name="address" placeholder="Address" required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} /><small className="form-text text-danger">Please enter a address.</small><input className="form-control" type="text" name="city" placeholder="City" required
                    value={city}
                    onChange={(e) => setCity(e.target.value)} /><small className="form-text text-danger">Please enter a city.</small><input className="form-control" type="text" name="country" placeholder="Country" /><small className="form-text text-danger">Please enter a country.</small><input className="form-control" type="text" name="postalcode" placeholder="Postal Code" required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)} /><small className="form-text text-danger">Please enter a postal code.</small></div>
          <div className="form-group text-center"><button className="btn btn-primary" type="submit">CONTINUE</button></div>
        </form>
      </div>
    </div>
  );
}