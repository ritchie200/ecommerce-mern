import React, { useEffect, useState } from "react";
import axios from "axios";
import { productList, sortList, items } from "../data/ProductData";
import Product from "../components/Products";
import Dropdown from "../components/Dropdown";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";

export default function Shop(props) {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState(
    props.match.params.id ? props.match.params.id : ""
  );
  //const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption == null) setCategory("");
    else setCategory(selectedOption.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const handleSortChange = (selectedOption) => {
    if (selectedOption == null) setSortOrder("");
    else setSortOrder(selectedOption.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (

    <div>
      <ul className="breadcrumbs">
      <li className="first"><a href="/home" className="icon-home"></a></li>
      {category && <li className="last active"><a>{category}</a></li>}
      </ul>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Dropdown
                placeholder={"Select Category"}
                data={items}
                handleChange={handleCategoryChange}
              />
            </div>
            <div className="col-md-4">
              <form className="form-inline" onSubmit={submitHandler}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="inlineFormInputGroup"
                    placeholder="Search"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4">
              <Dropdown
                placeholder={"Sort By"}
                data={sortList}
                handleChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </div>
 
      <div className="row">
        <div className="col">
          {" "}
          <div className="presentacion"></div>
          <div className="contenedor">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
