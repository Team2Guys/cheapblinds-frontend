import * as Yup from "yup";

export const subcategoryValidationSchema = Yup.object({
  name: Yup.string().required("Add Sub Category Name"),
  category: Yup.string().required("Select Category"),
  slug: Yup.string().required("Custom URL is required"),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required("Add  Category Name"),
  slug: Yup.string().required("Custom URL is required"),
  breadCrumb: Yup.string().required("Bread Crum is required"),
});

export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Product Name is Required"),
  description: Yup.string().required("Description is  Required"),
  slug: Yup.string().required("Custom Url is Required"),
  // price: Yup.number()
  //   .min(1, 'Minimum sales price must be at least 1')
  //   .required('Required'),
  discountPrice: Yup.number().nullable(),
});

// Validation Schema
export const getValidationSchema = (isSignup: boolean) =>
  Yup.object({
    name: isSignup ? Yup.string().required("Full Name is required") : Yup.string(),
    phone: isSignup ? Yup.string().required("Phone number is required") : Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: isSignup
      ? Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required")
      : Yup.string().required("Password is required"),
    confirmPassword: isSignup
      ? Yup.string()
          .required("Confirm Password is required")
          .oneOf([Yup.ref("password")], "Passwords must match")
      : Yup.string(),
  });

export const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// profile
export const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
});

export const validationBlogSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
  canonicalTag: Yup.string().nullable(),
  metaDescription: Yup.string().nullable(),
  metaTitle: Yup.string().nullable(),
  redirectionUrl: Yup.string().nullable(),
});

export const validationRedirctUlrsSchema = Yup.object({
  url: Yup.string().required("Url is required"),
  redirectedUrl: Yup.string().required("redirectedUrl is required"),
});

export const signUp_validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email address is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character (@, $, !, %, *, ?, &)")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

export const SignIn_validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const ForgotForm_validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email address is required"),
});

export const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character (@, $, !, %, *, ?, &)")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
