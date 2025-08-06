
import { Session } from "next-auth";
import { Permissions } from "types/type";

type PermissionKey = keyof Permissions;

export const getPermission = (
  session: Session | null,
  key: PermissionKey
): boolean => {
  if (!session?.user) return false;
  if (session.user.role === "Admin") {
    return !!session.user[key];
  }

  return true;
};
