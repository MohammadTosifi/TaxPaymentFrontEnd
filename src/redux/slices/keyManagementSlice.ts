import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface KeyState {
  desKey: string;
  rsaPublicKey: string;
  loading: boolean;
  error: string | null;
}

const initialState: KeyState = {
  desKey: "",
  rsaPublicKey: "",
  loading: false,
  error: null,
};

export const generateDESKey = createAsyncThunk(
  "keys/generateDESKey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/keys/generate-des-key"
      );
      return response.data.data.desKey;
    } catch (err) {
      return rejectWithValue("Failed to generate DES key");
    }
  }
);

export const generateRSAKeyPair = createAsyncThunk(
  "keys/generateRSAKeyPair",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/keys/generate-rsa-key-pair"
      );
      //   const { token } = response.data;

      //   // Update the user info in local storage with the new token
      //   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      //   userInfo.token = token;
      //   localStorage.setItem("userInfo", JSON.stringify(userInfo));

      //   // Update the axios instance with the new token
      //   axiosInstance.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${token}`;

      return response.data.message;
    } catch (err) {
      return rejectWithValue("Failed to generate RSA key pair");
    }
  }
);

export const fetchDESKey = createAsyncThunk(
  "keys/fetchDESKey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/keys/des-key");
      return response.data.data.desKey;
    } catch (err) {
      return rejectWithValue("Failed to fetch DES key");
    }
  }
);

export const fetchRSAPublicKey = createAsyncThunk(
  "keys/fetchRSAPublicKey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/keys/rsa-public-key");
      return response.data.data.rsaPublicKey;
    } catch (err) {
      return rejectWithValue("Failed to fetch RSA public key");
    }
  }
);

const keyManagementSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateDESKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateDESKey.fulfilled, (state, action) => {
        state.loading = false;
        state.desKey = action.payload;
      })
      .addCase(generateDESKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(generateRSAKeyPair.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRSAKeyPair.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(generateRSAKeyPair.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDESKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDESKey.fulfilled, (state, action) => {
        state.loading = false;
        state.desKey = action.payload;
      })
      .addCase(fetchDESKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRSAPublicKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRSAPublicKey.fulfilled, (state, action) => {
        state.loading = false;
        state.rsaPublicKey = action.payload;
      })
      .addCase(fetchRSAPublicKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default keyManagementSlice.reducer;
