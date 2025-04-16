import React, { useState } from "react";
import CryptoJS from "crypto-js";
import styled from "styled-components";


const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme?.bg || "#15171E"};
  font-family: "Poppins", sans-serif;
`;

const ImageDecryptor = () => {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [aesKey, setAesKey] = useState("");
  const [decryptedImage, setDecryptedImage] = useState(null);

  const handleFileChange = (event) => {
    setEncryptedFile(event.target.files[0]);
  };

  const handleKeyChange = (event) => {
    setAesKey(event.target.value);
  };

  const decryptImage = () => {
    if (!encryptedFile || aesKey.length !== 16) {
      alert("Please select an encrypted file and enter a 16-character AES key.");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(encryptedFile);

    reader.onload = (event) => {
      const encryptedBytes = new Uint8Array(event.target.result);

      // Extract IV (first 16 bytes) and encrypted data
      const ivBytes = encryptedBytes.slice(0, 16);
      const encryptedData = encryptedBytes.slice(16);

      // Convert IV and encrypted data to CryptoJS format
      const iv = CryptoJS.lib.WordArray.create(ivBytes);
      const encryptedWordArray = CryptoJS.lib.WordArray.create(encryptedData);

      try {
        // Decrypt using AES-CBC mode
        const decrypted = CryptoJS.AES.decrypt(
          { ciphertext: encryptedWordArray },
          CryptoJS.enc.Utf8.parse(aesKey),
          {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv,
          }
        );

        const decryptedBytes = new Uint8Array(decrypted.words.length * 4);
        decrypted.words.forEach((word, i) => {
          decryptedBytes[i * 4] = (word >> 24) & 0xff;
          decryptedBytes[i * 4 + 1] = (word >> 16) & 0xff;
          decryptedBytes[i * 4 + 2] = (word >> 8) & 0xff;
          decryptedBytes[i * 4 + 3] = word & 0xff;
        });

        // Convert decrypted bytes to a Blob
        const blob = new Blob([decryptedBytes], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setDecryptedImage(imageUrl);
      } catch (err) {
        alert("Decryption failed. Incorrect key or corrupted file.");
      }
    };
  };

  const downloadDecryptedImage = () => {
    if (!decryptedImage) {
      alert("No decrypted image available.");
      return;
    }
    const link = document.createElement("a");
    link.href = decryptedImage;
    link.download = "decrypted_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container >
      <h2 >Image Decryption</h2>
      <input
        type="text"
        value={aesKey}
        onChange={handleKeyChange}
        placeholder="Enter 16-byte AES Key"
        
      />
      <button
        onClick={decryptImage}
        
      >
        Decrypt & Show Image
      </button>

      {decryptedImage && (
        <div >
          <h3>Decrypted Image:</h3>
          <img src={decryptedImage} alt="Decrypted"  />
          <button
            onClick={downloadDecryptedImage}
          >
            Download Image
          </button>
          </div>
      )}
      </Container>
  );
};

export default ImageDecryptor;
