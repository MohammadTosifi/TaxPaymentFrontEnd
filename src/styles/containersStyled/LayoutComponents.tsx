import { createTheme } from '@mui/material';
import styles from '../styled';
import styled from 'styled-components';

const style = styles.layoutStyles;
const theme = createTheme();

export const RootContainer = styled.div`
  &&& {
    display: flex;
    height: 100vh;
  }
`;

export const ContentContainer = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
`;
