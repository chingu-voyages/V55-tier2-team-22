import React from "react";
import { useState } from "react";
import chinguLogo from "/chingu.png";
import "./App.css";
import Footer from "./components/Footer/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://chingu.io" target="_blank">
          <img src={chinguLogo} className="logo" alt="Chingu logo" />
        </a>
      </div>
      <h1>Team #22 - The Ramens</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
