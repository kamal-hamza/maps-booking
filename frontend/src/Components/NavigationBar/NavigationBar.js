import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'; 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import styles from './NavigationBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/maps-logo.png'
import { getAuth } from 'firebase/auth';
import app from '../../firebaseConfig';

function NavigationBar() {

    const email = localStorage.getItem('userEmail');

    return (
        <Navbar expand="lg" id={styles.navbar} className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link className={styles.navlink} to="/home"><Image className={styles.img} alt='Logo' src={logo}></Image></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link className={styles.navlink} to="/login">Login</Link></Nav.Link>
                        <Nav.Link><Link className={styles.navlink} to="/signup">Sign Up</Link></Nav.Link>
                        <Nav.Link><Link className={styles.navlink} to="/logout">Logout</Link></Nav.Link>
                        <Nav.Link><Link className={styles.navlink}>{email}</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;