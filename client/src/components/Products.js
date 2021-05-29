import React from 'react';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="producto">
    <a href={`/product/${product._id}`}>
    <img className="imagen" src={product.image} alt={product.name} width={150} />
    </a>
      <a href={`/product/${product._id}`}>
          <h5>{product.name}</h5>
        </a>
      <h5>{product.brand}</h5>
      <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
    <h5>${product.price}</h5>
    </div>
  );
}