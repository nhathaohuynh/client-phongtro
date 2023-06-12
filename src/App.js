import "./_app.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  HomePage,
  Rental,
  DetailPost,
  SearchDetail,
} from "./pages/public";
import { path } from "./utils/constant";
import { CreatePost, System } from "./pages/systems";

const router = createBrowserRouter([
  {
    path: path.HOME,
    element: <Home />,
    children: [
      {
        path: path.RENTAL_ROOM,
        element: <Rental />,
      },
      {
        path: path.RENTAL_APARTMENT,
        element: <Rental />,
      },
      {
        path: path.RENTAL_HOUSE,
        element: <Rental />,
      },
      {
        path: path.DETAIL_POST_ID,
        element: <DetailPost />,
      },
      {
        path: path.RENTAL_SPACE,
        element: <Rental />,
      },
      {
        path: path.SEARCH_DETAIL,
        element: <SearchDetail />,
      },
      {
        path: path.LOGIN,
        element: <Login />,
      },
      {
        path: path.REGISTER,
        element: <Register />,
      },
      {
        path: path.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: path.SYSTEM,
    element: <System />,
    children: [
      {
        path: path.NEW_POST,
        element: <CreatePost />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
