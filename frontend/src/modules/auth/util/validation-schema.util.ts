import * as Yup from 'yup';

export const EMAIL_FORM_SCHEMA = {
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
};

export const PASSWORD_FORM_SCHEMA = {
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^(?=.*[@$!%*#?&])/, 'One special case Character')
    .matches(/^(?=.*\d)/, 'One numeric digit')
    .matches(/^(?=.*[a-z])/, 'One lower case letter')
    .matches(/^(?=.*[A-Z])/, 'One upper case letter')
    .required('Required')
};



