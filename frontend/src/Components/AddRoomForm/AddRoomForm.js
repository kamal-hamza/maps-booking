import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './AddRoomForm.module.css';
import globalStyles from '../../globalStyles.module.css';
import { useState } from 'react';
import axios from 'axios';

function AddRoomForm() {

    const [formData, setFormData] = useState({
        name: "",
        capacity: 0,
        price: 0.00,
    });
    const [alert, setAlert] = useState(null);

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://127.0.0.1:8000/create-list-room/';
            const token = localStorage.getItem('authToken');
            const data = {
                name: formData.name,
                price: formData.price,
                capacity: formData.capacity,
                is_available_for_booking: true,
            }
            const headers = {
                Authorization: `Token ${token}`
            }
            const response = await axios.post(url, data, { headers });
            if (response.status === 201) {
                setAlert({ variant: 'success', message: 'Room created Successfully' });
            }
            else {
                setAlert({ variant: 'danger', message: 'An error occured while creating the room' });
            }
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
                        <Form.Control type='text' placeholder='Room Name' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, name: e.target.value })}} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='room-capacity'>
                        <Form.Control type='number' placeholder='Capacity' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, capacity: e.target.value })}} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='room-price'>
                        <Form.Control type='number' placeholder='Price/Hour' className={styles.form_input} onChange={(e) => {setFormData({ ...formData, price: e.target.value })}} />
                    </Form.Group>
                    <Button type='submit' variant='primary' className={styles.form_button}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default AddRoomForm;