import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLoginContext } from "./contexts/LoginContext/LoginContext";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";

import BoardPage from "./pages/BoardPage";
import DashboardPage, {
  loader as dashboardLoader,
} from "./pages/DashboardPage";
import DefaultLayout from "layouts";
import ErrorPage from "pages/ErrorPage";

function App() {
  const { isLoggedIn } = useLoginContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      !isLoggedIn ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      ) : (
        <Route
          path="/"
          element={
            <BoardProvider>
              <DefaultLayout />
            </BoardProvider>
          }
        >
          <Route
            index
            loader={dashboardLoader}
            element={<DashboardPage />}
            errorElement={<ErrorPage />}
          />
          <Route path="/board/:id" element={<BoardPage />} />
        </Route>
      )
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
