import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import Button from "../components/buttons/button";
import chip from "../assets/chip.jpg";
import contbg from "../assets/contbg.jpg";
import keylock from "../assets/keylock.jpg";

const Container = styled.div`
  padding: 30px 30px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url(${contbg}) no-repeat center/cover;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 40px;
  background: rgba(10, 25, 47, 0.75);
  color: white;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const OverviewSection = styled.div`
  max-width: 800px;
  text-align: justify;
  padding: 20px;
  background: rgb(16, 16, 16);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const StyledImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: ${({ shadowColor }) => `0px 0px 15px ${shadowColor}`};
  object-fit: cover;
  filter: brightness(90%) contrast(105%);
`;

const BlogContainer = styled.div`
  max-width: 900px;
  background: rgba(20, 20, 20, 0.9);
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  margin-top: 20px;
  line-height: 1.7;
`;

const BlogTitle = styled.h2`
  font-size: 2rem;
  color: #ffcc00;
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 2px 2px 8px rgba(255, 204, 0, 0.7);
`;

const SubTitle = styled.h3`
  font-size: 1.5rem;
  color: #ff6347;
  margin-top: 20px;
`;

const Highlight = styled.span`
  color: #1e90ff;
  font-weight: bold;
`;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, [location]);

  const handleLogin = useCallback(() => navigate("/login"), [navigate]);
  const gotoImgDecry = useCallback(() => navigate("/ImgDecry"), [navigate]);

  return (
    <Container>
      <Button text="Get Started..." onClick={isAuthenticated ? gotoImgDecry : handleLogin} />

      <HeroSection>
        <h1>Secure Image Transmission & Encryption</h1>
        <p>Real-time, encrypted image transfer with ESP32-CAM and Node.js</p>
      </HeroSection>

      <ImageContainer>
        <StyledImage src={chip} alt="Secure Transmission" shadowColor="rgba(0, 0, 0, 0.8)" />
        <StyledImage src={keylock} alt="Key Lock Security" shadowColor="rgb(69, 69, 72)" />
      </ImageContainer>

      <OverviewSection>
        <p>
          SITE (Secure Image Transmission and Encryption) is a real-time, secure image transmission system 
          built using an ESP32-CAM and Node.js server. The ESP32-CAM captures images, encrypts them using 
          AES encryption, and transmits them wirelessly via Wi-Fi (HTTP) to a local server. 
          The Node.js server receives, decrypts, and stores the images, making them accessible via APIs for 
          secure retrieval.
        </p>
      </OverviewSection>

      {/* ESP32-CAM Module Blog Section */}
<BlogContainer>
  <BlogTitle>📷 ESP32-CAM – The Power of Wireless Image Processing</BlogTitle>

  <p>
    The <Highlight>ESP32-CAM</Highlight> is a **low-cost, high-performance** microcontroller with **built-in Wi-Fi and a camera**,  
    making it ideal for **IoT applications, surveillance systems, and image transmission.** 🚀
  </p>

  <SubTitle>🔑 Key Features of ESP32-CAM</SubTitle>
  <ul>
    <li><b>📡 Built-in Wi-Fi & Bluetooth:</b> Enables real-time wireless communication.</li>
    <li><b>📷 OV2640 Camera Module:</b> Captures images at resolutions up to **1600x1200**.</li>
    <li><b>💡 Low Power Consumption:</b> Ideal for battery-operated projects.</li>
    <li><b>🎯 MicroSD Card Support:</b> Can store images locally.</li>
    <li><b>🛠 GPIO Pins:</b> Allows external sensor and module interfacing.</li>
  </ul>

  <SubTitle>⚙️ How Does ESP32-CAM Work?</SubTitle>
  <p>
    The <Highlight>ESP32-CAM</Highlight> captures images using its **OV2640 camera**,  
    processes the data, and then transmits it over **Wi-Fi (HTTP/MQTT/WebSocket)**  
    to a **Node.js server**, which handles **image decryption and storage**.
  </p>

  <SubTitle>🔄 Why Use ESP32-CAM for Secure Image Transmission?</SubTitle>
  <ul>
    <li><b>🔒 Secure Encryption:</b> Images are **AES-encrypted** before transmission.</li>
    <li><b>📶 Wireless Connectivity:</b> No physical connection needed.</li>
    <li><b>⚡ Fast Processing:</b> The ESP32’s dual-core processor enhances performance.</li>
    <li><b>📡 IoT & AI Capabilities:</b> Can be used with **AI-powered image recognition**.</li>
  </ul>

  <SubTitle>📌 Real-World Applications</SubTitle>
  <ul>
    <li><b>🏠 Home Security:</b> Wireless CCTV & motion-detection cameras.</li>
    <li><b>🚗 Smart Vehicles:</b> Image-based navigation and surveillance.</li>
    <li><b>🌿 Agriculture:</b> Remote monitoring of farms & crops.</li>
    <li><b>🛡️ Industrial Security:</b> Real-time monitoring of restricted areas.</li>
  </ul>
</BlogContainer>


    {/* AES Encryption */}
      <BlogContainer>
        <BlogTitle>🔐 What is AES Encryption?</BlogTitle>

        <p>
          <Highlight>AES (Advanced Encryption Standard)</Highlight> is a widely used encryption algorithm 
          that provides secure data protection.
        </p>

        <SubTitle>🔑 Key Features</SubTitle>
        <ul>
          <li><b>Symmetric Key Algorithm:</b> Uses the same key for encryption and decryption.</li>
          <li><b>Block Cipher:</b> Operates on fixed-size blocks of 128 bits.</li>
          <li><b>Key Lengths:</b> Supports 128, 192, and 256-bit keys.</li>
          <li><b>Security:</b> Trusted in security protocols worldwide.</li>
        </ul>

        <SubTitle>🔄 AES Encryption Modes</SubTitle>
        <p>
          AES supports multiple encryption modes, each with different security and efficiency levels.
        </p>
        <ul>
          <li><b>ECB (Electronic Code Book):</b> Simple but less secure as identical plaintexts create identical ciphertexts.</li>
          <li><b>CBC (Cipher Block Chaining):</b> Uses an IV for better security; prevents identical ciphertexts.</li>
          <li><b>CTR (Counter Mode):</b> Converts AES into a stream cipher with parallel processing capability.</li>
          <li><b>GCM (Galois/Counter Mode):</b> Offers built-in authentication and integrity checks.</li>
        </ul>

        <SubTitle>📌 AES Key Size & Padding</SubTitle>
        <p>
          The <Highlight>AES block size</Highlight> is fixed at 128 bits, while key sizes can be 128, 192, or 256 bits.  
          When using <Highlight>CBC and ECB modes</Highlight>, padding is required (PKCS5Padding or NoPadding).
        </p>

        <SubTitle>🔎 Applications of AES</SubTitle>
        <ul>
          <li><b>🔒 Data Protection:</b> Encrypting sensitive information.</li>
          <li><b>🌐 Secure Communications:</b> Used in SSL/TLS for safe web browsing.</li>
          <li><b>📡 Cryptographic Protocols:</b> Applied in WPA2 for wireless security.</li>
        </ul>
      </BlogContainer>

      {/* ReactJS & Node.js Blog Section */}
<BlogContainer>
  <BlogTitle>⚡ ReactJS & Node.js – The Power Duo</BlogTitle>

  <p>
    <Highlight>ReactJS</Highlight> and <Highlight>Node.js</Highlight> are widely used for 
    **modern full-stack web development**, ensuring **scalability, speed, and efficiency**.
  </p>

  <SubTitle>🔑 Key Features of ReactJS</SubTitle>
  <ul>
    <li><b>Component-Based Architecture:</b> Reusable UI components improve development efficiency.</li>
    <li><b>Virtual DOM:</b> Faster UI updates and better performance.</li>
    <li><b>JSX Syntax:</b> JavaScript + HTML for seamless development.</li>
    <li><b>State Management:</b> Hooks and Context API simplify data flow.</li>
  </ul>

  <SubTitle>⚙️ Key Features of Node.js</SubTitle>
  <ul>
    <li><b>Asynchronous & Non-blocking:</b> Handles multiple requests simultaneously.</li>
    <li><b>Lightweight & Fast:</b> Uses the V8 engine for high performance.</li>
    <li><b>NPM (Node Package Manager):</b> Huge ecosystem of open-source libraries.</li>
    <li><b>Cross-Platform:</b> Runs on Windows, macOS, and Linux.</li>
  </ul>

  <SubTitle>🔄 Why Use ReactJS with Node.js?</SubTitle>
  <p>
    Combining <Highlight>ReactJS</Highlight> and <Highlight>Node.js</Highlight> allows for a seamless **full-stack development** experience,  
    where React manages the **frontend** while Node.js handles the **backend API and server logic**.
  </p>

  <SubTitle>📌 Use Cases</SubTitle>
  <ul>
    <li><b>🛒 E-Commerce Platforms:</b> High-speed, scalable shopping sites.</li>
    <li><b>📡 Real-time Applications:</b> Chat apps, stock market dashboards.</li>
    <li><b>🎬 Streaming Services:</b> Netflix-style video platforms.</li>
    <li><b>🏦 Fintech Apps:</b> Secure online banking & payment systems.</li>
  </ul>
</BlogContainer>


      <Button text="Get Started..." onClick={isAuthenticated ? gotoImgDecry : handleLogin} />
    </Container>
  );
};

export default Home;
