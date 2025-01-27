// src/admin/AdminApp.js
import React from "react";
import { Admin, Resource, defaultTheme, Layout } from "react-admin";
import { createTheme } from "@mui/material/styles";
import dataProvider from "./dataProvider";

const myTheme = createTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: "#001f3f", // your navy color
    },
    secondary: {
      main: "#f50057",
    },
  },
  // You can customize typography, shape, etc.
});

const AdminApp = () => (
  <Admin dataProvider={dataProvider} theme={myTheme}>
    <Resource name="products" />
    <Resource name="orders" />
    {/* ... */}
  </Admin>
);

export default AdminApp;
