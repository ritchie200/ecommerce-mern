import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/OrderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/OrderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const { order, loading, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (

    <div>
    <h3>Order {order._id}</h3>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Shipping</div>
                <div className="card-body">
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
                </div>
              </div>
              <div className="card">
                <div className="card-header">Payment</div>
                <div className="card-body">
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
                </div>
              </div>
              <div className="card">
                <div className="card-header" contentEditable="true">
                  {" "}
                  <h2>Order Items</h2>{" "}
                </div>
                <div className="card-body">
                  {order.orderItems.map((item) => (
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
                  <h5 className="card-title">Order Summary</h5>
                  <h6> Items : ${order.itemsPrice.toFixed(2)}</h6>
                  <h6> Shipping : ${order.shippingPrice.toFixed(2)}</h6>
                  <h6> Tax : ${order.taxPrice.toFixed(2)}</h6>
                  <h6> Order Total : ${order.totalPrice.toFixed(2)}</h6>
                  {!order.isPaid && (
                <div>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </div>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}