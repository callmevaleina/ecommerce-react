import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import "../styles/products-card-home.css";
import "../styles/categories.css";
import "../styles/input-home.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCategoriesOn, setIsCategoriesOn] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(products);
  }, [products]);

  const filterCategory = (categoryId) => {
    const filteredProducts = products.filter(
      (product) => product.category.id === categoryId
    );
    setProductsFiltered(filteredProducts);
  };

  const searchProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductsFiltered(filteredProducts);
    setSearchValue("");
  };

  return (
    <div className="home-container">
      <div className="input-container">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="What are you looking for?"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={searchProducts}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </InputGroup>
      </div>
      <div className="products-categories-container">
        <div className="categories-btns-container">
          <h5 onClick={() => setIsCategoriesOn(!isCategoriesOn)}>
            Category{" "}
            <span>
              {isCategoriesOn ? (
                <i className="fa-solid fa-caret-down"></i>
              ) : (
                <i className="fa-solid fa-caret-right"></i>
              )}
            </span>
          </h5>
          <div className="categories-line"></div>

          {isCategoriesOn && (
            <>
              <Button
                variant="btn btn-outline-dark"
                onClick={() => setProductsFiltered(products)}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  className="btn"
                  key={category.id}
                  variant="btn btn-outline-dark"
                  onClick={() => filterCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </>
          )}
          {/* {isCategoriesOn ? 
          (<>
          <h5>
            Category{" "}
            <span>
              <i className="fa-solid fa-caret-down"></i>
            </span>
          </h5>
          <div className="categories-line"></div>
          </>)
          :
          (<Button
            variant="btn btn-outline-dark"
            onClick={() => setProductsFiltered(products)}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              className="btn"
              key={category.id}
              variant="btn btn-outline-dark"
              onClick={() => filterCategory(category.id)}
            >
              {category.name}
            </Button>)
          ))} */}
        </div>

        <ul className="products-container">
          {productsFiltered.map((product) => (
            <li
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="img-container">
                <img src={product.productImgs[0]} alt="" />
                <div className="overlay-container">
                  <img
                    className="overlay-img"
                    src={product.productImgs[1]}
                    alt=""
                  />
                </div>
              </div>
              <div className="product-card-info-container">
                <div className="product-title">
                  <h4>{product.title}</h4>
                </div>
                <div className="product-price">
                  <h5>
                    <span>Price: </span>
                    <br /> ${product.price}
                  </h5>
                </div>

                <div className="add-to-cart-container">
                  <div className="add-to-cart">
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

export default Home;
