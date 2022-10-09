import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLoginContext } from "./contexts/LoginContext/LoginContext";
import BoardPage from "./pages/BoardPage";
import DashboardPage from "./pages/DashboardPage";
function App() {
  const { isLoggedIn } = useLoginContext();

  return (
    <div className="App">
      {!isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
