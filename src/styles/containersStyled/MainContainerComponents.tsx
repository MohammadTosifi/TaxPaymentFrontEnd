import styles from '../styled';
import styled from 'styled-components';

const style = styles.mainStyles;

export const MainContainer = styled.main`
  &&& {
    height: 100%;
    overflow-y: auto;
    background-color: #a9a9a9;
    padding: 12px; /* add padding to main */
  }
`;

export const ContentContainer = styled.div`
  &&& {
    padding: 20px;
    max-width: 2000px;
    margin: 0 auto;
    background-color: white;
    height: 100%;
    overflow: auto;
  }
`;
