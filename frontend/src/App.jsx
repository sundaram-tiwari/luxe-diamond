import { BrowserRouter,Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      
      <AdminRoutes />
    </>
  );
}

export default App;
