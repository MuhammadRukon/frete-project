import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRouter from "./config/Routes";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
