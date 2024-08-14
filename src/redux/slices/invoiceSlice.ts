import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface InvoiceState {
  invoices: any[];
  loading: boolean;
  error: string | null;
  editStatus: "idle" | "pending" | "succeeded" | "failed";
  addStatus: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
  editStatus: "idle",
  addStatus: "idle",
};

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const response = await axiosInstance.get("/api/v1/invoices");
    return response.data.data.invoices;
  }
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (invoiceData: any) => {
    const response = await axiosInstance.post("/api/v1/invoices", invoiceData);
    return response.data.data.invoice;
  }
);

export const editInvoice = createAsyncThunk(
  "invoices/editInvoice",
  async (invoiceData: any) => {
    const response = await axiosInstance.patch(
      `/api/v1/invoices/${invoiceData.id}`,
      invoiceData
    );
    return response.data.data.invoice;
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
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
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.invoices = action.payload;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch invoices";
      })
      .addCase(addInvoice.pending, (state) => {
        state.addStatus = "pending";
      })
      .addCase(addInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.addStatus = "succeeded";
        state.invoices.push(action.payload);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || "Failed to add invoice";
      })
      .addCase(editInvoice.pending, (state) => {
        state.editStatus = "pending";
      })
      .addCase(editInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.editStatus = "succeeded";
        const index = state.invoices.findIndex(
          (invoice) => invoice._id === action.payload._id
        );
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message || "Failed to edit invoice";
      });
  },
});

export const { clearError, resetEditStatus, resetAddStatus } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
