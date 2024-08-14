//General react imports
import React, { ReactNode } from 'react';

// Styled components
import {
  ContentContainer,
  MainContainer,
} from '../styles/containersStyled/MainContainerComponents';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <MainContainer>
      <ContentContainer>{children}</ContentContainer>
    </MainContainer>
  );
}

export default Main;
