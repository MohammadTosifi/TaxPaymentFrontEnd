// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import invoiceReducer from "./slices/invoiceSlice";
import userRolesReducer from "./slices/userRolesSlice";
import userInvoiceReducer from "./slices/userInvoiceSlice";
import keysReducer from "./slices/keyManagementSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    userRoles: userRolesReducer,
    invoices: invoiceReducer,
    userInvoices: userInvoiceReducer,
    keys: keysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
