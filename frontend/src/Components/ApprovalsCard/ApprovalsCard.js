import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../RoomCard/RoomCard.module.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function ApprovalsCard({ name, start, end, id }) {
    return (
        <Card className={styles.card}>
            {/* <Card.Img className={styles.img} variant='top' src={img} /> */}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Start: {start}</Card.Text>
                <Card.Text>End: {end}</Card.Text>
                <Button className={styles.button} variant='primary'>Approve Booking</Button>
                <Button className={styles.button} variant='primary'>Reject Booking</Button>
            </Card.Body>
        </Card>
    );
}

export default ApprovalsCard;