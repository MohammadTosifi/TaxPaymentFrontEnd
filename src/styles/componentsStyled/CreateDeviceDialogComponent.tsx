import styles from '../styled';
import styled from 'styled-components';

import { DialogTitle, Typography, DialogContent } from '@mui/material';

const style = styles.createDeviceDialogStyles;

export const StyledDialogTitle = styled(DialogTitle)`
  &&& {
    background-color: #333;
    color: #fff;
    padding: 0.2rem 1rem;
    margin-bottom: 1rem;
  }
`;

export const Title = styled(Typography)`
  &&& {
    padding: 1rem 0;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  &&& {
    margin-top: 1rem;
  }
`;
