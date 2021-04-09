import {Container, Form, Button } from 'react-bootstrap';
import useStyles from '../auth.style';
import { REGISTER_FORM_SCHEMA, INITIAL_REGISTER_FORM_VALUES } from './register.util';
import {IUserForm} from '../shared/model/index'
import { useFormik } from 'formik';

import {COUNTRIES} from './countries.util'
import { createUser } from '../../../shared/services/auth.service';

const Register=()=> {
    const classes = useStyles();

    const onSubmit = async(user:IUserForm) => {
      console.log(user);
      await createUser(user);
      window.location.href="./login";
    };

    const { handleSubmit, handleChange,values, errors} = useFormik<IUserForm>({
        onSubmit,
        initialValues: INITIAL_REGISTER_FORM_VALUES,
        validationSchema: REGISTER_FORM_SCHEMA
      });
    
    return (
        <Container className={classes.root}>
         <h1>Register</h1>
         <br/>          
        <Form onSubmitCapture={handleSubmit}>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email"  value={values.email}  id={errors.email ? "error" : ""} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          {errors.email ? (
                <div id="error_message">{errors.email}</div>
              ): null}
        </Form.Group>
      
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password"  value={values.password}  id={ errors.password ? "error" : ""} />
          {errors.password ? (
                <div id="error_message">{errors.password}</div>
              ): null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Name" name="name"  value={values.name}  id={errors.name ? "error" : ""} />
          {errors.name ? (
                <div id="error_message">{errors.name}</div>
              ): null}
        </Form.Group>

        <Form.Group >
          <Form.Label>Last Name</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Last Name" name="last_name"  value={values.last_name}  id={errors.last_name ? "error" : ""} />
          {errors.last_name ? (
                <div id="error_message">{errors.last_name}</div>
              ): null}
        </Form.Group>

       

          <Form.Group >
          <Form.Label>Country</Form.Label>
          <Form.Control as="select" name="country"  onChange={handleChange}   id={errors.country ? "error" : ""} >
          <option disabled selected>Select Country</option> 
          {COUNTRIES.map(({name , code}) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
          </Form.Control>  
        </Form.Group>   
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>   
            <input  className="form-control" type="date" value={values.birth_date} name="birth_date" onChange={handleChange}  id={ errors.birth_date ? "error" : ""} />
            {errors.birth_date ? (
                <div id="error_message">{errors.birth_date}</div>
              ): null}
        </Form.Group>      
        <Button type="submit "variant="primary">
          Sign Up
        </Button>
        </Form>
       </Container>
    )
}

export default Register; 
