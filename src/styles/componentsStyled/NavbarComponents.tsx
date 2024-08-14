import styles from '../styled';
import styled from 'styled-components';

import {
  AppBar,
  Typography,
  ListItemText,
  IconButton,
  MenuItem,
} from '@mui/material';

const style = styles.navbarStyles;

export const StyledAppBar = styled(AppBar)`
  &&& {
    background: #333;
  }
`;

export const Title = styled(Typography)`
  &&& {
    flex-grow: 1;
  }
`;

export const ProfileButton = styled(IconButton)`
  &&& {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const AnimatedMenuItem = styled(MenuItem)`
  &&& {
    &:hover {
      background-color: #f5f5f5;

      & .MuiListItemIcon-root {
        color: #2196f3;
      }
    }
  }
`;

export const MenuItemText = styled(ListItemText)`
  &&& {
    & .MuiTypography-root {
      font-size: 0.9rem;
    }
  }
`;
