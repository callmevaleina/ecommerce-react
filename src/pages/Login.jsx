import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/login.css";
import {useForm } from 'react-hook-form'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const {register, handleSubmit } = useForm();

    const navigate = useNavigate();
    const [islogin, setIsLogin] = useState(true)

    const submit = (data) =>{
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
        .then(res=> {
            localStorage.setItem("token", res.data.data.token);
            navigate('/')

        })
        .catch(error => {
            if(error.response?.status === 404){
                alert("Credecials are not valid")
            }
            console.log(error.response)
        })
    }



  return (
    <div className="login-bg">
        
        <div className="login-container">
        <h2>Welcome! Enter your email and password to continue</h2>
        <div className="test-data-container">
          <h3>Test Data</h3>
          <span>
            <i className="fa-solid fa-envelope"></i>
            <p>ella@gmail.com</p>
          </span>
          <span>
            <i className="fa-solid fa-lock"></i>
            <p>ella1234</p>
          </span>
        </div>
        <Form className="form-login" onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="form-input-login"
              {...register('email')}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-input-login"
              {...register('password')}
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="btn-form-login">
            Login
          </Button>
        </Form>
        
      </div>
      
      
     
    </div>
  );
};

export default Login;
