import React, { Suspense } from "react";
import { UserVerification } from "@components/email-verification/UserVerification";

const VerifyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserVerification />
    </Suspense>
  );
};

export default VerifyPage;
