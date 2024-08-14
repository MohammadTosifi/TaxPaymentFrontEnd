import styles from '../styled';
import styled from 'styled-components';
import { TableCell, Table, TablePagination } from '@mui/material';

const style = styles.tableStyles;

export const TableStyled = styled(Table)`
  &&& {
    min-width: 650; /* Corrected 'minwidth' to 'min-width' */
  }
`;

export const TableCellStyled = styled(TableCell)`
  &&& {
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 4.5rem;
  }
`;

export const TablePaginationStyled = styled(TablePagination)`
  &&& {
    .MuiTablePagination-displayedRows {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .MuiTablePagination-selectLabel {
      margin-top: 1em;
      margin-bottom: 1em;
    }
  }
`;
