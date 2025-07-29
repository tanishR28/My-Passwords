import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Manager from "./components/Manager";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Navbar />
      <Manager />
      <Footer />
    </>
  );
};

export default App;
