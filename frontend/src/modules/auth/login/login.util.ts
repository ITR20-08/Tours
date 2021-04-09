import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA, PASSWORD_FORM_SCHEMA } from '../util/validation-schema.util';

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  ...EMAIL_FORM_SCHEMA,
  ...PASSWORD_FORM_SCHEMA
});

export const INITIAL_LOGIN_FORM_VALUES = {
  email: '',
  password: ''
};
