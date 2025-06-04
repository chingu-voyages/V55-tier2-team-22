import "./App.css";
import { ResourceProvider } from "./context/ResourceContext";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  return (
    <ResourceProvider>
      <AppLayout />
    </ResourceProvider>
  );
}

export default App;
