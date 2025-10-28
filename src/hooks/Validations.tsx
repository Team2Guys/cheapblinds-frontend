import * as Yup from "yup";

export const jobApplicationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must be under 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name must be under 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
    .required("Last name is required"),

  email: Yup.string().email("Invalid email address").required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?\d{7,15}$/,
      "Phone number must be between 7 to 15 digits and can include an optional +",
    )
    .test("not-repetitive", "Phone number cannot be all identical digits", (value) => {
      if (!value) return false;
      return !/^(\d)\1{6,}$/.test(value);
    }),

  currentCTC: Yup.string()
    .required("Current CTC is required")
    .matches(/^[\d,.]+$/, "Must be a valid number"),

  expectedCTC: Yup.string()
    .required("Expected CTC is required")
    .matches(/^[\d,.]+$/, "Must be a valid number"),

  noticePeriod: Yup.string()
    .required("Notice period is required")
    .max(50, "Notice period must be under 50 characters"),

  portfolioLink: Yup.string()
    .nullable()
    .notRequired()
    .matches(/^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?$/, "Must be a valid URL"),
});

// For Contact us form

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .min(3, "Name must be at least 3 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\+)?(?!.*(\d)\2{5,})[0-9]{10,15}$/,
      "Phone must be valid and not contain repeated digits like 0000000000",
    ),

  email: Yup.string().email("Invalid email").required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    .max(250, "Message must not exceed 250 characters"),

  agree: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

// Apointment form validation

export const appointmentValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .min(3, "Name must be at least 3 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\+)?(?!.*(\d)\2{5,})[0-9]{10,15}$/,
      "Phone must be valid and not contain repeated digits like 0000000000",
    ),

  whatsApp: Yup.string()
    .nullable()
    .matches(/^(\+)?[0-9]{10,15}$/, "WhatsApp number must be valid"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  location: Yup.string().required("Location is required"),

  subCategories: Yup.array().min(1, "Please select at least one option."),

  message: Yup.string()
    .required("Message is required")
    .max(250, "Message must not exceed 250 characters"),
});
