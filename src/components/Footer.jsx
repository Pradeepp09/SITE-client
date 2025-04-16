import React from "react";
import styled from "styled-components";
import { Facebook, Twitter, LinkedIn, Send } from "@mui/icons-material";

const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_secondary};
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 750px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

const ContactInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  svg {
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 14px;

  li {
    margin-bottom: 8px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text_secondary};
    transition: 0.3s ease;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Newsletter = styled.div`
  font-size: 14px;
`;

const SubscribeBox = styled.div`
  display: flex;
  margin-top: 10px;
  background: #222;
  border-radius: 5px;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  background: #333;
  color: white;
`;

const SubscribeButton = styled.button`
  background: ${({ theme }) => theme.primary};
  border: none;
  padding: 10px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Footer = () => {
  return (
    <>
    <FooterContainer>
      <Section>
        <Title>Contact Us</Title>
        <ContactInfo>📍 Shivaji Nagar, Pune, Maharastra</ContactInfo>
        <ContactInfo>📧 sitencry@gmail.com</ContactInfo>
        <SocialIcons>
          <Facebook />
          <Twitter />
          <LinkedIn />
        </SocialIcons>
      </Section>

      <Section>
        <Title>Quick Links</Title>
        <QuickLinks>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </QuickLinks>
      </Section>

      <Section>
        <Title>Newsletter</Title>
        <Newsletter>Subscribe to get the latest updates & news.</Newsletter>
        <SubscribeBox>
          <Input type="email" placeholder="sitencry@gmail.com" />
          <SubscribeButton><Send /></SubscribeButton>
        </SubscribeBox>
      </Section>
      
    </FooterContainer>
    <Copyright>&copy; {new Date().getFullYear()} SITE Project. All rights reserved.</Copyright>
    </>
  );
};

export default Footer;
