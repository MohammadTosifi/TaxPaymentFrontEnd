import styles from '../styled';
import styled from 'styled-components';
import {
  Typography,
  Box,
  Checkbox,
  IconButton,
  createTheme,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export const Container = styled(Box)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(2)}px;
  }
`;

export const Title = styled(Typography)`
  &&& {
    margin-right: ${theme.spacing(2)}px;
    font-weight: bold;
  }
`;

export const HeaderBox = styled(Box)`
  &&& {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const CheckBox = styled(Checkbox)`
  &&& {
    & .MuiSvgIcon-root {
      fill: #333;
    }
  }
`;

export const IconButtonStyled = styled(IconButton)`
  &&& {
    color: #333;
  }
`;

export const LoadingContainer = styled(Box)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10rem;
  }
`;

export const StyledCircularProgress = styled(CircularProgress)`
  &&& {
    width: 50px;
    height: 50px;
    color: #333;
    display: block;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
`;
