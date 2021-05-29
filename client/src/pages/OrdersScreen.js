import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/UserActions';
import { saveOrder, listOrders, deleteOrder } from '../actions/OrderActions';

function OrdersScreen(props) {
  console.log("dd")
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    // <div className="content content-margined">

    //   <div className="order-header">
    //     <h3>Orders</h3>
    //   </div>
    //   <div className="order-list">

    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>DATE</th>
    //           <th>TOTAL</th>
    //           <th>USER</th>
    //           <th>PAID</th>
    //           <th>PAID AT</th>
    //           <th>DELIVERED</th>
    //           <th>DELIVERED AT</th>
    //           <th>ACTIONS</th>
    //         </tr>
    //       </thead>
    //       <tbody>
            // {orders.map(order => (<tr key={order._id}>
            //   <td>{order._id}</td>
            //   <td>{order.createdAt}</td>
            //   <td>{order.totalPrice}</td>
            //   <td>{order.user.name}</td>
            //   <td>{order.isPaid.toString()}</td>
            //   <td>{order.paidAt}</td>
            //   <td>{order.isDelivered.toString()}</td>
            //   <td>{order.deliveredAt}</td>
            //   <td>
            //     <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
            //     {' '}
            //     <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
            //   </td>
            // </tr>))}
    //       </tbody>
    //     </table>

    //   </div>
    // </div>

    <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4>Orders</h4>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>USER</th>
                  <th>PAID</th>
                  <th>PAID AT</th>
                  <th>DELIVERED</th>
                  <th>DELIVERED AT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
              {orders.map(order => (<tr key={order._id}>
                  <td className="flex-grow-0">{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td className="flex-grow-0">{order.totalPrice}</td>
                  <td className="flex-grow-0">{order.user.name}</td>
                  <td className="flex-grow-0">{order.isPaid.toString()}</td>
                  <td className="flex-grow-0">{order.paidAt}</td>
                  <td className="flex-grow-0">{order.isDelivered.toString()}</td>
                  <td>{order.deliveredAt}</td>
                  <td className="d-flex flex-row justify-content-center"><a className="btn btn-primary align-self-center" href={"/order/" + order._id}><i className="icon ion-information-circled" style={{fontSize: '20px'}} /></a>{' '}<a onClick={() => deleteHandler(order)} className="btn btn-primary align-self-center" ><i className="icon ion-android-delete" /></a></td>
                  </tr>))}
              </tbody>
            </table>
          </div>
          <nav className="float-left">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item"><a className="page-link" href="#">5</a></li>
              <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
            </ul>
          </nav>
        </div>
      </div>
}
export default OrdersScreen;