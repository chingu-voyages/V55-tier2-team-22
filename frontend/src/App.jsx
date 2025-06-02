import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";

import SearchPage from "./components/SearchBar/SearchPage";

function App() {
  return (
    <>
      {/* Header of the App */}
      <Header />
      {/* Search Bar */}
      <SearchPage />
      {/* Show the resources fetched from the API */}
      {/* Footer of the App */}
      <Footer />
    </>
  );
}

export default App;
