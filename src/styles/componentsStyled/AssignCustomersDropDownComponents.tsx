import styles from '../styled';
import styled from 'styled-components';
import { DialogTitle, Button, TextField, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = styles.assignCustomersDropDownStyles;
export const StyledDialogTitle = styled(DialogTitle)`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    background-color: #333;
    color: #fff;
  }
`;

export const ButtonStyled = styled(Button)`
  &&& {
    color: #fff;
    background-color: #333;
    &:hover {
      background-color: #555;
    }
  }
`;

export const StyledTextField = styled(TextField)(style.input);

export const CloseIconStyled = styled(CloseIcon)`
  &&& {
    color: #fff;
  }
`;

export const DialogStyled = styled(Dialog)`
  &&& {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
