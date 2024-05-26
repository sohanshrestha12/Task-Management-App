import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
    username:Yup.string().min(3).required("Please enter your username"),
    email:Yup.string().email('Please enter valid email address').required("Please enter your email"),
    password:Yup.string().min(5).required("Please enter your password"),
});