import * as yup from "yup";
export const registerSchema = yup.object({
    firstName : yup.string().required("*First Name is Required"),
    lastName : yup.string().required("*Last Name is Required"),
    email : yup.string().required("*Email is Required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Email not valid"),
    password : yup.string().required("*Password is Required").min(6),
    confirmPassword : yup.string().required("*Confirm Password is Required").min(6),
}).required();

export const loginSchema = yup.object({
    email : yup.string().required("*Email is Required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Email not valid"),
    password : yup.string().required("*Password is Required").min(6),
}).required();