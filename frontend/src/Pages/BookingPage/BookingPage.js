import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import Calender from "../../Components/Calender/Calender";
import Calender from "../../Components/Booking/Booking";
import globalStyles from "../../globalStyles.module.css";

function BookingPage() {
    return (
        <div className={globalStyles.div_main}>
            <NavigationBar />
            
            < Calender/>
            < Booking/>
        </div>
    );
}

export default BookingPage;