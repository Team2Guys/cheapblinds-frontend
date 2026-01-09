import * as Yup from "yup";

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

export const CheckoutValidationSchema = Yup.object({
  billingAddress: Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    state: Yup.string().required("Required"),
  }),
  shippingAddress: Yup.object().when("shipToDifferent", {
    is: true,
    then: () =>
      Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        state: Yup.string().required("Required"),
      }),
    otherwise: (schema) => schema.notRequired(),
  }),
});
