import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../actions/CartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  return (
       <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" contenteditable="true"> Shopping Cart </div>
            <div class="card-body">
            {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <a href="/shop" >Go Shopping</a>
          </MessageBox>
        ) : (
            cartItems.map((item) => (
              <div class="row" key={item.product}>
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-6"><img class="img-fluid d-block" src={item.image}
                      alt={item.name} width="150"/></div>
                    <div class="col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <h6> <a href={`/product/${item.product}`}>{item.name}</a></h6>
                          <h6>Qty:  <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-6">
                      <h5 class="">${item.price}</h5>
                    </div>
                    <div class="col-md-6 text-right"><button class="btn-primary" onClick={() => removeFromCartHandler(item.product)}><i class="fa fa-trash fa-fw fa-1x py-1"></i></button></div>
                  </div>
                </div>
              </div> )))}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <h6>  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h6>
              <a  disabled={cartItems.length === 0} class="btn btn-primary btn-block" href='/signin?redirect=shipping' >Proceed to checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}