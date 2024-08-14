import styles from '../styled';
import styled from 'styled-components';
import {
  Typography,
  Box,
  Checkbox,
  IconButton,
  createTheme,
} from '@mui/material';

const style = styles.AssignedCustomersToMemberStyles;
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
    margin-right: ${theme.spacing(1)}px;
    color: #333;
  }
`;
