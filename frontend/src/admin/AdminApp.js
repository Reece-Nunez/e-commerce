// src/admin/AdminApp.js
import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider"; // custom or a library

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" />
    <Resource name="orders" />
    {/* ... */}
  </Admin>
);

export default AdminApp;
