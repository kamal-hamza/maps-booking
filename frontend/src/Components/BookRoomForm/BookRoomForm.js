import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import styles from './BookRoomForm.module.css';
import globalStyles from '../../globalStyles.module.css'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

function BookRoomForm() {

    const params = useParams();
    const [room, setRoom] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        console.log("called")
        const fetchData = async () => {
            const roomId = params.id;
            try {
                const url = `http://127.0.0.1:8000/create-list-room/${roomId}/`;
                const token = localStorage.getItem('authToken');
                const headers = {
                    Authorization: `Token ${token}`
                };
                const response = await axios.get(url, { headers });
                if (response.status === 200) {
                    const data = response.data;
                    const roomData = {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        capacity: data.capacity,
                        is_available_for_booking: data.is_available_for_booking,
                    }
                    setRoom(roomData)
                    console.log(data);
                }
                else {
                    setAlert({ variant: 'danger', message: 'An error occured while fetching the room' });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [params.id])

    return (
        <div>
            {
                alert
                && 
                (
                    <Alert variant={alert.variant} className={globalStyles.alert} dismissible onClose={() => setAlert(null)}>
                        {alert.message}
                    </Alert>
                )
            }
            {
                room ? (
                    <h1>{room.name}</h1>
                ) : (
                    <p>Loading...</p> // Display a loading message while fetching
                )
            }
        </div>
    );
}

export default BookRoomForm;