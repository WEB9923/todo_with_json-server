import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import TodoPage from "../pages/TodoPage";
import ErrorPage from "../pages/ErrorPage";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<TodoPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
