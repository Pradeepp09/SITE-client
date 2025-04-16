import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;
  font-family: "Poppins", sans-serif;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #fff;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #fff;
  border-radius: 6px;
  outline: none;
  color: #fff;
  background: transparent;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const ImgDecry = () => {
  const [aesKey, setAesKey] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerifyKey = async () => {
    if (aesKey.length !== 16) {
      setError("AES key must be exactly 16 characters long.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://site-server-eiiv.onrender.com/decrypt-images", { email, aesKey });

      if (response.data.success) {
        setError("");
        sessionStorage.setItem("aesKey", aesKey);
        sessionStorage.setItem("email", email);

        // Navigate to image viewer (you can enable/disable this line based on your flow)
        navigate("/ImageViewer");
      } else {
        setError("Invalid AES key or user.");
      }
    } catch (error) {
      console.error("Error verifying AES key:", error);
      setError(error.response?.data?.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Enter AES Key</Title>
        <Input
          type="email"
          placeholder="Enter your registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter AES Key"
          value={aesKey}
          onChange={(e) => setAesKey(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}

        <Button text={loading ? "Verifying..." : "Verify Key"} onClick={handleVerifyKey} disabled={loading} />
      </Wrapper>
    </Container>
  );
};

export default ImgDecry;
