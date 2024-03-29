import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  return (
    <div className="card" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img className="image" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="row">
           <div className="price">${product.price}</div>
           <div>
            <Link to={`/seller/${product.seller._id}`}>{product.seller.seller.name}</Link>
           </div>
        </div>
       
      </div>
    </div>
  );
};

export default Product;
