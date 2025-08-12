import { get_allAdmins } from "config/fetch";
import Admins from "./Admins";
import { authOptions } from "components/auth/authOptions";
import { getServerSession } from "next-auth";

const SuperAdmin = async () => {
  const session = await getServerSession(authOptions);

  const accessToken = session?.accessToken;
  console.log(accessToken, "access token");
  const admins = await get_allAdmins(accessToken)
  return (
    <Admins admins={admins} />
  );
};

export default SuperAdmin;
