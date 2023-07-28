import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context';

import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import  GOOGLE_CLIENT_ID from '../../../config/client_id_export'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-=])(?!.*\s).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = async (googleData) => {
    try {
      const response = await axios.post('http://localhost:3001/loginWithGoogle', {
        tokenId: googleData.tokenId,
        email: googleData.email,
        name: googleData.name,
      });
      if (response.data.status === 'Success' || response.data.status === 'AccountCreated') {
        const userData = {
          email: response.data.email,
          name: response.data.name,
          balance: response.data.balance,
          transactions: response.data.transactions,
        };
        console.log('Logged User Data:', userData); // Log user data with balance and transactions (if available)
        setUserData(userData);
        navigate('/home');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  };  
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/login', values);
      console.log(response);
      if (response.data.status === 'Success') {
        const userData = {
          email: values.email,
          name: response.data.name,
          balance: response.data.balance,
        };
        setUserData(userData); // Store the user data in context
        navigate('/home');
      } else if (response.data.status === 'InvalidEmail') {
        setErrorMessage('Invalid email address');
      } else if (response.data.status === 'InvalidPassword') {
        setErrorMessage('Invalid password');
      } else {
        setErrorMessage('Login failed. InvalidPassword or Invalid email address Please try again.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='login-container'>
            <h1 className='login-heading'>Log In</h1>
            <label htmlFor='email'>Email:</label>
            <Field className='login-field' type='text' name='email' />
            <ErrorMessage name='email' component='div' />
            <br />
            <label htmlFor='password'>Password:</label>
            <Field type='password' name='password' />
            <ErrorMessage name='password' component='div' />
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            <br />
            <button type='submit' disabled={isSubmitting}>
              Log In
            </button>
            <br />
            <div>
              <LoginSocialGoogle
                client_id={GOOGLE_CLIENT_ID} 
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(provider, data);
                  handleGoogleLogin(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
              <GoogleLoginButton onClick={handleGoogleLogin} />
               </LoginSocialGoogle>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Login;