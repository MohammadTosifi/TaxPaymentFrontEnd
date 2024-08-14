// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { setUserInfo } from "./redux/slices/authSlice";
import routes from "./routes";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Layout from "./containers/Layout";
import checkToken from "./authentication/TokenAuthentication";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      dispatch(setUserInfo(JSON.parse(userInfoString)));
    }
  }, [dispatch]);

  const authenticateToken = async (userInfo: any) => {
    const token = userInfo.token;
    const tokenValidity = await checkToken(token);
    if (tokenValidity) {
      return true;
    } else {
      alert("Token is expired. Please log in again.");
      return false;
    }
  };

  function checkRoles(userInfo: any, roles: string[]) {
    if (userInfo) {
      const userRoles = [userInfo.role];
      const matchingRoles = roles.filter((role) => userRoles.includes(role));
      return matchingRoles;
    } else {
      return [];
    }
  }

  const accessibleRoutes = routes.filter(
    (route) => checkRoles(userInfo, route.roles).length > 0
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          {accessibleRoutes.map((route, index) =>
            route.component ? (
              <Route
                key={index}
                path={`/app${route.path}`}
                element={<route.component />}
              />
            ) : null
          )}
          <Route path="/app" element={<Navigate to="/app/dashboard" />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
