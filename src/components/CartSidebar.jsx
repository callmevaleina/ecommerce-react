import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProductThunk, getUserCartThunk, purchaseThunk } from "../store/slices/cart.slice";
import '../styles/cart.css'

const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getUserCartThunk());
  }, []);

  const checkOut = ()=>{
    dispatch(purchaseThunk())
    navigate('/purchases')
  }

  const total = ()=>{
    let finalPrice = 0
    cartProducts?.forEach(product => {
        finalPrice += Number(product.price) * product.productsInCart?.quantity
     
    })
    return finalPrice
  }

  const deleteProduct = (id) =>{
    dispatch(deleteCartProductThunk(id))
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className="list-group-cart">
          {cartProducts.map((product) => (
            <ListGroup.Item key={product.id} className='list-group-item-cart'>
              <Link to={`/products/${product.id}`}>
              <i onClick={()=>deleteProduct(product.id)} className="fa-solid fa-trash-can"></i>
                <div className="product-cart-container">
                  <p className="product-cart-brand">{product.brand}</p>  
                  <p className="product-cart-title">{product.title}</p>
                </div>
                <div className="product-cart-info-container">
                  <p className="product-cart-qty-title">QTY</p>
                  
                  <p className="product-cart-qty">{product.productsInCart.quantity}</p>
                  <p className="product-cart-total"><span>Total: </span><b>$ {product.price*product.productsInCart.quantity}</b></p>
                </div>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
      <div className="cart-checkout">
      <h3>Total: ${total()}.00</h3>
      <Button className="cart-checkout-btn" onClick={checkOut}>
      <p>Checkout</p><i className="fa-regular fa-circle-check"></i>
      
      </Button>
      
      </div>
      
    </Offcanvas>
  );
};

export default CartSidebar;
