// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUserRoles = createAsyncThunk(
  "users/fetchUserRoles",
  async () => {
    const response = await axiosInstance.get("api/v1/users/userRoles");
    return response.data.data.users;
  }
);

const userRolesSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserRoles.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { clearError } = userRolesSlice.actions;

export default userRolesSlice.reducer;
