import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import "../styles/product-detail.css";
import Carousel from "react-bootstrap/Carousel";
import { addProductThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.products);

  const productDetail = products.find((product) => product.id === Number(id));
  console.log(productDetail);
  const relatedProducts = products.filter(
    (product) =>
      product.category.id === productDetail.category.id &&
      product !== productDetail
  );

  console.log(relatedProducts);

  const navigate = useNavigate();

  const comeBack = () => {
    navigate('/');
  };

  const [counterQty, setCounterQty] = useState(1);

  const increment = () => {
    setCounterQty(counterQty + 1);
  };

  const decrement = () => {
    if (counterQty === 1) {
      setCounterQty(1);
    } else {
      setCounterQty(counterQty - 1);
    }
  };

  useEffect(()=>{
    setCounterQty(1)
  }, [id])

  const addCart = ()=>{
    const product = {
      id: id,
      quantity: counterQty
    }
    dispatch(addProductThunk(product))
  }

  // products: id
  // quantity: 

  return (
    <div className="product-detail-container">
      <div className="btns-to-comeback">
        <p onClick={comeBack} className="come-back-home">Home</p>
        <i className="fa-solid fa-circle"></i>
        <p>
          <b>{productDetail?.title}</b>
        </p>
      </div>
      <div className="carousel-product-container">
        <div className="carousel-container">
          <Carousel variant="dark">
            {productDetail?.productImgs.map((img) => (
              <Carousel.Item key={img}>
                <img
                  className="d-block img"
                  src={img}
                  alt="Product's Picture"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="product-detail-info-container">
          <h1>{productDetail?.title}</h1>
          <p>{productDetail?.description}</p>
          <div className="price-qty-container">
            <div className="price-container">
              <h4>Price</h4>
              <p> $ {productDetail?.price}</p>
            </div>

            <div className="qty-container">
              <h4>Quantity</h4>
              <div className="product-qty-container">
                <button className="decrement" onClick={decrement}>
                <i className="fa-solid fa-minus"></i>
                </button>
                <p>{counterQty}</p>

                <button className="increment" onClick={increment}>
                <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="add-to-cart-product-container">

          <button onClick={addCart} className="add-to-cart-product-btn">Add to cart <span><i class="fa-solid fa-cart-plus"></i></span> </button>
          </div>
        </div>
      </div>

      <div className="related-products-container">
        <h2>Related products</h2>
        <ul className="related-products">
          {relatedProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              
            >
              
              <div className="rp-img-container" >
                <img src={product.productImgs[0]} alt="" />
                <div className="rp-overlay-container">
                  <img
                    className="rp-overlay-img"
                    src={product.productImgs[1]}
                    alt=""
                  />
                </div>
              </div>
              <div className="rp-product-card-info-container">
                <div className="rp-product-title">
                  <h4>{product.title}</h4>
                </div>
                <div className="rp-product-price">
                  <h5>
                    <span>Price: </span>
                    <br /> ${product.price}
                  </h5>
                </div>

                <div className="rp-add-to-cart-container">
                  <div className="rp-add-to-cart">
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            
            </li>
          ))}
        </ul>
  
      </div>
    </div>
  );
};

export default ProductDetail;
