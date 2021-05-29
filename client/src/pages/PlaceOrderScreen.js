import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from '../actions/OrderActions';
import { ORDER_CREATE_RESET } from '../constants/OrderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Shipping</div>
                <div className="card-body">
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-header">Payment</div>
                <div className="card-body">
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-header" contentEditable="true">
                  {" "}
                  <h2>Order Items</h2>{" "}
                </div>
                <div className="card-body">
                  {cart.cartItems.map((item) => (
                    <div className="row" key={item.product}>
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-6">
                            <img
                              className="img-fluid d-block"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-body">
                                <h6>
                                  {" "}
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </h6>
                                <h5>Qty: {item.qty}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h5 className="text-right">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn-primary btn-block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
                  <h5 className="card-title">Order Summary</h5>
                  <h6> Items : ${cart.itemsPrice.toFixed(2)}</h6>
                  <h6> Shipping : ${cart.shippingPrice.toFixed(2)}</h6>
                  <h6> Tax : ${cart.taxPrice.toFixed(2)}</h6>
                  <h6> Order Total : ${cart.totalPrice.toFixed(2)}</h6>
                </div>
                {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
