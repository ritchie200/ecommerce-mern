import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/CartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div>
        <h1>Payment Method</h1>
      </div>
      <div className="contact-clean">
        <form onSubmit={submitHandler}>
          <h2 className="text-center">Select Payment Method</h2>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <div className="form-check"><input className="form-check-input" type="radio" group="payment" id="formCheck-1" required
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)} /><label className="form-check-label" htmlFor="formCheck-1">La Paypal</label></div>
              </div>
            </div>
          </div>
          <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-2" group="payment" required
                      onChange={(e) => setPaymentMethod(e.target.value)} /><label className="form-check-label" htmlFor="formCheck-2">La Stripe</label></div>
          <div className="form-group text-center"><button className="btn btn-primary" type="submit">CONTINUE&nbsp;</button></div>
        </form>
      </div>
 </div>
  );
}
