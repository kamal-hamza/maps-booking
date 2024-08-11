import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import app from '../../firebaseConfig';

function BookingCalendar() {

    const params = useParams();
    const roomId = params.id;

    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState('');
    const [bookings, setBookings] = useState([]);
    const auth = getAuth(app);
    const db = getFirestore(app);

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
            alert("Please select a time slot.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to book a room.");
            return;
        }

        const bookingDate = new Date(date);
        bookingDate.setHours(timeSlot.split(':')[0]);
        bookingDate.setMinutes(timeSlot.split(':')[1]);

        const isBooked = bookings.some(
            booking => new Date(booking.start).getTime() === bookingDate.getTime()
        );

        if (isBooked) {
            alert("This time slot is already booked.");
            return;
        }

        try {
            await addDoc(collection(db, 'bookings'), {
                roomId,
                start: bookingDate,
                end: new Date(bookingDate.getTime() + 60 * 60 * 1000), // 1-hour booking
                title: `Booking by ${user.displayName || user.email}`,
                userId: user.uid,
            });

            alert("Booking confirmed!");
            setBookings([...bookings, { start: bookingDate }]);
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