import { useParams } from 'react-router-dom';
import app from '../../firebaseConfig';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import styles from './BookRoomForm.module.css';
import { useEffect, useState } from 'react';

function BookRoomForm() {

    const params = useParams();
    const [room, setRoom] = useState(null);
    useEffect(() => {
        console.log("called")
        const fetchData = async () => {
            const db = getFirestore(app);
            const roomID = params.id
            const docRef = doc(db, "rooms", roomID);
            try {
                const doc = await getDoc(docRef);
                console.log(doc);
                if (doc.exists()) {
                    const roomData = {
                        id: roomID,
                        name: doc.data().name,
                        occupancy: doc.data().occupancy,
                        price: doc.data().price,
                    }
                    setRoom(roomData);
                }
                else {
                    console.log("error");
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