import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoomCard.module.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function RoomCard({ name, occupancy, price }) {
    return (
        <Card className={styles.card}>
            {/* <Card.Img className={styles.img} variant='top' src={img} /> */}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Occupancy: {occupancy}</Card.Text>
                <Card.Text>Price: ${price}/hour</Card.Text>
                <Button className={styles.button} variant='primary'>Book Room</Button>
            </Card.Body>
        </Card>
    );
}

export default RoomCard;