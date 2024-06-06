import * as Yup from 'yup';

export const CommentValidation = Yup.object().shape({
    content:Yup.string().required("Comment field can't be empty"),
});