// src/redux/slices/userInvoiceSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import { RootState } from "../store";

interface Invoice {
  _id: string;
  userId: string;
  amount: number;
  status: string;
}

interface InvoiceState {
  userInvoices: Invoice[];
  loading: boolean;
  error: string | null;
  paymentStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: InvoiceState = {
  userInvoices: [],
  loading: false,
  error: null,
  paymentStatus: "idle",
};

export const fetchUserInvoices = createAsyncThunk<
  Invoice[],
  void,
  { rejectValue: string }
>("userInvoices/fetchUserInvoices", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/v1/invoices/users");
    return response.data.data.invoices;
  } catch (err) {
    return rejectWithValue("Failed to fetch user invoices");
  }
});

export const payUserInvoice = createAsyncThunk<
  Invoice,
  string,
  { rejectValue: string }
>("userInvoices/payUserInvoice", async (invoiceId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/v1/invoices/pay/${invoiceId}`);
    return response.data.data.invoice;
  } catch (err) {
    return rejectWithValue("Failed to pay invoice");
  }
});

const userInvoiceSlice = createSlice({
  name: "userInvoices",
  initialState,
  reducers: {
    resetPaymentStatus(state) {
      state.paymentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserInvoices.fulfilled,
        (state, action: PayloadAction<Invoice[]>) => {
          state.loading = false;
          state.userInvoices = action.payload;
        }
      )
      .addCase(
        fetchUserInvoices.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch user invoices";
        }
      )
      .addCase(payUserInvoice.pending, (state) => {
        state.paymentStatus = "loading";
        state.error = null;
      })
      .addCase(
        payUserInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.paymentStatus = "succeeded";
          const index = state.userInvoices.findIndex(
            (invoice) => invoice._id === action.payload._id
          );
          if (index !== -1) {
            state.userInvoices[index] = action.payload;
          }
        }
      )
      .addCase(
        payUserInvoice.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.paymentStatus = "failed";
          state.error = action.payload || "Failed to pay invoice";
        }
      );
  },
});

export const { resetPaymentStatus } = userInvoiceSlice.actions;

export default userInvoiceSlice.reducer;

export const selectUserInvoices = (state: RootState) =>
  state.userInvoices.userInvoices;
export const selectInvoiceLoading = (state: RootState) =>
  state.userInvoices.loading;
export const selectInvoiceError = (state: RootState) =>
  state.userInvoices.error;
export const selectPaymentStatus = (state: RootState) =>
  state.userInvoices.paymentStatus;
