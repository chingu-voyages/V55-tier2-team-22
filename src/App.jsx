import { useState } from "react";
import chinguLogo from "/chingu.png";
import "./App.css";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://chingu.io" target="_blank">
          <img src={chinguLogo} className="logo" alt="Chingu logo" />
        </a>
      </div>
      {/* Show the resources fetched from the API */}
      <ResourceList/>
      {/* Footer of the App */}
      <Footer></Footer>
    </>
  );
}

export default App;
