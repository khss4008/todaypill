import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import CustomBtn from "./CustomBtn";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <img src={"/Assets/images/web-background.png"} alt="" className="back" />
      <img
        src={"/Assets/images/prototype2.png"}
        alt=""
        className="main-screen"
      />

      <div className="right-side">
        <div>
          <div className="intro">오직 나만을 위한</div>
          <div className="intro">최적의 맞춤 영양제</div>
        </div>
        <div className="download-btn">
          <img src={"/Assets/images/qrcode.png"} alt="" className="qrcode" />
          <div className="btn-container">
            <CustomBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
