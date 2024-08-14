// src/pages/Login.tsx
import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser, clearError } from "../redux/slices/authSlice";
// Styled Components
import {
  StyledButton,
  ButtonRow,
  FormContainer,
  LeftContainer as OriginalLeftContainer,
  RightContainer as OriginalRightContainer,
  StyledContainer,
  StyledLink,
  StyledSignupButton,
  StyledTextField,
  Title,
} from "../styles/pagesStyled/LoginComponents";

// MUI imports
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert, AlertTitle } from "@mui/material";
import styled, { keyframes } from "styled-components";
import ErrorIcon from "@mui/icons-material/Error";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const RightContainer = styled((props: any) => (
  <OriginalRightContainer {...props} />
))`
  &&& {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: ${fadeIn} 1s ease-out;
  }
`;

const LeftContainer = styled((props: any) => (
  <OriginalLeftContainer {...props} />
))`
  &&& {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #fff;
    text-align: center;
    animation: ${slideInLeft} 1s ease-out;
  }
`;

const AnimatedFormContainer = styled(FormContainer)`
  animation: ${slideInRight} 1s ease-out;
`;

const LargeDialog = styled(Dialog)`
  & .MuiDialog-paper {
    min-width: 500px;
    padding: 15px;
  }
`;

const LargeAlert = styled(Alert)`
  & .MuiAlert-message {
    font-size: 1rem;
  }
  & .MuiAlertTitle-root {
    font-size: 1rem;
  }
`;

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setAlertMessage("Please fill in both Username and Password fields");
      setOpen(true);
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  const handleClose = () => {
    setOpen(false);
    setAlertMessage("");
    dispatch(clearError());
  };

  useEffect(() => {
    if (userInfo) {
      window.location.replace("/app");
    }
  }, [userInfo]);

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Grid container>
        <LeftContainer item xs={false} sm={4} md={7}>
          <Typography
            variant="h4"
            style={{ color: "#fff", marginBottom: "20px" }}
          >
            Online Tax Payment System
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "#fff", marginBottom: "20px" }}
          >
            Team Members
          </Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="body1"
              style={{ color: "#fff", marginBottom: "5px" }}
            >
              Mohammad Tosifi
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#fff", marginBottom: "5px" }}
            >
              Mohammed Reda Berzou
            </Typography>
          </Box>
        </LeftContainer>
        <RightContainer
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <AnimatedFormContainer>
            <LockOutlinedIcon color="primary" style={{ fontSize: 48 }} />
            <Title component="h1" variant="h5">
              Welcome, please login!
            </Title>
            <StyledTextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <StyledTextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonRow>
              <StyledButton variant="contained" onClick={handleLogin}>
                {loading ? "Logging in..." : "Login"}
              </StyledButton>
            </ButtonRow>
          </AnimatedFormContainer>
        </RightContainer>
      </Grid>
      <LargeDialog open={open || !!error} onClose={handleClose}>
        <LargeAlert severity="error" icon={<ErrorIcon fontSize="inherit" />}>
          <AlertTitle>Error</AlertTitle>
          {alertMessage || error}
        </LargeAlert>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </LargeDialog>
    </StyledContainer>
  );
};

export default Login;
