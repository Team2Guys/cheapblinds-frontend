import AddressBookPage from "./AddressBook";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.address);

const page = () => {
  return <AddressBookPage />;
};

export default page;
