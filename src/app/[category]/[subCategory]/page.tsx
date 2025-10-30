import Breadcrumb from "components/Layout/breadcrumb";
import Category from "../Category";

const Page = async ({ params }: { params: Promise<{ category: string; subCategory: string }> }) => {
  const resolvedParams = await params;

  return (
    <>
      <Breadcrumb slug={resolvedParams.category} title={resolvedParams.subCategory} />
      <Category />
    </>
  );
};

export default Page;