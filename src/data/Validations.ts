import * as Yup from 'yup';

export const subcategoryValidationSchema = Yup.object({
    name: Yup.string().required('Add Sub Category Name'),
    category: Yup.string().required('Select Category'),
    custom_url: Yup.string().required('Custom URL is required'),
  });
  
  
  export const categoryValidationSchema = Yup.object({
    name: Yup.string().required('Add  Category Name'),
    custom_url: Yup.string().required('Custom URL is required'),
    breadCrum: Yup.string().required('Bread Crum is required'),
  });
  

  
export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Product Name is Required'),
  description: Yup.string().required('Description is  Required'),
  custom_url: Yup.string().required('Custom Url is Required'),
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
    password: isSignup ? Yup.string().min(6, "Password must be at least 6 characters").required("Password is required") : Yup.string().required("Password is required") ,
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