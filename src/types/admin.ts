
export interface CreateAdminProps {
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  // EditAdminValue?: Admin;
  // EditInitialValues?: Admin | null;
  // setEditProduct: React.Dispatch<React.SetStateAction<Admin | null>>;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
  __typename?: string;
}

export interface AlladminsProps {
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  AllAdminData: Admin[];
}