import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import Button from "../components/buttons/button";
import contbg from "../assets/contbg.jpg";


const Container = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
               url(${contbg}) no-repeat center/cover;
`;

const Wrapper = styled(motion.div)`
  width: 90%;
  max-width: 400px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: all 0.3s ease;
  &:focus {
    border-color: #61dafb;
    outline: none;
    box-shadow: 0 0 10px rgba(97, 218, 251, 0.5);
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

const ToggleText = styled.p`
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "https://site-server-eiiv.onrender.com";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("authToken", response.data.token);

      if (response.data.success) {
        alert("Logged In Successfully!");
        navigate("/");
      } else {
        setError(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Wrapper initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Title>Login</Title>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button text={loading ? "Processing..." : "Login"} onClick={handleLogin} isDisabled={loading} />
        <ToggleText onClick={() => navigate("/signup")}>
          New user? Create an account
        </ToggleText>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;