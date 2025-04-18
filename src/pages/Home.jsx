import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import Button from "../components/buttons/button";
import chip from "../assets/chip.jpg";
import contbg from "../assets/contbg.jpg";
import keylock from "../assets/keylock.jpg";
import image from "../assets/image.png";
import AES128 from "../assets/AES128.png";
import mongodb from "../assets/mongodb.jpg";
import node from "../assets/node.png";
import flowdiagram from "../assets/flowdiagram.png";

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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${({ shadowColor }) => `0px 0px 15px ${shadowColor}`};
  object-fit: cover;
  filter: brightness(90%) contrast(105%);
`;

const StyledImage2 = styled.img`
  width: 500px;
  height: 200px;
  border-radius: 3%;
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
       <h2> Smarter Survillance, Safer storage</h2>
      <Button text="Get Started..." onClick={isAuthenticated ? gotoImgDecry : handleLogin} />
      
     
      <HeroSection>
        <h1>Secure Image Transmission & Encryption</h1>
        <p>Real-time, encrypted image transfer with ESP32-CAM and Node.js</p>
      </HeroSection>

      <ImageContainer>
      <StyledImage src={image} alt="Secure Transmission" shadowColor="rgba(0, 0, 0, 0.8)" />
        <StyledImage src={chip} alt="Secure Transmission" shadowColor="rgba(0, 0, 0, 0.8)" />
        <StyledImage src={keylock} alt="Key Lock Security" shadowColor="rgb(69, 69, 72)" />
        <StyledImage src={mongodb} alt="Key Lock Security" shadowColor="rgb(69, 69, 72)" />
        <StyledImage src={node} alt="Key Lock Security" shadowColor="rgb(69, 69, 72)" />
      </ImageContainer>

      <OverviewSection>
        <p>
        SITE (Secure Image Transmission and Encryption) is a real-time, secure image transmission system built using ESP32-CAM and a Node.js server. The ESP32-CAM captures images and transmits them wirelessly via Wi-Fi (HTTP) to a local server. The server then encrypts the image using AES-128 encryption and securely stores it. The Node.js server also handles decryption and provides APIs for secure retrieval of the images.

        </p>
      </OverviewSection>

      <StyledImage2 src={flowdiagram} alt="Key Lock Security" shadowColor="rgb(69, 69, 72)" />
      {/* ESP32-CAM Module Blog Section */}
<BlogContainer>
  <BlogTitle>📷 ESP32-CAM – The Power of Wireless Image Capture & Transmission</BlogTitle>

  <p>
    The <Highlight>ESP32-CAM</Highlight> is a **low‑cost, high‑performance** microcontroller with both 
    **built-in Wi‑Fi and a camera**, making it ideal for **IoT surveillance and secure image transmission**. 🚀
  </p>

  <SubTitle>🔑 Key Features of the ESP32-CAM</SubTitle>
  <ul>
    <li><b>📡 Built‑in Wi‑Fi & Bluetooth:</b> Enables real‑time wireless communication over HTTP/MQTT/WebSocket.</li>
    <li><b>📷 OV2640 Camera Module:</b> Captures images at resolutions up to **1600×1200**.</li>
    <li><b>💡 Low Power Consumption:</b> Perfect for battery‑powered and edge deployments.</li>
    <li><b>🎯 MicroSD Card Support:</b> Optional local storage of raw images.</li>
    <li><b>🛠 GPIO Pins:</b> Easily integrates external sensors like PIR motion detectors.</li>
  </ul>

  <SubTitle>⚙️ How It Works in Your SITE Project</SubTitle>
  <p>
    1. PIR sensor triggers the <Highlight>ESP32-CAM</Highlight> to capture a raw JPEG image.  
    2. The ESP32-CAM transmits the image over <b>secure HTTPS</b> to a <b>Node.js server</b>.  
    3. The server applies <b>AES‑128‑CBC encryption</b>, stores the encrypted image, and exposes 
       <b>APIs</b> for secure retrieval and decryption.
  </p>

  <SubTitle>🔒 Server‑Side Encryption & Web Interface</SubTitle>
  <ul>
    <li><b>🔐 AES‑128 Encryption:</b> All images are encrypted on the server using user‑provided keys.</li>
    <li><b>🗄️ Secure Storage:</b> Encrypted images are stored in the cloud or local database.</li>
    <li><b>💻 Web‑Based Decryption:</b> Authorized users enter their AES key via a React frontend to view decrypted images.</li>
    <li><b>🛡️ Access Control:</b> Login with email and password to fetch only your own encrypted data.</li>
  </ul>

  <SubTitle>📌 Real‑World Applications</SubTitle>
  <ul>
    <li><b>🏠 Home Security:</b> Motion‑activated cameras with end‑to‑end privacy.</li>
    <li><b>🚗 Smart Vehicles:</b> Secure dash‑cam and parking surveillance.</li>
    <li><b>🌿 Agriculture:</b> Remote crop monitoring with encrypted storage.</li>
    <li><b>🛡️ Industrial Security:</b> Real‑time protection of restricted zones.</li>
  </ul>
