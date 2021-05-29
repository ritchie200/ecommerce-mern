import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../actions/ProductActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/ProductConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h4>Products</h4>
          </div>
          <div className="col text-right">
            <button
              onClick={createHandler}
              className="btn btn-primary"
              type="button"
            >
              Add product&nbsp;
              <i
                className="icon ion-android-add-circle"
                style={{ fontSize: "20px;" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div class="card-body">
          <div class="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td class="flex-grow-0">{product._id}</td>
                    <td class="flex-grow-0">{product.name}</td>
                    <td class="flex-grow-0">{product.price}</td>
                    <td class="flex-grow-0">{product.category}</td>
                    <td class="flex-grow-0">{product.brand}</td>
                    <td class="d-flex flex-row justify-content-center">
                      <button
                        class="btn btn-primary align-self-center"
                        type="button"
                        onClick={() =>
                          props.history.push(`/product/${product._id}/edit`)
                        }
                      >
                        <i class="icon ion-edit"></i>
                      </button>
                      <button
                        class="btn btn-primary align-self-center"
                        type="button"
                        onClick={() => deleteHandler(product)}
                      >
                        <i class="icon ion-android-delete"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav className="float-left">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
