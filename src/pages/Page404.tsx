// components/Page404.tsx

import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page404: React.FC = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Message>Oops! The page you are looking for does not exist.</Message>
      <StyledLink to="/">Go Back Home</StyledLink>
    </Container>
  );
};

export default Page404;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 10rem;
  margin: 0;
  color: #343a40;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
  color: #6c757d;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
