import { useEffect, useState } from "react";
import RoomCard from "../RoomCard/RoomCard";
import axios from "axios";

function RoomView() {

    const [rooms, setRooms] = useState([]);
    const [alert, setAlert] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            console.log("called");
            try {
                const url = 'http://127.0.0.1:8000/create-list-room/'
                const token = localStorage.getItem('authToken');
                const headers = {
                    Authorization: `Token ${token}`
                }
                const response = await axios.get(url, { headers });
                if (response.status === 200) {
                    const data = response.data;
                    setRooms(data)
                } 
                else {
                    setAlert({ variant: 'danger', message: 'An error occured while fetching rooms' });
                }
            } catch (error) {
                console.log(error);
            }
       }
       fetchData();
    }, []);

    return (
        <div>
            {
                rooms.map((room) => (
                    <RoomCard key={room.id} id={room.id} name={room.name} occupancy={room.occupancy} price={room.price} />
                ))
            }
        </div>
    );
}

export default RoomView;