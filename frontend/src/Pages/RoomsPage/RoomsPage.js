import RoomView from "../../Components/RoomView/RoomView";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import globalStyles from '../../globalStyles.module.css';

function RoomsPage() {
    return (
        <div className={globalStyles.div_main}>
            <NavigationBar />
            <RoomView />
        </div>
    );
}

export default RoomsPage;