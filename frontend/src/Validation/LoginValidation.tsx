import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email:Yup.string().email('Please enter valid email address').required("Please enter your email"),
    password:Yup.string().min(5).required("Please enter your password"),
});