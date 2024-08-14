import React, { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchInvoices,
  addInvoice,
  editInvoice,
  resetEditStatus,
  resetAddStatus,
} from "../redux/slices/invoiceSlice";
import { fetchUserRoles } from "../redux/slices/userRolesSlice";
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
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyIcon from "@mui/icons-material/VpnKey";
import MTable from "./MTable";
import KeyManagement from "./KeyManagement";

const formatAmount = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const StaffDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    invoices,
    loading: invoiceLoading,
    error: invoiceError,
    editStatus,
    addStatus,
  } = useSelector((state: RootState) => state.invoices);
  const {
    users,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.userRoles);

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchUserRoles());
  }, [dispatch]);

  useEffect(() => {
    if (editStatus === "succeeded" || addStatus === "succeeded") {
      dispatch(fetchInvoices());
      dispatch(resetEditStatus());
      dispatch(resetAddStatus());
    }
  }, [editStatus, addStatus, dispatch]);

  const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
    "&.Mui-disabled": {
      color: theme.palette.text.disabled,
    },
  }));

  const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  }));

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Invoice ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "amount",
      headerName: "Amount Due",
      flex: 1,
      valueFormatter: (params) => formatAmount(params.value),
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Tooltip
          title={
            params.row.status === "Paid"
              ? "Cannot edit paid invoice"
              : "Edit Invoice"
          }
        >
          <span>
            <IconButtonStyled
              color="primary"
              title="Edit Invoice"
              onClick={() => {
                handleClickOpenEdit(params.row);
              }}
              disabled={params.row.status === "Paid"}
            >
              <EditIcon />
            </IconButtonStyled>
          </span>
        </Tooltip>
      ),
    },
  ];

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openKeyManagement, setOpenKeyManagement] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  useEffect(() => {
    if (invoiceAmount && taxPercentage) {
      const amount = parseFloat(invoiceAmount);
      const tax = parseFloat(taxPercentage);
      setFinalAmount(amount + (amount * tax) / 100);
    } else {
      setFinalAmount(0);
    }
  }, [invoiceAmount, taxPercentage]);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSelectedUser("");
    setInvoiceAmount("");
    setTaxPercentage("");
    setFinalAmount(0);
  };

  const handleAddInvoice = () => {
    dispatch(
      addInvoice({
        userId: selectedUser,
        amount: finalAmount,
        status: "Unpaid",
      })
    ).then(() => {
      dispatch(fetchInvoices());
    });
    handleCloseAdd();
  };

  const handleClickOpenEdit = (invoice: any) => {
    setSelectedInvoice(invoice);
    setSelectedUser(invoice.username);
    setInvoiceAmount(invoice.amount.toString());
    setTaxPercentage("");
    setFinalAmount(invoice.amount);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser("");
    setInvoiceAmount("");
    setTaxPercentage("");
    setFinalAmount(0);
    setSelectedInvoice(null);
  };

  const handleEditInvoice = () => {
    dispatch(
      editInvoice({
        id: selectedInvoice._id,
        userId: selectedUser,
        amount: finalAmount,
        status: selectedInvoice.status,
      })
    ).then(() => {
      dispatch(fetchInvoices());
    });
    handleCloseEdit();
  };

  const handleClickOpenKeyManagement = () => {
    setOpenKeyManagement(true);
  };

  const handleCloseKeyManagement = () => {
    setOpenKeyManagement(false);
  };

  return (
    <Container maxWidth="lg">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Staff Dashboard
        </Typography>
        <Box>
          <Tooltip title="Add Invoice">
            <IconButtonStyled color="primary" onClick={handleClickOpenAdd}>
              <ReceiptIcon fontSize="large" />
            </IconButtonStyled>
          </Tooltip>
          <Tooltip title="Key Management">
            <IconButtonStyled
              color="primary"
              onClick={handleClickOpenKeyManagement}
            >
              <KeyIcon fontSize="large" />
            </IconButtonStyled>
          </Tooltip>
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      <Box mt={2}>
        <MTable rows={invoices} columns={columns} getRowId={(row) => row._id} />
      </Box>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitleStyled>Add Invoice</DialogTitleStyled>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="username-label">Username</InputLabel>
            <Select
              label="Username"
              labelId="username-label"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Invoice Amount"
            type="number"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tax Percentage"
            type="number"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Final Amount"
            type="number"
            value={finalAmount.toFixed(2)}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddInvoice}
            color="primary"
            disabled={!selectedUser || !invoiceAmount || !taxPercentage}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitleStyled>Edit Invoice</DialogTitleStyled>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              value={selectedUser}
              disabled
            ></TextField>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Invoice Amount"
            type="number"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tax Percentage"
            type="number"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="edit-status-label">Status</InputLabel>
            <Select
              label="Status"
              labelId="edit-status-label"
              value={selectedInvoice?.status || ""}
              onChange={(e) =>
                setSelectedInvoice((prev: any) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Final Amount"
            type="number"
            value={finalAmount.toFixed(2)}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditInvoice} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openKeyManagement} onClose={handleCloseKeyManagement}>
        <DialogTitleStyled>Key Management</DialogTitleStyled>
        <DialogContent>
          <KeyManagement />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseKeyManagement} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StaffDashboard;
