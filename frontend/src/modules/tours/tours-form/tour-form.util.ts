import * as Yup from 'yup';



export const TOUR_FORM_SCHEMA = Yup.object().shape({
  id: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  duration: Yup.number().required('Required').moreThan(0),
  start_date: Yup.date().required("Required").nullable(),
  price_for_person: Yup.number().required('Required').moreThan(0),
  max_capacity: Yup.number().required('Required').moreThan(0),
  category: Yup.number().required('Required').moreThan(0),
  location:Yup.number().required('Required').moreThan(0)
});

export const INITIAL_TOUR_FORM_VALUES = {
    id:'',
    name:'', 
    description:'', 
    duration:0,
    start_date:'',
    price_for_person: 0,
    max_capacity:0, 
    calification:0, 
    category: 0, 
    location: 0,
    benefits:[]
};