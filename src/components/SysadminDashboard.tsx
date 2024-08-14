// src/components/SysadminDashboard.tsx
import React, { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
  clearError,
  resetEditStatus,
  resetAddStatus,
} from "../redux/slices/userSlice";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MTable from "../components/MTable";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
}));

const roles = ["Sysadmin", "Staff", "User"];

const SysadminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, editStatus, addStatus } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (editStatus === "succeeded" || addStatus === "succeeded") {
      dispatch(fetchUsers());
      dispatch(resetEditStatus());
      dispatch(resetAddStatus());
    }
  }, [editStatus, addStatus, dispatch]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setUsername("");
    setRole("");
  };

  const handleAddUser = () => {
    dispatch(addUser({ username, role }));
    handleCloseAdd();
  };

  const handleClickOpenEdit = (user: any) => {
    setSelectedUser(user);
    setUsername(user.username);
    setRole(user.role);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setUsername("");
    setRole("");
    setSelectedUser(null);
  };

  const handleEditUser = () => {
    dispatch(editUser({ id: selectedUser._id, username, role }));
    handleCloseEdit();
  };

  const deleteUserHandler = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", flex: 2 },
    { field: "role", headerName: "Role", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButtonStyled
            color="primary"
            title="Delete User"
            onClick={() => {
              deleteUserHandler(params.row._id);
            }}
          >
            <RemoveCircleOutlineIcon />
          </IconButtonStyled>

          <IconButtonStyled
            color="primary"
            title="Edit User"
            onClick={() => {
              handleClickOpenEdit(params.row);
            }}
          >
            <EditIcon />
          </IconButtonStyled>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Sysadmin Dashboard
        </Typography>

        <Tooltip title="Add User">
          <IconButtonStyled color="primary" onClick={handleClickOpenAdd}>
            <PersonAddIcon fontSize="large" />
          </IconButtonStyled>
        </Tooltip>
      </Box>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Box mt={2}>
        <MTable rows={users} columns={columns} getRowId={(row) => row._id} />
      </Box>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitleStyled>Add User</DialogTitleStyled>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              label="Role"
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            color="primary"
            disabled={!username || !role}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitleStyled>Edit User</DialogTitleStyled>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="edit-role-label">Role</InputLabel>
            <Select
              label="Role"
              labelId="edit-role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleEditUser}
            color="primary"
            disabled={!username || !role}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SysadminDashboard;
