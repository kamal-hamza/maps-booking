
import React from 'react';
import { Link } from 'react-router-dom';

import RoomView from "../../Components/RoomView/RoomView";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import globalStyles from '../../globalStyles.module.css';

function RoomsPage() {
    return (
        <div className={globalStyles.div_main}>
            <NavigationBar />
            <Link to="../../Pages/BookingPage/BookingPage">  
              <RoomView />
            </Link>
        </div>
    );
}

export default RoomsPage;