import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, saveProductReview } from "../actions/ProductActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/ProductConstants";
import Rating from "../components/Rating";
import Dropdown from "../components/Dropdown";
import { ratingItems } from "../data/ProductData";

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const handleRatingChange = (selectedOption) => {
    if (selectedOption == null) setRating("");
    else setRating(selectedOption.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <div>
        <div className="py-5">
              <div className="row">
                <div className="col-md-12">
                  <ul className="breadcrumbs">
                  <li className="first"><a href="/home" className="icon-home"></a></li>
                    <li>
                      <a href="/shop">Back to Shop</a>
                    </li>
                    <li className="last active"> <a>{product.name}</a></li>
                  </ul>
                </div>
              </div>
          </div>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex flex-column"><img className="img-fluid d-block" src={product.image} /></div>
          <div className="col">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <h6 className="text-muted card-subtitle mb-2">{product.brand}</h6>
                    <p className="card-text">Description:&nbsp;{product.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Price :&nbsp; $56</h6>
                    <h6 className="text-muted card-subtitle mb-2">Status:{" "}
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="error">Unavailable</span>
                            )}</h6>
                    <p className="card-text">Qty:
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {product.countInStock > 0 ? (
                                [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )
                              ) : (
                                <option key={1} value={0}>
                                  {0}
                                </option>
                              )}
                            </select></p>
                    <div className="row">
                      <div className="col text-center"> <a
                        className="btn btn-primary btn-block text-light"
                        href={`/cart/${productId}?qty=${qty}`}
                      >
                        <i className="fa fa-fw fa-cart-plus" />
                        Add To Cart
                      </a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 col-lg-6 col-xl-6">
            <div className="card">
              <div className="row">
                <div className="col">
                  <ul className="list-group" />
                </div>
              </div>
              <div className="card-body">
                <div className="card" style={{marginBottom:10}}>
                  <div className="card-header">
                    <h5 className="mb-0">Reviews</h5>
                  </div>
                  <div className="card-body">        
                        {!product.reviews.length && (
                          <div>There is no review</div>
                        )}
                        <ul className="list-group">
                        {product.reviews.map((review) => (
                      <li className="list-group-item" key={review._id}>
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">{review.name}</h4>
                            <div>
                              <Rating value={review.rating}></Rating>
                            </div>
                            <p className="card-text">{review.createdAt.substring(0, 10)}</p>
                            <p className="card-text">{review.comment}</p>
                          </div>
                        </div>
                      </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row text-left login-form">
                  <div className="col-12">
                  <div className="card" style={{marginBottom:10}}>
                  <div className="card-header">
                    <h5 className="mb-0">Write a customer review</h5>
                  </div>
                    <div className="card-body">
                      {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="custom-form">
                      <div className="form-group">
                        <Dropdown
                        name="rating"
                placeholder={"Select Rating"}
                data={ratingItems}
                handleChange={handleRatingChange}
              />
                      
                      </div>
                      <div className="form-group">
                      <div className="field">
                        {'  '}<textarea name="comment" className="Form-Control bottom-Padding-md" rows={5} placeholder="Add Comment"
                          name="comment"
                          style={{border: 0, borderBottom: '1px solid #E0E0E0',color:'black'}}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary btn-block text-light">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div>
                    Please <a href="/signin">Sign-in</a> to write a review.
                  </div>
                )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div></div></div>
          )}
        {/* <div>
          <div className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {" "}
                      <a href="/home">Home</a>{" "}
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/shop">Back to Shop</a>
                    </li>
                    <li className="breadcrumb-item active">{product.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img className="img-fluid d-block" src={product.image} />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card text-left">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <div>
                            <a href="#reviews">
                              <Rating
                                value={product.rating}
                                text={product.numReviews + " reviews"}
                              />
                            </a>
                          </div>
                          <h6>Price: {product.price}</h6>
                          <h6>Description: {product.description}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card text-left">
                        <div className="card-body">
                          <h6>Price: {product.price}</h6>
                          <h6>
                            Status:{" "}
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="error">Unavailable</span>
                            )}
                          </h6>
                          <h6>
                            Qty:
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {product.countInStock > 0 ? (
                                [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )
                              ) : (
                                <option key={1} value={0}>
                                  {0}
                                </option>
                              )}
                            </select>
                          </h6>
                        </div>
                      </div>
                      <a
                        className="btn btn-primary btn-block text-light"
                        href={`/cart/${productId}?qty=${qty}`}
                      >
                        <i className="fa fa-fw fa-cart-plus" />
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6" style={{}}>
                  <div className="card">
                    <div className="card-header" contentEditable="true">
                      {" "}
                      Reviews
                    </div>
                    <div className="card-body">
                      <div className="list-group">
                        {!product.reviews.length && (
                          <div>There is no review</div>
                        )}
                        {product.reviews.map((review) => (
                          <div
                            key={review._id}
                            className="list-group-item list-group-item-action flex-column align-items-start"
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">{review.name}</h5>{" "}
                            </div>
                            <div>
                              <Rating value={review.rating}></Rating>
                            </div>
                            <div>{review.createdAt.substring(0, 10)}</div>
                            <div>{review.comment}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Write a customer review</h4>
                      {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <a href="/signin">Sign-in</a> to write a review.
                  </div>
                )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
     
    </div>
  );
}
