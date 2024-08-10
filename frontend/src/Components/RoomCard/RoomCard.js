import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoomCard.module.css'


function RoomCard() {
    return (
        <div className={styles.div_card}>
            <h1>Name</h1>
            <p>Occupancy: 123</p>
            <p>Price: $100/hour</p>
            <button>Book Room</button>
        </div>
    );
}

export default RoomCard;