import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import ImgDecry from "./pages/ImgDecry";
import ImageViewer from "./pages/ImageViewer";
import Footer from "./components/Footer";
import contbg from "./assets/contbg.jpg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url(${contbg}) no-repeat center/cover;
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" exact element={<LoginPage />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/ImgDecry" exact element={<ImgDecry/>} />       
              <Route path="/ImageViewer" element={<ImageViewer />} />
              
            </Routes>
          </BrowserRouter>
          <Footer />
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
