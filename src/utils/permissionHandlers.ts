import { Session } from "next-auth";

type PermissionKey = keyof Permissions;

export const getPermission = (session: Session | null, key: PermissionKey): boolean => {
  if (!session?.user) return false;
  if (session.user.role === "ADMIN") {
    return !!session.user[key];
  }

  return true;
};
