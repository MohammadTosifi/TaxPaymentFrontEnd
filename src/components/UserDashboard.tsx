import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInvoices,
  payUserInvoice,
  resetPaymentStatus,
  selectUserInvoices,
  selectInvoiceLoading,
  selectPaymentStatus,
} from "../redux/slices/userInvoiceSlice";
import { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Container,
  IconButton,
  styled,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import MTable from "./MTable";
import { AppDispatch, RootState } from "../redux/store";

export const IconButtonStyled = styled(IconButton)`
  &&& {
    color: #333;
  }
`;

// Function to format numbers with commas
const formatAmount = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const invoices = useSelector(selectUserInvoices);
  const paymentStatus = useSelector(selectPaymentStatus);
  const loading = useSelector(selectInvoiceLoading);

  const [open, setOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchUserInvoices());
  }, [dispatch]);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      dispatch(fetchUserInvoices());
      dispatch(resetPaymentStatus());
    }
  }, [paymentStatus, dispatch]);

  const handleClickOpen = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleConfirmPayment = () => {
    if (selectedInvoiceId !== null) {
      dispatch(payUserInvoice(selectedInvoiceId));
    }
    setOpen(false);
    setSelectedInvoiceId(null);
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Invoice ID", flex: 2 },
    {
      field: "amount",
      headerName: "Amount Due",
      flex: 2,
      valueFormatter: (params) => formatAmount(params.value),
    },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          {params.row.status === "Unpaid" ? (
            <IconButtonStyled
              color="primary"
              title="Pay Invoice"
              onClick={() => {
                handleClickOpen(params.row._id);
              }}
            >
              <PaymentIcon />
            </IconButtonStyled>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Paid
            </Typography>
          )}
        </>
      ),
    },
  ];

  const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  }));

  return (
    <Container maxWidth="lg">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          User Dashboard
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      <Box mt={2}>
        <MTable rows={invoices} columns={columns} getRowId={(row) => row._id} />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitleStyled id="alert-dialog-title">
          Confirm Payment
        </DialogTitleStyled>
        <DialogContent>
          <DialogTitle id="alert-dialog-description">
            Are you sure you want to pay this invoice?
          </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;
