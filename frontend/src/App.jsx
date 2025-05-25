import "./App.css";
import Header from './components/Header.jsx';
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";

function App() {
  return (
    <>
      <Header />
      {/* Show the resources fetched from the API */}
      <ResourceList/>
      {/* Footer of the App */}
      <Footer/>
    </>
  );
}

export default App;
