import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import { ComponentOne } from "./pages/componentOne";
import { DashboardRoutes } from "./Routes/DashboardRoutes";



function App() {
  return (
    <div className="componentOne">
       <DashboardRoutes />
    </div>
  );
}

export default App;
