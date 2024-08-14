// General React imports
import React, { useState, useEffect } from "react";

// Redux imports
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

// MUI imports
import { Toolbar, IconButton, Menu, ListItemIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

// Styled components
import {
  AnimatedMenuItem,
  MenuItemText,
  ProfileButton,
  StyledAppBar,
  Title,
} from "../../src/styles/componentsStyled/NavbarComponents";

// Interfaces
import { IActor } from "../interfaces/userInteface";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [userInfo, setUserInfo] = useState<IActor | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      setUserInfo(JSON.parse(userInfoString));
    }
  }, []);

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.replace("/login");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Title variant="h6">{title}</Title>
        <ProfileButton
          color="inherit"
          onClick={handleProfileMenuClick}
          aria-controls="account-menu"
          aria-haspopup="true"
        >
          <AccountCircleIcon fontSize="large" />
        </ProfileButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <AnimatedMenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <MenuItemText primary={`User: ${userInfo?.username}`} />
          </AnimatedMenuItem>
          <AnimatedMenuItem>
            <ListItemIcon>
              <WorkIcon fontSize="small" />
            </ListItemIcon>
            <MenuItemText primary={`Role: ${userInfo?.role}`} />
          </AnimatedMenuItem>
          <AnimatedMenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <MenuItemText primary="Logout" />
          </AnimatedMenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
