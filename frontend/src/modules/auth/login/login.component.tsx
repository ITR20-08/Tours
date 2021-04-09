import React, { useContext } from 'react';
import {Container, Form, Button } from 'react-bootstrap';
import useStyles from '../auth.style';
import { LOGIN_FORM_SCHEMA, INITIAL_LOGIN_FORM_VALUES } from './login.util';
import {ICredentials} from '../shared/model/index'
import { useFormik } from 'formik';
import { AuthContext } from '../../../shared/contexts';


const Login=()=> {

    const classes = useStyles();
    const { login } = useContext(AuthContext);

    const onSubmit = async(credentials: ICredentials) => {
      await login(credentials);
    };

    const { handleSubmit, handleChange, values, errors} = useFormik<ICredentials>({
        onSubmit,
        initialValues: INITIAL_LOGIN_FORM_VALUES,
        validationSchema: LOGIN_FORM_SCHEMA
      });
    
    return (
        <Container className={classes.root}>
         <h1>Login</h1>
         <br/>          
        <Form onSubmitCapture={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email"  value={values.email}  className={errors.email ? "error" : ""} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          {errors.email ? (
                <div className="error_message">{errors.email}</div>
              ): null}
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password"  value={values.password}  className={ errors.password ? "error" : ""} />
          {errors.password ? (
                <div className="error_message">{errors.password}</div>
              ): null}
        </Form.Group>
        <Button type="submit "variant="primary">
          Login
        </Button>
        </Form>
       </Container>
    )
}

export default Login; 
