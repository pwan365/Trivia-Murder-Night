import React from "react";
import './App.scss';

// components
import HomeCanvas from './components/HomeCanvas/HomeCanvas';
import Header from "./components/Header/Header";
import HomePara from "./components/HomePara/HomePara";
import { Container } from "@mui/material";
import Footer from "./components/Footer/Footer";


const App = () => {

  return (
    <div id="root">
      <div style={{height:"100%"}}>
        <HomeCanvas/>
        <Container style={{marginBottom:'50px'}} >
          <Header />
          <HomePara />
        </Container>
        <Footer />

      </div>
    </div>
  )
}

export default App;
