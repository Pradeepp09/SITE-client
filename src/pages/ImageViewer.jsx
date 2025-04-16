import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { Download } from "lucide-react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px 20px;
  background: #121212;
  min-height: 100vh;
`;

const ImageCard = styled.div`
  margin: 15px;
  width: 320px;
  height: 320px;
  background: #1e1e1e;
  border: 2px solid rgb(231, 231, 231);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.6s ease-in-out;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.015);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DownloadButton = styled.button`
  background: #00bfa5;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: #00a896;
  }
`;

const Message = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

const ImageViewer = () => {
  const [decryptedImages, setDecryptedImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("email");

    if (!email) {
      setError("User email not found. Please verify your AES key again.");
      return;
    }

    axios
      .post("https://site-server-eiiv.onrender.com/get-decrypted-images", { email })
      .then((response) => {
        if (response.data.success) {
          setDecryptedImages(response.data.images);
        } else {
          setError("No decrypted images found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching decrypted images:", err);
        setError("Server error. Please try again later.");
      });
  }, []);

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB'); // e.g. "7/4/2025, 3:45:10 PM"
  };

  return (
    <Container>
      {error && <Message>{error}</Message>}
      {!error && decryptedImages.length === 0 && <Message>Loading images...</Message>}
      {decryptedImages.map((image, index) => (
        <ImageCard key={index}>
          <Image src={image.imagePath} alt={`Decrypted ${index}`} />
          <Overlay>
            <span>{formatTimestamp(image.timestamp)}</span>
            <DownloadButton onClick={() => handleDownload(image.imagePath, image.filename)}>
              <Download size={14} /> Download
            </DownloadButton>
          </Overlay>
        </ImageCard>
      ))}
    </Container>
  );
};

export default ImageViewer;
