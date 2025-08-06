import { get_allAdmins } from "config/fetch";
import Admins from "./Admins";
import { cookies } from "next/headers";

const SuperAdmin = async() => {
const token = (await cookies()).get("super_admin_access_token")?.value
  const admins = await get_allAdmins(token)
  console.log(admins, "admins")
  return (
<Admins  admins={admins}/>
  );
};

export default SuperAdmin;
