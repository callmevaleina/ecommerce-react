import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/product-detail.css";
import "../styles/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("en-US", options);
  };

  const comeBack = () => {
    navigate("/");
  };

  console.log(purchases);

  return (
    <div>
      <div className="btns-to-comeback">
        <p onClick={comeBack} className="come-back-home">
          Home
        </p>
        <i className="fa-solid fa-circle"></i>
        <p>
          <b>My purchases</b>
        </p>
      </div>
      <h1 className="my-purchases-title">My purchases</h1>
      <ListGroup className="list-group-purchases">
        {purchases.map((purchase) => (
          <ListGroup.Item key={purchase.id}>
            <h3 className="list-group-purchases-date">
              {date(purchase.createdAt)}
            </h3>
            <ListGroup>
              {purchase.cart?.products?.map((product) => (
                <ListGroup.Item
                  onClick={() => navigate(`/products/${product.id}`)}
                  key={product.id}
                >
                  <div className="purchase-product-container">
                    <p className="purchase-product-title">{product.title}</p>
                    <p className="purchase-product-qty">
                      {product.productsInCart.quantity}
                    </p>
                    <p className="purchase-product-price">
                      $ {product.price * product.productsInCart.quantity}.00
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Purchases;
