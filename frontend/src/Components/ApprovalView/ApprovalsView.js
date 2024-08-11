import { useEffect, useState } from "react";
import app from '../../firebaseConfig';
import { collection, getFirestore, getDocs, doc, getDoc } from "firebase/firestore";
import ApprovalsCard from "../ApprovalsCard/ApprovalsCard";

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

function ApprovalsView() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Called");
            const db = getFirestore(app);
            try {
                const data = await getDocs(collection(db, "bookings"));
                const roomArray = []
                data.forEach((doc) => {
                    // console.log(doc.data().end)
                    const room = {
                        roomId: doc.data().roomId,
                        end: new Date(doc.data().end.seconds*1000),
                        start: new Date(doc.data().start.seconds*1000),
                        status: doc.data().status,
                        title: doc.data().title,
                        userId: doc.data().userId

                    }
                    console.log(room.end)
                    if (room.status == "pending")
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
                    <ApprovalsCard key={room.roomId} id={room.roomId} name={room.roomId} start={(room.start.toDateString() + "     "+room.start.toLocaleTimeString())} end={(room.end.toDateString() +"    "+ room.end.toLocaleTimeString())} />
                ))
            }
        </div>
    );
}

export default ApprovalsView;