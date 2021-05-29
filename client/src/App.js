import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import createHistory from 'history/browser'
import Shop from './pages/Shop';
import {Home} from './pages/Home';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import { signout } from './actions/UserActions';
import RegisterScreen from './pages/RegisterScreen';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import OrderHistoryScreen from './pages/OrderHistoryScreen';
import ProfileScreen from './pages/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import OrdersScreen from './pages/OrdersScreen';
import ContactScreen from './pages/ContactScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <div>
      <BrowserRouter>
      <div>
        <div>
          <div className={window.location.pathname == '/home' || window.location.pathname=='/'
            ? 'header-dark':''} style={{filter: 'brightness(98%)'}}><div className="header2 bg-success-gradiant">
              <div className>
              <nav className="navbar navbar-dark navbar-expand-md bg-dark navigation-clean-button">
              <div class="container"><a class="navbar-brand" href="#"><img src="assets/img/denisa.png" width="150rem" alt="wrapkit" /></a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse"
                id="navcol-1">
                 <ul className="nav navbar-nav">
            <li className="nav-item active"><a className="nav-link" href="/home">Home</a></li>
                      <li className="nav-item"><a className="nav-link" href="/shop">Shop</a></li>
                      <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
                      <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
                      {userInfo && !userInfo.isAdmin && <li className="nav-item dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">{userInfo.name} </a>
                <div className="dropdown-menu">
                <a className="dropdown-item" href="/profile">Profile</a>
                <a className="dropdown-item" href="/orderhistory">Order History</a>
                <a className="dropdown-item" href="/signIn" onClick={signoutHandler} >Sign Out</a>
                </div>
              </li>}
              {userInfo && userInfo.isAdmin && <li  className="nav-item dropdown"><a className="dropdown-toggle nav-link"  data-toggle="dropdown" aria-expanded="false" href="#">{userInfo.name} </a>
                <div className="dropdown-menu" style={{zIndex:99999,position:"absolute"}}>
                <a className="dropdown-item" href="/dashboard">Dashboard</a>
               <a className="dropdown-item" href="/productlist">Products</a>
                <a className="dropdown-item" href="/orderlist">Manage Orders</a>
                <a className="dropdown-item" href="/manageusers">Users</a>
                <a className="dropdown-item" href="/profile">Profile</a>
                <a className="dropdown-item" href="/orderhistory">Order History</a>
                <a className="dropdown-item" href="/signIn" onClick={signoutHandler}>Sign Out</a>
                </div>
              </li>}
              <li className="nav-item"> <a className="nav-link" href="/cart">
              Cart{cartItems.length > 0 && (
                <div className="badge badge-primary">{cartItems.length}</div>
              )}</a> </li> 
            </ul>
            <p className="ml-auto navbar-text actions" style={{marginBottom: '7px', float: 'right', display: 'block'}}>
            {userInfo ==null && <a className="btn btn-light action-button" href="/signIn">Sign In</a>}{' '}
            {userInfo ==null && <a className="btn btn-light action-button" href="/register">Sign Up</a>}
            </p>
            </div>
        </div>
      </nav>
              </div>
            </div>
            {window.location.pathname == '/home' || window.location.pathname=='/'
            ?
            <div className="container hero">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <h1 className="text-center d-none d-md-block" style={{color: 'rgb(8,8,8)', fontFamily: 'Bitter, serif', fontSize: '50px', textAlign: 'center', filter: 'brightness(110%) contrast(110%)'}}>Welcome to Denisa Kart</h1><img className="img-fluid" src="assets/img/pexels-magda-ehlers-2861655.jpg" /></div>
              </div>
            </div>:null}
          </div>
          <Route exact path = "/" component = {Home} />
         <Route path = "/home" component = {Home} />
         <Route path = "/shop" component = {Shop} />
         <Route path = "/product/:id" component = {ProductScreen} exact  />
         <Route path="/cart/:id?" component={CartScreen}></Route>
         <Route path = "/signIn" component = {LoginScreen} />
         <Route path="/register" component={RegisterScreen}></Route>
         <Route path="/shipping" component={ShippingAddressScreen}></Route>
         <Route path="/payment" component={PaymentMethodScreen}></Route>
         <Route path="/placeorder" component={PlaceOrderScreen}></Route>
         <Route path="/order/:id" component={OrderScreen}></Route>
         <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
         <Route path="/category/:id" component={Shop} />
         <Route path="/contact" component={ContactScreen}></Route>
         <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
         <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
            <AdminRoute
            path="/orderlist"
            component={OrdersScreen}
          ></AdminRoute>
         <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
        </div>
        <div className="footer-dark">
          <footer>
            <div className="container">
              <div className="row">
                <div id="about" className="col-sm-6 col-md-3 item">
                  <h3>About Us</h3>
                  <ul>
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    <li><a href="#">Privacy</a></li>
                  </ul>
                </div>
                <div className="col-md-6 item text">
                  <h3>Denisa Kart</h3>
                  <p>180 Landis Circle, Auburn Usa</p>
                </div>
                <div className="col item social"><a href="#"><i className="icon ion-social-facebook" /></a><a href="#"><i className="icon ion-social-twitter" /></a></div>
              </div>
              <p className="copyright">Denisa Kart © 2020</p>
            </div>
          </footer>
        </div>
      </div>
      </BrowserRouter>
      </div>
  
  
  );
}

export default App;
