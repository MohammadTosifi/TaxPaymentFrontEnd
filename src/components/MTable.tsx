// components/MTable.tsx

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";

export const StyledDataGridHeader = styled(DataGrid)`
  && .MuiDataGrid-columnHeaders {
    background-color: #f5f5f5;
  }

  && .MuiDataGrid-footerContainer {
    background-color: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px;
  }

  && .MuiTablePagination-root {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  && .MuiTablePagination-toolbar {
    flex-wrap: nowrap;
  }

  && .MuiTablePagination-actions {
    margin-left: 16px;
  }

  && .MuiTablePagination-root p {
    padding: 0 !important;
    margin: 0 !important;
  }
`;

interface ITableProps<T> {
  rows: T[];
  columns: GridColDef[];
  getRowId?: (row: T) => any;
}

const MTable: React.FC<ITableProps<any>> = ({ rows, columns, getRowId }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <StyledDataGridHeader
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default MTable;
