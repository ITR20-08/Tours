import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA, PASSWORD_FORM_SCHEMA } from '../util/validation-schema.util';


export const REGISTER_FORM_SCHEMA = Yup.object().shape({
  ...EMAIL_FORM_SCHEMA,
  ...PASSWORD_FORM_SCHEMA,
  name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  birth_date: Yup.date().required("Required").nullable(),
  country:Yup.mixed().required('Required')
});

export const INITIAL_REGISTER_FORM_VALUES = {
    email: '',
    password: '',
    name:'',
    last_name:'',
    birth_date:'',
    country:'',
    type:'user'
  };
  
