"use client";
import React, { useEffect, useState } from "react";
import Admins from "./Admins";
import { useAuth } from "@context/UserContext";
import { getAllAdmins } from "@config/fetch";

const SuperAdmin = () => {
  const { admin } = useAuth();
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    if (!admin?.accessToken) return;

    const fetchAdmins = async () => {
      const data = await getAllAdmins(admin.accessToken);
      setAdminList(data);
    };

    fetchAdmins();
  }, [admin?.accessToken]);

  return <Admins admins={adminList} />;
};

export default SuperAdmin;
