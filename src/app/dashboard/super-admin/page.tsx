import React from "react";
import Admins from "./Admins";
import { getAllAdmins } from "@config/fetch";

const page = async () => {
  const adminList = await getAllAdmins();
  return <Admins admins={adminList} />;
};

export default page;
