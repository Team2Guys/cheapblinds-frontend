'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers, Field, ErrorMessage, } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import showToast from 'components/Toaster/Toaster';
import { DASHBOARD_ADD_INNERSUBCATEGORY_PROPS } from 'types/PagesProps';
import { INNERSUBCATEGORY } from 'types/cat';
import revalidateTag from 'components/ServerActons/ServerAction';
import { innerSubcategoryInitialValues } from 'data/InitialValues';
import { innersubcategoryValidationSchema } from 'data/Validations';
import { useMutation } from '@apollo/client';
import { CREATE_INNER_SUBCATEGORY, UPDATE_INNER_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_INNER_SUB_CATEGORIES } from 'graphql/queries';
import { ProductImage } from 'types/prod';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import { RxCross2 } from 'react-icons/rx';
import { useSession } from 'next-auth/react';

const ViewInnerSubcategories = ({
  seteditCategory,
  editCategory,
  setMenuType,
  subCategories,
}: DASHBOARD_ADD_INNERSUBCATEGORY_PROPS) => {

  const CategoryName: INNERSUBCATEGORY | undefined = editCategory && editCategory.name
    ? {
      name: editCategory.name,

      custom_url: editCategory.custom_url || "",
      subCategoryId: editCategory.subCategoryId


    }
    : undefined;

  useEffect(() => {
    setEditCategoryName(CategoryName);
  }, [editCategory])

  const [loading, setloading] = useState<boolean>(false);

  const [editCategoryName, setEditCategoryName] = useState<INNERSUBCATEGORY | undefined>(CategoryName);
  const [catalogue, setcatalogue] = useState<ProductImage[] | undefined>((editCategory && editCategory?.catalogue) ? [editCategory?.catalogue] : undefined);

  const [createSubCategory] = useMutation(CREATE_INNER_SUBCATEGORY);
  const [updateSubCategory] = useMutation(UPDATE_INNER_SUBCATEGORY);
  const session = useSession()
  const finalToken = session.data?.accessToken
  const onSubmit = async (values: INNERSUBCATEGORY, { resetForm }: FormikHelpers<INNERSUBCATEGORY>) => {
    if (!values.subCategoryId) {
      return showToast('error', 'Select subCategory!!');
    } try {

      setloading(true);

      const updateFlag = editCategoryName ? true : false;
      const updatedfields = { ...values, catalogue: catalogue ? catalogue[0] : null };

      if (updateFlag) {
        await updateSubCategory({
          variables: {
            input: {
              id: Number(editCategory?.id),
              ...updatedfields,
            },
          },
          refetchQueries: [{ query: FETCH_ALL_INNER_SUB_CATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
          },
        })
        showToast('success', 'Sub Category has been successfully updated!');
      } else {
        await createSubCategory({
          variables: {
            input: updatedfields,
          },
          refetchQueries: [{ query: FETCH_ALL_INNER_SUB_CATEGORIES }],
              context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
          },
        });
        showToast('success', 'Sub Category has been successfully created!');
      }

      revalidateTag('innerSubcategories');
      setloading(false);
      seteditCategory?.(undefined);
      setMenuType("Inner Sub Categories");
      resetForm();
    } catch (err) {
      setloading(false);

      showToast('error', 'Something went wrong!');
      throw err
    }
  }

console.log(catalogue, "catalogue")
  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-parimary bg-black rounded-sm w-fit p-2 cursor-pointer text-white"
        onClick={() => {
          setMenuType('Inner Sub Categories');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
        initialValues={
          editCategoryName ? editCategoryName : innerSubcategoryInitialValues
        }
        validationSchema={innersubcategoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center dark:bg-boxdark bg-primary">
                <div className="flex flex-col gap-5 md:gap-9 w-full lg:w-4/5 xl:w-2/5 bg-primary">
                  <div className="rounded-sm border border-stroke bg-primary p-3">




                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                          Inner Sub Category Name
                        </label>

                        <Field
                          type="text"
                          name="name"
                          placeholder="Title"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                        />

                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                      </div>


                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                          Custom Url
                        </label>

                        <Field

                          type="text"
                          name="custom_url"
                          placeholder="Custom Url"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                        />
                        <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
                      </div>


                      <div>

                        <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                          Select Parent Category (atleat one)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                          <Field
                            as="select"
                            name="subCategoryId"

                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                          >
                            <option className='bg-primary' value="" disabled>
                              Select Sub Category
                            </option>

                            {subCategories?.map((subCategory) => (
                              <option className='bg-primary' key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                              </option>
                            ))}
                          </Field>

                        </div>
                        <ErrorMessage name="subCategoryId" component="div" className="text-red-500 " />
                      </div>

                    </div>

                    {catalogue && catalogue[0] ? 
                    <div className="p-4 bg-primary">
                      {catalogue.map((item: ProductImage, index: number) => {
                        return (
                          <div
                            className="relative group rounded-lg w-fit border border-white"
                            key={index}
                          >
                            <div className="absolute top-1 right-1 invisible group-hover:visible text-red   ">
                              <RxCross2
                                className="cursor-pointer rounded"
                                size={17}
                                onClick={() => {
                                  ImageRemoveHandler(
                                    item.public_id,
                                    setcatalogue,
                                    finalToken
                                  );
                                }}
                              />
                            </div>
                                <p className="p-10 text-white">{item.imageUrl}</p>

                          </div>
                        );
                      })}
                    </div> 
                        : null}

                    <ImageUploader setImagesUrl={setcatalogue} s3Flag Ispdf />
                  </div>

                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="dashboard_primary_button"
                  disabled={loading}
                >
                  {loading ? "loading.." : 'Submit'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ViewInnerSubcategories