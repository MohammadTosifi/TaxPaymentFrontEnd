import styled from 'styled-components';
import { Button, DialogTitle } from '@mui/material';

export const Form = styled.form`
  &&& {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 16px;
  }
`;
export const ButtonStyled = styled(Button)`
  &&& {
    color: #fff;
    background-color: #333;
    &:hover {
      background-color: #555; // Custom hover color
    }
  }
`;

export const DialogTitleStyled = styled(DialogTitle)`
  &&& {
    background-color: #333;
    color: #fff;
    margin-bottom: 1rem;
  }
`;
