import styles from '../styled';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import WarningIcon from '@mui/icons-material/Warning';
import { createTheme } from '@mui/material';

const theme = createTheme(); // Replace this with your actual MUI theme

const style = styles.page404Styles;

export const Container = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    padding: 20px;
    max-width: 2000px;
    margin: 0 auto;
    background-color: white;
    height: 100%;
    overflow: auto;
  }
`;

export const Icon = styled(WarningIcon)`
  &&& {
    width: 6rem;
    height: 6rem;
    color: #333;
  }
`;

export const Title = styled(Typography)`
  &&& {
    font-size: ${theme.typography.h1.fontSize};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.text.primary};
    margin-top: ${theme.spacing(4)};
    margin-bottom: ${theme.spacing(2)};
  }
`;

export const Message = styled(Typography)`
  &&& {
    font-size: ${theme.typography.body1.fontSize};
    color: ${theme.palette.text.secondary};
    text-align: center;
  }
`;

export const LinkStyled = styled(Link)`
  &&& {
    color: ${theme.palette.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
