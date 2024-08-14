import styles from '../styled';
import styled from 'styled-components';

import { Box, Button, Avatar, createTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const theme = createTheme();

export const Paper = styled(Box)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AvatarStyled = styled(Avatar)`
  &&& {
    margin-top: 5rem;
    margin-bottom: 0.3rem;
    background-color: #333;
  }
`;

export const Form = styled.form`
  &&& {
    width: 100%;
  }
`;

export const IconEnd = styled(Box)`
  &&& {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
`;
export const StyledSubmitButton = styled(Button)`
  &&& {
    color: #fff;
    margin: 24px 0 1rem;
    background-color: #333;
    &:hover {
      background-color: #555; // Custom hover color
    }
  }
`;

export const CustomArrowDropDownIcon = styled(ArrowDropDownIcon)`
  &&& {
    margin-right: 0.625rem;
    font-size: xx-large;
  }
`;
