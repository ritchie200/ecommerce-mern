import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/ProductActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/ProductConstants';
import Axios from 'axios';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
     // .post('/api/uploads/s3', bodyFormData, { S3 Bucket
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  return (
      <div className="contact-clean">
        <form className="form" onSubmit={submitHandler}>
          <h2 className="text-center">Edit Product {productId}</h2>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
          <div className="form-group text-center">
          <input className="form-control" type="text" name="productname" placeholder="Product Name" value={name}
                onChange={(e) => setName(e.target.value)} style={{margin: '10px 0px 0px 0px'}} />
          <small className="form-text text-danger">Please enter a product name.</small>
          <input className="form-control" type="number"  value={price}
                onChange={(e) => setPrice(e.target.value)} name="productprice" placeholder="Product Price" />
            <div className="form-row">
              <div className="col-sm-3">
              <label className="col-form-label">Image File&nbsp;</label>
              </div>
              <div className="col-sm-9">
              <input type="file"  onChange={uploadFileHandler}/>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              </div>
            </div>
            <small className="form-text text-danger">Please enter a product price.</small>
            <input className="form-control" type="text" name="category" placeholder="Category" value={category}
                onChange={(e) => setCategory(e.target.value)}/>
            <small className="form-text text-danger">Please enter a category.</small>
            <input className="form-control" type="text" name="brand" placeholder="Brand"  value={brand}
                onChange={(e) => setBrand(e.target.value)}/>
            <small className="form-text text-danger">Please enter a brand.</small>
            <input className="form-control" type="number" name="countinstock" placeholder="Count in Stock" value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)} />
            <small className="form-text text-danger">Please enter the count in stock.</small>
            <textarea className="form-control" name="description" placeholder="Enter Description" defaultValue={""} value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <small className="form-text text-danger">Please enter the description.</small>
            </div>
          <div className="form-group text-center">
          <button className="btn btn-primary" type="submit">UPDATE&nbsp;</button>
          </div>
          </div>
        )}
        </form>
      </div>

  );
}