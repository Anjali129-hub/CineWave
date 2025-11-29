import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import AppRoutes from "./routes/Routes"; 

function App() {
  return (
    <BrowserRouter>
      <Header />

      <AppRoutes /> 

      <Footer />
    </BrowserRouter>
  );
}

export default App;
