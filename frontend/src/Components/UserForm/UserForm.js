import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import globalStyles from '../../globalStyles.module.css';
import styles from './UserForm.module.css';
import app from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import GoogleButton from '../GoogleButton/GoogleButton';
// import MicrosoftButton from '../MicrosoftButton/MicrosoftButton';
import { redirect } from 'react-router-dom';

function UserForm({ isSignup, isInternal }) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        const email = formData.email;
        const password = formData.password;
        const db = getFirestore(app);
        try {
            if (isSignup) {
                createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    if (isInternal) {
                        await setDoc(doc(db, "users", user.uid), {
                            email: user.email,
                            displayName: user.displayName,
                            isAdmin: true
                        });
                    }
                    else {
                        await setDoc(doc(db, "users", user.uid), {
                            email: user.email,
                            displayName: user.displayName,
                            isAdmin: false
                        });
                    }
                    localStorage.setItem('userID', user.uid);
                    localStorage.setItem("userEmail", user.email);
                    setAlert({ variant: 'success', message: 'Successfully signed up!' });
                })
            }
            else {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                // user = userCredentials.user;
                // const userDocRef = doc(db, "users", user.uid);
                // const userDoc = await getDoc(userDocRef);
                // if (userDoc.exists()) {
                //     const userData = userDoc.data();
                //     const isAdmin = userData.isAdmin;
                // }
                // else {
                //     redirect("/login");
                // }
                const user = userCredentials.user;
                localStorage.setItem('userID', user.uid);
                localStorage.setItem("userEmail", user.email);
                setAlert({ variant: 'success', message: 'Successfully logged in!' });
            }
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAlert({ variant: 'danger', message: `${errorCode}: ${errorMessage}` });
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