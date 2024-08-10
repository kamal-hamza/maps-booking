import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import UserForm from '../../Components/UserForm/UserForm';

function SignupPage() {
    return (
        <div>
            <NavigationBar />
            <UserForm isSignup={true} />
        </div>
    );
}

export default SignupPage;