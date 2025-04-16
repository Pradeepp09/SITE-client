import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import { useLocation, useNavigate } from "react-router";
import { ExitToApp, Login } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const SiteLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Container>
      <SiteLink onClick={() => navigate("/")}>SITE</SiteLink>
      {!isAuthenticated ? (
        <Button
          text="Login"
          leftIcon={<Login style={{ fontSize: "18px" }} />}
          onClick={handleLogin}
        />
      ) : (
        <Button
          text="Logout"
          leftIcon={<ExitToApp style={{ fontSize: "18px" }} />}
          onClick={handleLogout}
        />
      )}
    </Container>
  );
};

export default Navbar;
