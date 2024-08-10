import NavigationBar from "../NavigationBar/NavigationBar";
import UserForm from '../UserForm/UserForm';

function SignupPage() {
    return (
        <div>
            <NavigationBar />
            <UserForm isSignup={true} />
        </div>
    );
}

export default SignupPage;