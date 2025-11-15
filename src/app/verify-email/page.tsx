import { UserVerification } from "@components/email-verification/UserVerification";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserVerification />
    </Suspense>
  );
};

export default Page;
