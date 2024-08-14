// General react imports
import React from "react";

// Routing imports
import { Link } from "react-router-dom";
import routes from "../routes/sidebar";

// Redux Hooks
import { useSelector } from "react-redux";

// Sidebar imports
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

// Redux Types
import { RootState } from "../redux/store";
import { Typography } from "@mui/material";
import { IActor } from "../interfaces/userInteface";

const Sidebar: React.FC = () => {
  // Get user info from local storage instead of Redux state
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo: IActor | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

  function checkRoles(userInfo: IActor, roles: string[]) {
    if (userInfo) {
      const userRoles = userInfo.role;
      const matchingRoles = roles.filter((role) => userRoles.includes(role));
      return matchingRoles;
    } else {
      return [];
    }
  }

  const accessibleRoutes = userInfo
    ? routes.filter((route) => checkRoles(userInfo, route.roles).length > 0)
    : [];

  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll initial",
        border: "1px solid black",
        height: "100vh",
      }}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
        className={""}
        breakpoint={0}
        toggled={false}
        minWidth={""}
        maxWidth={""}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit", paddingRight: "80px" }}
          >
            Online Tax Payment System
          </a>
        </CDBSidebarHeader>
        <Typography
          variant="body2"
          style={{ color: "inherit", padding: "20px 0px 0px 30px" }}
        >
          Role : {userInfo?.role.toUpperCase()}
        </Typography>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {accessibleRoutes.map((route, index) => (
              <Link key={index} to={route.path}>
                <CDBSidebarMenuItem icon={route.icon}>
                  {route.name}
                </CDBSidebarMenuItem>
              </Link>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <div style={{ textAlign: "center", padding: "20px 5px" }}>
            By Group A
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
