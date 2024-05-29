import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";
import Detail from "../pages/detail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/article/:id",
    element: <Detail />,
  },
]);

export default routes;
