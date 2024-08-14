// components/Dashboard.tsx

import React, { useEffect, useState } from "react";

import { Container, Typography } from "@mui/material";
import StaffDashboard from "../components/StaffDashboard";
import SysadminDashboard from "../components/SysadminDashboard";
import UserDashboard from "../components/UserDashboard";

// Mocked user role for demonstration purposes
const userRole = "Sysadmin";

const Dashboard: React.FC = () => {
  let dashboardContent;

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get the user info from local storage
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setUserRole(userInfo.role);
    }
  }, []);

  switch (userRole) {
    case "Sysadmin":
      dashboardContent = <SysadminDashboard />;
      break;
    case "Staff":
      dashboardContent = <StaffDashboard />;
      break;
    case "User":
      dashboardContent = <UserDashboard />;
      break;
    default:
      dashboardContent = (
        <Container>
          <Typography variant="h5" gutterBottom>
            Invalid Role
          </Typography>
        </Container>
      );
  }

  return <>{dashboardContent}</>;
};

export default Dashboard;
