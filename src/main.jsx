import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./Components/Components.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import SpaceDetail from "./Pages/SpaceDetail.jsx";
import UserProfile from "./Pages/UserProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="space-detail/:id" element={<SpaceDetail />} />
      <Route path="my-profile" element={<UserProfile />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
