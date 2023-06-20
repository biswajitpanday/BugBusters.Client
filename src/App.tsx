import { AppProvider } from "@/providers/AppProvider";
import { AppRoutes } from "@/routes";
import "./App.scss";

function App() {
  return (
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  );
}

export default App;
