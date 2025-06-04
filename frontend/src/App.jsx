import "./App.css";
import { ResourceProvider } from "./context/ResourceContext";
import AppContent from "./components/Layout/AppLayout";

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
