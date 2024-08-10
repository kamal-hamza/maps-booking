import { useEffect, useState } from "react";
import app from '../../firebaseConfig';
import { collection, getFirestore, getDocs, doc, getDoc } from "firebase/firestore";
import RoomCard from "../RoomCard/RoomCard";

function RoomView() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Called");
            const db = getFirestore(app);
            try {
                const data = await getDocs(collection(db, "rooms"));
                const roomArray = []
                data.forEach((doc) => {
                    const room = {
                        id: doc.id,
                        name: doc.data().name,
                        occupancy: doc.data().occupancy,
                        price: doc.data().price,
                    }
                    roomArray.push(room)
                });
                setRooms(roomArray);
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
                    <RoomCard key={room.id} name={room.name} occupancy={room.occupancy} price={room.price} />
                ))
            }
        </div>
    );
}

export default RoomView;