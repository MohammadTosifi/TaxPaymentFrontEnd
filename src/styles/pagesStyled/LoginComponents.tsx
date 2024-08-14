import styles from "../styled";
import styled from "styled-components";

import { Container, ContainerProps } from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography, { TypographyProps } from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const style = styles.loginStyles;

export const StyledContainer = styled((props: ContainerProps) => (
  <Container {...props} />
))`
  &&& {
    display: flex;
    height: 100vh;
    min-width: -webkit-fill-available;
    padding: 0 24px;
    margin: 0;
    background-color: #f0f2f5;
  }
`;

export const LeftContainer = styled((props: GridProps) => <Grid {...props} />)`
  &&& {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #1d1f21 0%, #292b2f 100%);
    color: #fff;
  }
`;

export const RightContainer = styled((props: GridProps) => <Grid {...props} />)`
  &&& {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
  }
`;

export const FormContainer = styled.div`
  &&& {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
`;

export const Title = styled((props: TypographyProps) => (
  <Typography {...props} />
))`
  &&& {
    margin-bottom: 20px;
    color: #1d1f21;
  }
`;

export const StyledTextField = styled(TextField)`
  &&& {
    margin-bottom: 16px;
    width: 100%;
  }
`;

export const ButtonRow = styled.div`
  &&& {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
`;

export const StyledSignupButton = styled(Button)`
  &&& {
    width: 100%;
    background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
    color: #fff;
  }
`;

export const StyledButton = styled(Button)`
  &&& {
    width: 100%;
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
    color: #fff;
    margin-right: 0.938rem;
  }
`;

export const StyledLink = styled(Link)`
  &&& {
    margin-top: 8px;
    display: block;
    color: #0072ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
