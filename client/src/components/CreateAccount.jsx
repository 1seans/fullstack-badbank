import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <label className='checkbox'>
        <input type='checkbox' {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className='password' htmlFor={props.id || props.name}>
        {label}
      </label>
      <input type='password' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/createaccount', values);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  const initialValues = {
    name: '',
    gender: '',
    email: '',
    password: '',
    acceptedTerms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(15, 'Must be less than 15 characters')
      .required('Required'),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-=])(?!.*\s).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    acceptedTerms: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  return (
    <div className='container'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <h1>Sign Up</h1>
            <TextInput label='Name' name='name' type='text' placeholder='First and Last Name' />
            <TextInput label='Email' name='email' type='email' placeholder='example@email.com' />
            <Select label='Gender' name='gender'>
              <option value=''>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </Select>
            <PasswordInput label='Password' name='password' type='password' placeholder='Password' />
            <Checkbox name='acceptedTerms'>I accept the terms and conditions</Checkbox>
            <button type='submit'>{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
            <p>Already Have An Account</p>
            <Link to='/login' className='btn btn-primary me-md-2' type='button'>
              Login
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;