</BlogContainer>



  {/* AES Encryption */}
<BlogContainer>
  <BlogTitle>🔐 What is AES Encryption?</BlogTitle>

  <p>
    <Highlight>AES (Advanced Encryption Standard)</Highlight> is a widely used encryption algorithm that ensures secure data protection.
  </p>

  <SubTitle>🔑 Key Features</SubTitle>
  <ul>
    <li><b>Symmetric Key Algorithm:</b> Uses the same key for both encryption and decryption.</li>
    <li><b>Block Cipher:</b> Operates on fixed-size blocks of 128 bits.</li>
    <li><b>Key Lengths:</b> Supports 128, 192, and 256-bit keys for varying levels of security.</li>
    <li><b>Security:</b> Trusted globally in security protocols for data confidentiality.</li>
  </ul>

  <SubTitle>🔄 AES Encryption Modes</SubTitle>
  <p>
    AES supports several encryption modes, each offering different levels of security and efficiency.
  </p>
  <ul>
    <li><b>ECB (Electronic Codebook):</b> Simple but less secure as identical plaintexts produce identical ciphertexts.</li>
    <li><b>CBC (Cipher Block Chaining):</b> Uses an IV (Initialization Vector) to prevent identical ciphertexts, offering enhanced security.</li>
    <li><b>CTR (Counter Mode):</b> Converts AES into a stream cipher for parallel processing capabilities.</li>
    <li><b>GCM (Galois/Counter Mode):</b> Provides built-in authentication and integrity checks for encrypted data.</li>
  </ul>

  <SubTitle>📌 AES Key Size & Padding</SubTitle>
  <p>
    The <Highlight>AES block size</Highlight> is fixed at 128 bits, with key sizes of 128, 192, or 256 bits for varied security levels. 
    For modes like <Highlight>CBC and ECB</Highlight>, padding is applied (e.g., PKCS5Padding or NoPadding).
  </p>

  <SubTitle>🔎 Applications of AES</SubTitle>
  <ul>
    <li><b>🔒 Data Protection:</b> Encrypting sensitive information to prevent unauthorized access.</li>
    <li><b>🌐 Secure Communications:</b> Used in SSL/TLS protocols for safe web browsing.</li>
    <li><b>📡 Cryptographic Protocols:</b> Applied in WPA2 for securing wireless networks.</li>
  </ul>
</BlogContainer>

{/* ReactJS & Node.js Blog Section */}
<BlogContainer>
  <BlogTitle>⚡ ReactJS & Node.js – The Power Duo</BlogTitle>

  <p>
    <Highlight>ReactJS</Highlight> and <Highlight>Node.js</Highlight> are powerful tools in modern full-stack web development, offering scalability, speed, and efficiency for building dynamic web applications.
  </p>

  <SubTitle>🔑 Key Features of ReactJS</SubTitle>
  <ul>
    <li><b>Component-Based Architecture:</b> Reusable UI components that streamline development.</li>
    <li><b>Virtual DOM:</b> Ensures faster UI updates and improved performance.</li>
    <li><b>JSX Syntax:</b> Combines JavaScript and HTML, simplifying the development process.</li>
    <li><b>State Management:</b> Efficient data flow with React's Hooks and Context API.</li>
  </ul>

  <SubTitle>⚙️ Key Features of Node.js</SubTitle>
  <ul>
    <li><b>Asynchronous & Non-blocking:</b> Handles multiple requests simultaneously without delay.</li>
    <li><b>Lightweight & Fast:</b> Uses the V8 engine, ensuring high performance.</li>
    <li><b>NPM (Node Package Manager):</b> Access to a vast ecosystem of open-source libraries and tools.</li>
    <li><b>Cross-Platform:</b> Runs seamlessly across Windows, macOS, and Linux systems.</li>
  </ul>

  <SubTitle>🔄 Why Use ReactJS with Node.js?</SubTitle>
  <p>
    Combining <Highlight>ReactJS</Highlight> for the frontend and <Highlight>Node.js</Highlight> for the backend offers a seamless full-stack development experience, allowing developers to create dynamic, real-time applications.
  </p>

  <SubTitle>📌 Use Cases</SubTitle>
  <ul>
    <li><b>🛒 E-Commerce Platforms:</b> Scalable and high-performance online stores.</li>
    <li><b>📡 Real-time Applications:</b> Real-time dashboards, chat applications, and stock market apps.</li>
    <li><b>🎬 Streaming Services:</b> Platforms like Netflix, providing video streaming capabilities.</li>
    <li><b>🏦 Fintech Apps:</b> Secure and fast online banking and payment systems.</li>
  </ul>
</BlogContainer>

    <StyledImage src={AES128} alt="Secure Transmission" shadowColor="rgba(0, 0, 0, 0.8)" />
    </Container>
    
  );
};

export default Home;
