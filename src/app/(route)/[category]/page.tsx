import Breadcrumb from "@components/Layout/breadcrumb";
import Category from "./Category";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const resolvedParams = await params;

  return (
    <>
      <Breadcrumb title={resolvedParams.category} />
      <Category />
    </>
  );
};

export default Page;
