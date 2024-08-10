import NavigationBar from "../NavigationBar/NavigationBar";
import UserForm from "../UserForm/UserForm";
import globalStyles from "../../globalStyles.module.css";

function LoginPage() {
    return (
        <div className={globalStyles.div_main}>
            <NavigationBar />
            <UserForm isSignup={false} />
        </div>
    );
}

export default LoginPage;