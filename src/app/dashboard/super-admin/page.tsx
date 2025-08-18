import { get_allAdmins } from "config/fetch";
import Admins from "./Admins";
import { authOptions } from "components/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SuperAdmin = async () => {
  const session = await getServerSession(authOptions);

  const accessToken = session?.accessToken;
  if(session?.user.role === 'Admin') return redirect('/not-found');
  const admins = await get_allAdmins(accessToken)
  return (
    <Admins admins={admins} />
  );
};

export default SuperAdmin;
