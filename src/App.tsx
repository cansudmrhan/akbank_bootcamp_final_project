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
import { AppContextProvider } from "contexts/AppContext/AppContext";

import BoardPage, {
  loader as boardLoader,
  action as boardAction,
} from "./pages/BoardPage";
import { loader as listLoader, action as listAction } from "./pages/List";
import { action as cardAction } from "./pages/Card";
import { action as commentAction } from "./pages/Comment";
import { action as checklistAction } from "./pages/Checklist";
import { action as checklistitemAction } from "./pages/Checklistitem";
import { action as cardLabelAction } from "./pages/CardLabel";
import DashboardPage, {
  loader as dashboardLoader,
  action as dashboardAction,
} from "./pages/DashboardPage";
import DefaultLayout from "layouts";
import ErrorPage from "pages/ErrorPage";

function App() {
  const { isLoggedIn } = useLoginContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      !isLoggedIn ? (
        <Route
          path="/"
          element={<DefaultLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      ) : (
        <Route
          path="/"
          element={
            <AppContextProvider>
              <DefaultLayout />
            </AppContextProvider>
          }
          errorElement={<ErrorPage />}
        >
          <Route
            index
            element={<DashboardPage />}
            loader={dashboardLoader}
            action={dashboardAction}
          />
          <Route
            path="/board/:id"
            element={<BoardPage />}
            loader={boardLoader}
            action={boardAction}
          >
            <Route path="list" loader={listLoader} action={listAction}>
              <Route path="create" loader={listLoader} action={listAction} />
              <Route path=":listId" loader={listLoader} action={listAction}>
                <Route path="card" loader={listLoader} action={cardAction}>
                  <Route path=":cardId" loader={listLoader} action={cardAction}>
                    <Route path="card-label" loader={listLoader}>
                      <Route
                        path=":labelId/create"
                        loader={listLoader}
                        action={cardLabelAction}
                      />
                      <Route
                        path=":labelId"
                        loader={listLoader}
                        action={cardLabelAction}
                      />
                    </Route>

                    <Route path="comment" loader={listLoader}>
                      <Route
                        path="create"
                        loader={listLoader}
                        action={commentAction}
                      />
                      <Route
                        path=":commentId"
                        loader={listLoader}
                        action={commentAction}
                      />
                    </Route>

                    <Route path="checklist">
                      <Route
                        path="create"
                        loader={listLoader}
                        action={checklistAction}
                      />
                      <Route
                        path=":checklistId"
                        loader={listLoader}
                        action={checklistAction}
                      >
                        <Route path="item" loader={listLoader}>
                          <Route
                            path="create"
                            loader={listLoader}
                            action={checklistitemAction}
                          />
                          <Route
                            path=":itemId"
                            loader={listLoader}
                            action={checklistitemAction}
                          />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      )
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
