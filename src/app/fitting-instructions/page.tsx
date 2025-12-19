import { Breadcrumb, BlindFitting, Instructions, ContactBanner } from "@components";

import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.fitting_instructions);

const FittingInstructions = () => {
  return (
    <>
      <Breadcrumb title="Fitting Instructions" />
      <BlindFitting />
      <div className="container mx-auto px-2">
        <Instructions />
        <ContactBanner />
      </div>
    </>
  );
};

export default FittingInstructions;
