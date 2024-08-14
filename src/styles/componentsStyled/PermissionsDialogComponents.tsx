import styles from '../styled';
import styled from 'styled-components';

const style = styles.PermissionsDialogStyles;

export const ItemsContainer = styled.div`
  &&& {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
  }
`;
export const Items = styled.div`&&&{
        display: 'flex',
      alignItems: 'center',
}`;
