import * as Yup from "yup";

const JobsValidationsSchema = Yup.object({
  // Basic fields
  slug: Yup.string()
    .required("Custom URL is required")
    .max(50, "Custom URL must not exceed 255 characters"),

  title: Yup.string()
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must not exceed 100 characters"),

  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must not exceed 100 characters"),

  jobType: Yup.string()
    .required("Job type is required")
    .min(2, "Job type must be at least 2 characters")
    .max(50, "Job type must not exceed 50 characters"),

  salary: Yup.string()
    .required("Salary is required")
    .max(50, "Salary must not exceed 50 characters"),

  isFilled: Yup.boolean(),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters"),

  // SEO fields (optional)
  canonicalTag: Yup.string()
    .url("Must be a valid URL")
    .max(255, "Canonical Tag must not exceed 255 characters")
    .nullable(),

  metaTitle: Yup.string().max(100, "Meta Title must not exceed 100 characters").nullable(),

  metaDescription: Yup.string()
    .max(500, "Meta Description must not exceed 500 characters")
    .nullable(),
});

export default JobsValidationsSchema;
