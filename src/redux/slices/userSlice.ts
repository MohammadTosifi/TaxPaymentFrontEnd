// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
  editStatus: "idle" | "pending" | "succeeded" | "failed";
  addStatus: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  editStatus: "idle",
  addStatus: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get("/api/v1/users");
  return response.data.data.users;
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: any) => {
    const response = await axiosInstance.post("/api/v1/users", userData);
    return response.data.data.user;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (userData: any) => {
    const response = await axiosInstance.patch(
      `/api/v1/users/${userData.id}`,
      userData
    );
    return response.data.data.user;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await axiosInstance.delete(`/api/v1/users/${userId}`);
    return userId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetEditStatus(state) {
      state.editStatus = "idle";
    },
    resetAddStatus(state) {
      state.addStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(addUser.pending, (state) => {
        state.addStatus = "pending";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.addStatus = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(editUser.pending, (state) => {
        state.editStatus = "pending";
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.editStatus = "succeeded";
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message || "Failed to edit user";
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { clearError, resetEditStatus, resetAddStatus } =
  userSlice.actions;

export default userSlice.reducer;
