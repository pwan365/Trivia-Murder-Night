import React from "react";
import "./App.scss";

// components
import HomeCanvas from "./components/HomeCanvas/HomeCanvas";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div id="root">
      <div style={{ height: "100%" }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeCanvas />} />
            {/* <Route path="/" element={} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
