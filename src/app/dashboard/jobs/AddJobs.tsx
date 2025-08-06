"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { IJOBS, initialJobsTypes } from 'types/carear';
import {
  Formik,
  FieldArray,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
} from "formik";
import { RxCross2 } from 'react-icons/rx';
import { CREATE_JOBS, UPDATE_JOBS } from 'graphql/JobsModule';
import JobsValidationsSchema from 'data/general';
import { useSession } from 'next-auth/react';



interface IVIEWREDIRECTURLS {
  setjob: React.Dispatch<SetStateAction<IJOBS | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  job: IJOBS | undefined
}


function AddRedirecturl({ job, setjob, setselecteMenu }: IVIEWREDIRECTURLS) {
  const [AddredirectUrls, { loading }] = useMutation(CREATE_JOBS)

  const [updateReviewMutation, { loading: updateloading }] = useMutation(UPDATE_JOBS);
  const session = useSession()
  const finalToken = session.data?.accessToken
  const [formData, setformDate] = useState<initialJobsTypes>({
    title: job?.title || "",
    custom_url: job?.custom_url || "",
    isFilled: job?.isFilled || false,
    apply: job?.apply || [{ name: "", detail: [] }],
    salary: job?.salary || "",
    location: job?.location || "",
    description: job?.description || "",
    jobType: job?.jobType || "",
    status: job?.status || "DRAFT",
    benefits: job?.benefits || [{ name: "", detail: [] }],
    requirements: job?.requirements || [{ name: "", detail: [] }],
    responsibilities: job?.responsibilities || [{ name: "", detail: [] }],
         Meta_Title: job?.Meta_Title || "",
        Meta_Description: job?.Meta_Description || "",
        Canonical_Tag: job?.Canonical_Tag || "",

  })

  useEffect(() => {

    setformDate(
      {
        title: job?.title || "",
        custom_url: job?.custom_url || "",
        isFilled: job?.isFilled || false,
        apply: job?.apply || [{ name: "", detail: [] }],
        salary: job?.salary || "",
        location: job?.location || "",
        description: job?.description || "",
        Meta_Title: job?.Meta_Title || "",
        Meta_Description: job?.Meta_Description || "",
        Canonical_Tag: job?.Canonical_Tag || "",
        status: job?.status || "DRAFT",
        jobType: job?.jobType || "",
        benefits: job?.benefits || [{ name: "", detail: [] }],
        requirements: job?.requirements || [{ name: "", detail: [] }],
        responsibilities: job?.responsibilities || [{ name: "", detail: [] }],

      }
    )
  }, [job])



  const apiHandler = async (values: initialJobsTypes, reset: () => void) => {
    try {
      if (job?.custom_url) {
        // UPDATE existing review
        await updateReviewMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            UpdateCreateJobDto: {
              id: job.id,
              ...values,
            },
          },
        });
      } else {
        // ADD new review
        await AddredirectUrls({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            CreateJobDto: values,
          },
        });
      }

      setjob(undefined);
      setselecteMenu('All Jobs')
      revalidateTag("Jobs")
      reset()
      // eslint-disable-next-line
    } catch (error: any) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      showToast('error', graphQLError || "Internal server error")
    }


  };



  const handleSubmit = async (values: initialJobsTypes, { resetForm }: FormikHelpers<initialJobsTypes>) => {
    await apiHandler(values, resetForm)


  };



  return (


    <Formik
      initialValues={formData}
      validationSchema={JobsValidationsSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="space-y-4 max-w-2xl mx-auto">
   
          <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
            <p
            className="dashboard_primary_button"
              onClick={() => setselecteMenu('All Jobs')}
            >
              <IoMdArrowRoundBack /> Back
            </p>
            <div className="flex justify-center gap-4 items-center">
              <Field name="status">
                    {({ field, form }: import('formik').FieldProps) => (
                      <div className="flex gap-4 items-center border-r-2 px-2">

                        {['DRAFT', 'PUBLISHED'].map((status) => {
                          const isActive = field.value === status;

                          return (
                            <button
                              key={status}
                              type="button"
                              onClick={() => form.setFieldValue('status', status)}
                              disabled={isActive}
                              className={`px-4 py-2 rounded-md text-sm border
                                ${isActive
                                  ? 'bg-black text-white border-black cursor-not-allowed'
                                  : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer'
                                }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    )}
              </Field>
              <button
                type="submit"
                className="dashboard_primary_button cursor-pointer"
                disabled={loading || updateloading}
              >
                {(loading || updateloading) ? "Submitting" : "Submit"}
              </button>
            </div>
          </div>

          {/* custom_url */}
          <div>
            <label htmlFor="custom_url">Custom URL</label>
            <Field name="custom_url" type="text" className="primary-input" />
            <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
          </div>

          {/* title */}
          <div>
            <label htmlFor="title">Job Title</label>
            <Field name="title" type="text" className="primary-input" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          {/* location */}
          <div className='flex justify-between items-center gap-4 flex-wrap md:flex-nowrap'>
            <div>
              <label htmlFor="location">Location</label>
              <Field name="location" type="text" className="primary-input" />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>

            {/* jobType */}
            <div>
              <label htmlFor="jobType">Job Type</label>
              <Field name="jobType" type="text" className="primary-input" />
              <ErrorMessage name="jobType" component="div" className="text-red-500 text-sm" />
            </div>

            {/* salary */}
            <div>
              <label htmlFor="salary">Salary</label>
              <Field name="salary" type="text" className="primary-input" />
              <ErrorMessage name="salary" component="div" className="text-red-500 text-sm" />
            </div>

            {/* isFilled */}
            <div>
              <label>
                <Field name="isFilled" type="checkbox" className="mr-2 primary-input" />
                Is Filled?
              </label>
              <ErrorMessage name="isFilled" component="div" className="text-red-500 text-sm" />


            </div>
          </div>

          {/* description */}
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" className="primary-input" rows={4} />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className='flex justify-between items-center'>
            {/* responsibilities */}

            <div className="flex flex-col py-4 px-2 bg-primary ">
              <FieldArray name="responsibilities">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-6 bg-primary ">
                    {formik.values.responsibilities &&
                      formik.values.responsibilities.map((responsibilities, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-4 bg-primary">

                          {/* Heading input */}
                          <div>
                            <label className="font-semibold">Heading</label>
                            <input
                              type="text"
                              name={`responsibilities[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.responsibilities[index].name}
                              placeholder="AppyText  heading"
                              className="primary-input"
                            />
                          </div>

                          {/* Detail FieldArray */}
                          <FieldArray name={`responsibilities[${index}].detail`}>
                            {({ push: pushDetail, remove: removeDetail }) => {

                              return (
                                <div className="space-y-2">
                                  <label className="font-semibold">Options</label>
                                  {Array.isArray(responsibilities.detail) && responsibilities.detail?.map((option: string, optIndex: number) => {
                                    return (


                                      <div key={optIndex} className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          name={`responsibilities[${index}].detail[${optIndex}]`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik?.values?.responsibilities?.[index]?.detail?.[optIndex] || ""}
                                          placeholder={`Option ${optIndex + 1}`}
                                          className="primary-input"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeDetail(optIndex)}
                                          className="text-red-500"
                                        >
                                          <RxCross2 size={22} />
                                        </button>
                                      </div>
                                    )
                                  })}

                                  <button
                                    type="button"
                                    onClick={() => pushDetail("")}
                                    className="text-sm text-blue-600 hover:underline"
                                  >
                                    + Add Option
                                  </button>
                                </div>
                              )
                            }}
                          </FieldArray>

                          {/* Remove benefit */}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Remove Responsibilities Text
                          </button>
                        </div>
                      ))}

                    {/* Add new Responsibilities group */}
                    <button
                      type="button"
                      onClick={() => push({ name: "", detail: [""] })}
                      className="px-4 py-2 hover:bg-primary border border-white cursor-pointer rounded-md shadow-md w-fit"
                    >
                      + Add Responsibilities Text
                    </button>
                  </div>
                )}
              </FieldArray>

            </div>


            {/* requirements */}

            <div className="flex flex-col py-4 px-2 bg-primary ">
              <FieldArray name="requirements">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-6 bg-primary ">
                    {formik.values.requirements &&
                      formik.values.requirements.map((requirements, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-4 bg-primary">

                          {/* Heading input */}
                          <div>
                            <label className="font-semibold">Heading</label>
                            <input
                              type="text"
                              name={`requirements[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.requirements[index].name}
                              placeholder="AppyText  heading"
                              className="primary-input"
                            />
                          </div>

                          {/* Detail FieldArray */}
                          <FieldArray name={`requirements[${index}].detail`}>
                            {({ push: pushDetail, remove: removeDetail }) => (
                              <div className="space-y-2">
                                <label className="font-semibold">Options</label>
                                {Array.isArray(requirements.detail) && requirements.detail?.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      name={`requirements[${index}].detail[${optIndex}]`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.requirements?.[index]?.detail?.[optIndex] || ""}
                                      placeholder={`Option ${optIndex + 1}`}
                                      className="primary-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeDetail(optIndex)}
                                      className="text-red-500"
                                    >
                                      <RxCross2 size={22} />
                                    </button>
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  onClick={() => pushDetail("")}
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  + Add Option
                                </button>
                              </div>
                            )}
                          </FieldArray>

                          {/* Remove benefit */}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Remove Requirements Text
                          </button>
                        </div>
                      ))}

                    {/* Add new requirements group */}
                    <button
                      type="button"
                      onClick={() => push({ name: "", detail: [""] })}
                      className="px-4 py-2 hover:bg-primary border border-white cursor-pointer rounded-md shadow-md w-fit"
                    >
                      + Add Requirements Text
                    </button>
                  </div>
                )}
              </FieldArray>

            </div>

          </div>


          <div className='flex justify-between items-center'>


            <FieldArray name="benefits">
              {({ push, remove }) => (
                <div className="flex flex-col gap-6 bg-primary">
                  {formik.values.benefits?.map((benefit, index) => (
                    <div key={index} className="border rounded-md p-4 space-y-4 bg-primary">
                      {/* Heading input */}
                      <div>
                        <label className="font-semibold">Heading</label>
                        <input
                          type="text"
                          name={`benefits[${index}].name`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.benefits[index]?.name || ""}
                          placeholder="Benefit heading"
                          className="primary-input"
                        />
                      </div>

                      {/* Detail FieldArray */}
                      <FieldArray name={`benefits[${index}].detail`}>
                        {({ push: pushDetail, remove: removeDetail }) => (
                          <div className="space-y-2">
                            <label className="font-semibold">Options</label>
                            {Array.isArray(benefit.detail) &&
                              benefit.detail.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    name={`benefits[${index}].detail[${optIndex}]`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.benefits?.[index]?.detail?.[optIndex] || ""
                                    }
                                    placeholder={`Option ${optIndex + 1}`}
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeDetail(optIndex)}
                                    className="text-red-500"
                                  >
                                    <RxCross2 size={22} />
                                  </button>

                                  <ErrorMessage
                                    name={`benefits[${index}].name`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>

                              ))}

                            <button
                              type="button"
                              onClick={() => pushDetail("")}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              + Add Option
                            </button>
                          </div>
                        )}
                      </FieldArray>

                      {/* Remove benefit */}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove Benefit
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push({ name: "", detail: [""] })}
                    className="px-4 py-2 hover:bg-primary border border-white cursor-pointer rounded-md shadow-md w-fit"
                  >
                    + Add Benefit
                  </button>
                </div>
              )}
            </FieldArray>




            {/* Apply */}

            <div className="flex flex-col py-4 px-2 bg-primary ">
              <FieldArray name="apply">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-6 bg-primary ">
                    {formik.values.apply &&
                      formik.values.apply.map((apply, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-4 bg-primary">

                          {/* Heading input */}
                          <div>
                            <label className="font-semibold">Heading</label>
                            <input
                              type="text"
                              name={`apply[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.apply[index].name}
                              placeholder="AppyText  heading"
                              className="primary-input"
                            />
                          </div>

                          {/* Detail FieldArray */}
                          <FieldArray name={`apply[${index}].detail`}>
                            {({ push: pushDetail, remove: removeDetail }) => (
                              <div className="space-y-2">
                                <label className="font-semibold">Options</label>
                                {Array.isArray(apply.detail) && apply.detail?.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      name={`apply[${index}].detail[${optIndex}]`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.apply?.[index]?.detail?.[optIndex] || ""}
                                      placeholder={`Option ${optIndex + 1}`}
                                      className="primary-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeDetail(optIndex)}
                                      className="text-red-500"
                                    >
                                      <RxCross2 size={22} />
                                    </button>
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  onClick={() => pushDetail("")}
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  + Add Option
                                </button>
                              </div>
                            )}
                          </FieldArray>

                          {/* Remove benefit */}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Remove apply Text
                          </button>
                        </div>
                      ))}

                    {/* Add new apply group */}
                    <button
                      type="button"
                      onClick={() => push({ name: "", detail: [""] })}
                      className="px-4 py-2 hover:bg-primary border border-white cursor-pointer rounded-md shadow-md w-fit"
                    >
                      + Add Apply Text
                    </button>
                  </div>
                )}
              </FieldArray>

            </div>

          </div>




          <div className='flex justify-between items-center'>
            <div>
              <label htmlFor="Canonical_Tag">Canonical Tag</label>
              <Field name="Canonical_Tag" type="text" className="primary-input" />
              <ErrorMessage name="Canonical_Tag" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="Meta_Title">Meta Title</label>
              <Field name="Meta_Title" type="text" className="primary-input" />
              <ErrorMessage name="Meta_Title" component="div" className="text-red-500 text-sm" />
            </div>

          </div>

          <div>
            <label htmlFor="Meta_Description">Meta Description</label>
            <Field name="Meta_Description" as="textarea" className="primary-input" rows={3} />
            <ErrorMessage name="Meta_Description" component="div" className="text-red-500 text-sm" />
          </div>
          <Field name="status">
              {({ field, form }: import('formik').FieldProps) => (
                <div className="flex gap-4 items-center my-4">
                  <label className="font-semibold">Job Status:</label>

                  {['DRAFT', 'PUBLISHED'].map((status) => {
                    const isActive = field.value === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => form.setFieldValue('status', status)}
                        disabled={isActive}
                        className={`px-4 py-2 rounded-md text-sm border
                          ${isActive
                            ? 'bg-black text-white border-black cursor-not-allowed'
                            : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer'
                          }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              )}
          </Field>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || updateloading}
            className="dashboard_primary_button rounded"
          >
            {(loading || updateloading) ? "Submitting" : "Submit"}
          </button>
        </Form>
      )}
    </Formik>



  )
}

export default AddRedirecturl


