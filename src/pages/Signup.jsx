import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../components/buttons/button";
import axios from "axios";
import contbg from "../assets/contbg.jpg";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
               url(${contbg}) no-repeat center/cover;
  font-family: "Poppins", sans-serif;
  overflow-y: auto;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  
  @media (max-width: 480px) {
    padding: 20px;
    width: 90%;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
  font-weight: 600;
  font-size: 22px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 6px;
  outline: none;
  background: transparent;
  color: #fff;
  transition: all 0.3s;
  
  &:focus {
    border-color: #4a90e2;
    box-shadow: 0px 0px 8px rgba(74, 144, 226, 0.5);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productnumber: "",
    name: "",
    mobilenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    aesKey: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://site-server-eiiv.onrender.com";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "productnumber" || name === "mobilenumber") {
      if (!/^\d*$/.test(value)) return; // Only allow digits
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignup = async () => {
    if (loading) return;
    setError("");

    const { productnumber, name, mobilenumber, email, password, confirmPassword, aesKey, agree } = formData;

    if (!productnumber || !name || !mobilenumber || !email || !password || !confirmPassword || !aesKey) {
      setError("All fields are required.");
      return;
    }

    if (productnumber.length !== 5) {
      setError("Product number must be exactly 5 digits.");
      return;
    }

    if (mobilenumber.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (aesKey.length !== 16) {
      setError("AES key must be exactly 16 characters long.");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions to sign up.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/signup`,
        { productnumber, name, mobile: mobilenumber, email, password, confirmPassword, aesKey, agree },
        { headers: { "Content-Type": "application/json" } }
    );
      alert("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Wrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Sign Up</Title>
        <Input 
          name="productnumber" 
          type="text" 
          placeholder="Product Number (5 digits)" 
          value={formData.productnumber} 
          onChange={handleChange} 
          maxLength="5"
        />
        <Input 
          name="name" 
          type="text" 
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <Input 
          name="mobilenumber" 
          type="text" 
          placeholder="Mobile Number (10 digits)" 
          value={formData.mobilenumber} 
          onChange={handleChange} 
          maxLength="10"
        />
        <Input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <Input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <Input 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
        />
        <Input 
          name="aesKey" 
          type="text" 
          placeholder="AES Key (16 chars)" 
          value={formData.aesKey} 
          onChange={handleChange} 
          maxLength="16"
        />
        <CheckboxWrapper>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          <label>I agree to the terms and conditions</label>
        </CheckboxWrapper>
        {error && <ErrorText>{error}</ErrorText>}
        <Button text={loading ? "Processing..." : "Sign Up"} onClick={handleSignup} isDisabled={loading} />
      </Wrapper>
    </Container>
  );
};

export default Signup;
