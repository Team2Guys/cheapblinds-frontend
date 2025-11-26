export interface CreateAdminProps {
  setSelecteMenu: React.Dispatch<React.SetStateAction<string>>;
  editAdmin?: Admin | null;
}

export interface Admin {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AllAdminsProps {
  setSelecteMenu: React.Dispatch<React.SetStateAction<string>>;
  setEditAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  AllAdminData: Admin[];
}
