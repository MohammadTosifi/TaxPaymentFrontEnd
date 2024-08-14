//General react imports
import React from "react";

//Routing imports
import routes from "../routes";
import { Outlet, useLocation } from "react-router-dom";

//Components
import Main from "./Main";

//Styled components
import {
  ContentContainer,
  RootContainer,
} from "../styles/containersStyled/LayoutComponents";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.split("/app").filter(Boolean)[0];
  const title = routes.find((r) => r.path === `${path}`)?.title || "";

  return (
    <RootContainer>
      <Sidebar />
      <ContentContainer>
        <Navbar title={title} />
        <Main>
          <Outlet />
        </Main>
      </ContentContainer>
    </RootContainer>
  );
};

export default Layout;
