import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './AddRoomForm.module.css';
import globalStyles from '../../globalStyles.module.css';
import app from '../../firebaseConfig';
import { getFirestore, setDoc, doc  } from 'firebase/firestore';
import { useState } from 'react';

function AddRoomForm() {

    const [formData, setFormData] = useState({
        roomName: "",
        roomCapacity: 0,
        roomPrice: 0,
    });
    const [alert, setAlert] = useState(null);

    const handleAddRoom = async (e) => {
        e.preventDefault();
        const db = getFirestore(app);
        try {
            await setDoc(doc(db, "rooms", formData.roomName), {
                name: formData.roomName,
                capacity: formData.roomCapacity,
                price: formData.roomPrice,
            });
            setAlert({ variant: 'success', message: 'Room created Successfully' });

        } catch (error) {
            console.log(error);
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
                <Form onSubmit={handleAddRoom}>
                    <h1>Add Room</h1>
                    <Form.Group className='mb-3' controlId='room-name'>
                        <Form.Control type='text' placeholder='Room Name' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, roomName: e.target.value })}} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='room-capacity'>
                        <Form.Control type='number' placeholder='Capacity' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, roomCapacity: e.target.value })}} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='room-price'>
                        <Form.Control type='number' placeholder='Price/Hour' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, roomPrice: e.target.value })}} />
                    </Form.Group>
                    <Button type='submit' variant='primary' className={styles.form_button}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default AddRoomForm;