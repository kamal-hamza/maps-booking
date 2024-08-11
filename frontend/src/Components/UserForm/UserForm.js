import { useState } from 'react';
import axios, { AxiosError } from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import globalStyles from '../../globalStyles.module.css';
import styles from './UserForm.module.css';
import GoogleButton from '../GoogleButton/GoogleButton';
import { redirect } from 'react-router-dom';

function UserForm({ isSignup }) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const url = 'http://127.0.0.1:8000/signup/'
                const response = await axios.post(url, {
                    email: formData.email,
                    password: formData.password
                });
                if (response.status === 200) {
                    localStorage.setItem('authToken', response.data.token)
                    setAlert({ variant: 'success', message: 'Account Created Successfully!' });
                }
                else {
                    setAlert({ variant: 'danger', message: 'An error occured during signup' });
                }
            }
            else {
                const url = 'http://127.0.0.1:8000/login/'
                const response = await axios.post(url, {
                    email: formData.email,
                    password: formData.password
                });
                if (response.status === 200) {
                    localStorage.setItem('authToken', response.data.token)
                    setAlert({ variant: 'success', message: 'Successfully logged in!' });
                }
                else {
                    setAlert({ variant: 'danger', message: 'An error occured during signup' });
                }
            }
        } catch(error) {
            setAlert({ variant: 'danger', message: `${error}` });
        }
    }

    return (
        <div className={styles.div_main}>
            {
                alert
                && 
                (
                    <Alert variant={alert.variant} className={globalStyles.alert} dismissible onClose={() => setAlert(null)}>
                        {alert.message}
                    </Alert>
                )
            }
            <div className={styles.div_form}>
                {
                    isSignup ? (
                        <h1>Sign Up</h1>
                    ) : (
                        <h1>Login</h1>
                    )
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb3' controlId='email'>
                        <Form.Control type='email' placeholder='Email Address' className={globalStyles.form_input} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group className='mb3' controlId='password'>
                        <Form.Control type='password' placeholder='Password' className={globalStyles.form_input} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </Form.Group>
                    <Button type='submit' variant='primary' className={styles.form_button} >Submit</Button>
                    <GoogleButton />
                </Form>
            </div>
        </div>
    );
}

export default UserForm;