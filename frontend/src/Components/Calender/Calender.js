import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAuth } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import app from '../../firebaseConfig';
import globalStyles from '../../globalStyles.module.css';

function BookingCalendar() {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState('');
    const [bookings, setBookings] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Use state to manage isAdmin
    const [alert, setAlert] = useState(null);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const params = useParams();
    const roomId = params.id;

    useEffect(() => {
        const fetchUserDetails = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                setIsAdmin(userData?.isAdmin || false);
            }
            else {

            }
        };

        fetchUserDetails();
    }, [auth.currentUser, db]);

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingsQuery = query(collection(db, 'bookings'), where('roomId', '==', roomId));
            const querySnapshot = await getDocs(bookingsQuery);
            const fetchedBookings = querySnapshot.docs.map(doc => doc.data());
            setBookings(fetchedBookings);
        };

        fetchBookings();
    }, [roomId, db]);

    const handleBooking = async () => {
        if (!timeSlot) {
            setAlert({ variant: 'warning', message: 'Please select a time slot.' });

            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setAlert({ variant: 'warning', message: 'Please log in to book a room.' });
            return;
        }

        const bookingDate = new Date(date);
        bookingDate.setHours(timeSlot.split(':')[0]);
        bookingDate.setMinutes(timeSlot.split(':')[1]);

        const bookingStart = new Date(bookingDate);
        const bookingEnd = new Date(bookingDate.getTime() + 60 * 60 * 1000); // 1-hour booking

        const isBooked = bookings.some(booking => {
            const existingStart = new Date(booking.start.seconds * 1000); // Convert Firestore timestamp to Date
            const existingEnd = new Date(booking.end.seconds * 1000); // Convert Firestore timestamp to Date
            return (bookingStart < existingEnd && bookingEnd > existingStart);
        });

        if (isBooked) {
            setAlert({ variant: 'warning', message: 'This time slot is already booked.' });
            return;
        }

        try {
            const status = isAdmin ? "approved" : "pending";
            await addDoc(collection(db, 'bookings'), {
                roomId,
                start: bookingStart,
                end: bookingEnd,
                title: `Booking by ${user.displayName || user.email}`,
                userId: user.uid,
                status,
            });

            alert("Booking confirmed!");
            setBookings([...bookings, {
                start: bookingStart,
                end: bookingEnd,
                title: `Booking by ${user.displayName || user.email}`,
                userId: user.uid,
                status,
            }]);
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00',
    ];

    return (
        <div className="booking-calendar">
            {
                alert
                && 
                (
                    <Alert variant={alert.variant} className={globalStyles.alert} dismissible onClose={() => setAlert(null)}>
                        {alert.message}
                    </Alert>
                )
            }
            <h2>Select a Date</h2>
            <Calendar
                onChange={setDate}
                value={date}
            />
            <h3>Select a Time Slot</h3>
            <div className="time-slots">
                {timeSlots.map(slot => (
                    <button
                        key={slot}
                        className={`time-slot ${timeSlot === slot ? 'selected' : ''}`}
                        onClick={() => setTimeSlot(slot)}
                >
                        {slot}
                    </button>
                ))}
            </div>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
        </div>
    );
}

export default BookingCalendar;